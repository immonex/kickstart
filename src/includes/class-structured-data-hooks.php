<?php
/**
 * Class Structured_Data_Hooks
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Structured Data embedding (e.g. Schema.org).
 */
class Structured_Data_Hooks {

	/**
	 * Plugin options and other component configuration data
	 *
	 * @var mixed[]
	 */
	private $config;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	private $utils;

	/**
	 * Schema items collected during the current request
	 *
	 * @var mixed[]
	 */
	private $schema_items = [
		'property' => [],
		'agent'    => [],
		'agency'   => [],
	];

	/**
	 * Constructor
	 *
	 * @since 1.12.0-beta
	 *
	 * @param mixed[]  $config Plugin options and other component configuration data.
	 * @param object[] $utils  Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;

		/**
		 * Kickstart Core
		 */

		add_filter( 'inx_enable_doc_head_buffering', '__return_true' );
		add_filter( 'inx_doc_head_contents', [ $this, 'maybe_extend_doc_head' ], 20 );

		/**
		 * Plugin-specific actions and filters
		 */

		add_action( 'inx_before_render_property_list_item', [ $this, 'add_property_list_item_schema_data' ] );
		add_action( 'inx_after_render_property_list', [ $this, 'render_property_list_graph' ] );

		// Internal filter.
		add_filter( 'inx_get_property_schema_data', [ $this, 'get_property_schema_data' ], 10, 2 );
	} // __construct

	/**
	 * Retrieve and return property schema data (filter callback).
	 *
	 * @since 1.12.0-beta
	 *
	 * @param mixed[] $schema_data Empty array.
	 * @param mixed[] $args        Retrieval/Return arguments:
	 *                               - scope (full/extended/reference)
	 *                               - property_id
	 *                               - as_script_block (true/false).
	 *
	 * @return mixed[] Main property schema entity element of the given type.
	 */
	public function get_property_schema_data( $schema_data, $args ): array|string {
		$scope       = ! empty( $args['scope'] ) && in_array( $args['scope'], [ 'full', 'extended', 'reference' ], true ) ?
			$args['scope'] : 'reference';
		$property_id = ! empty( $args['property_id'] ) ? $args['property_id'] : 0;

		if ( ! $property_id ) {
			$property_id = $apply_filters( 'inx_current_property_post_id', 0 );
		}

		if ( ! $property_id ) {
			return [];
		}

		$property_schema = new Property_Schema( $this->config, $this->utils );
		$property_schema->set_post_id( $property_id );

		return $property_schema->get_main_entity_element( $scope, ! empty( $args['as_script_block'] ) );
	} // get_property_schema_data

	/**
	 * Maybe extend the given HTML head contents by a structured data script block
	 * (filter callback).
	 *
	 * @since 1.12.0-beta
	 *
	 * @param string $head_contents Content string.
	 *
	 * @return string Possibly extended head contents.
	 */
	public function maybe_extend_doc_head( $head_contents ): string {
		$id_or_term = apply_filters( 'inx_is_property_list_page', false );
		$type       = true === $id_or_term ? 'archive' : false;

		if ( ! $type && $id_or_term ) {
			$type = 'list';
		}

		if ( ! $type ) {
			$id_or_term = apply_filters( 'inx_is_property_details_page', false );
			$type       = $id_or_term ? 'single' : false;
		}

		if ( ! $type ) {
			$id_or_term = apply_filters( 'inx_is_property_tax_archive', false );
			$type       = $id_or_term ? 'tax_archive' : false;
		}

		if ( ! $type ) {
			return $head_contents;
		}

		$struct_data = '';

		switch ( $type ) {
			case 'single':
				$property_schema = new Property_Schema( $this->config, $this->utils );
				$property_schema->set_post_id( $id_or_term );
				$struct_data = $property_schema->get_detail_page_graph( true );
				break;
			case 'list':
			case 'archive':
			case 'tax_archive':
				$property_list_schema = new Property_List_Schema( $this->config, $this->utils );
				$struct_data          = $property_list_schema->get_web_page_entity( $type, true );
				break;
		}

		return $head_contents . $struct_data;
	} // maybe_extend_doc_head

	/**
	 * Generate schema data for the current property (action callback).
	 *
	 * @since 1.12.0-beta
	 */
	public function add_property_list_item_schema_data(): void {
		$property_id = apply_filters( 'inx_current_property_post_id', 0 );

		if ( ! $property_id ) {
			return;
		}

		$this->schema_items['property'][ $property_id ] = apply_filters(
			'inx_get_property_schema_data',
			[],
			[
				'property_id' => $property_id,
				'scope'       => 'extended',
			]
		);

		$agent_id  = get_post_meta( $property_id, '_inx_team_agent_primary', true );
		$agency_id = get_post_meta( $property_id, '_inx_team_agency_id', true );

		if ( $agent_id && ! isset( $this->schema_items['agent'][ $agent_id ] ) ) {
			$this->schema_items['agent'][ $agent_id ] = apply_filters(
				'inx_team_get_schema_data',
				[],
				[
					'entity_type' => 'agent',
					'entity_id'   => $agent_id,
					'scope'       => 'extended',
				]
			);
		}

		if ( $agency_id && ! isset( $this->schema_items['agency'][ $agency_id ] ) ) {
			$this->schema_items['agency'][ $agency_id ] = apply_filters(
				'inx_team_get_schema_data',
				[],
				[
					'entity_type' => 'agency',
					'entity_id'   => $agency_id,
					'scope'       => 'full',
				]
			);
		}
	} // add_property_list_item_schema_data

	/**
	 * Render and output the collected property list schema data
	 * as JSON-LD block (action callback).
	 *
	 * @since 1.12.0-beta2
	 */
	public function render_property_list_graph() {
		$graph_items = array_merge(
			array_values( $this->schema_items['property'] ),
			array_values( $this->schema_items['agent'] ),
			array_values( $this->schema_items['agency'] )
		);

		if ( empty( $graph_items ) ) {
			return;
		}

		$script_block = $this->utils['format']->get_json_ld_script_block( [ '@graph' => $graph_items ], true );

		echo $script_block;
	} // render_property_list_graph

} // Structured_Data_Hooks
