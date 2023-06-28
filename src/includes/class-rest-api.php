<?php
/**
 * Class REST_API
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Not a "real REST API" so far, only some helper queries.
 */
class REST_API {

	const SUCCESS = 'SUCCESS';
	const NOP     = 'NOP';
	const ERROR   = 'ERROR';

	/**
	 * Various component configuration data
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
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;

		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	} // __construct

	/**
	 * Register API routes.
	 *
	 * @since 1.0.0
	 */
	public function register_routes() {
		$content_fetch_entities = array( 'properties', 'property_map' );

		foreach ( $content_fetch_entities as $entity ) {
			register_rest_route(
				$this->config['plugin_slug'] . '/v1',
				"/{$entity}(?:/(?P<id>[\d,]+))?",
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, "get_{$entity}" ),
					'permission_callback' => '__return_true',
				)
			);
		}

		register_rest_route(
			$this->config['plugin_slug'] . '/v1',
			'/properties/(?P<id>\d+)',
			array(
				'methods'             => 'PUT',
				'callback'            => array( $this, 'update_property' ),
				'permission_callback' => array( $this, 'check_property_update_permission' ),
			)
		);
	} // register_routes

	/**
	 * Retrieve property object list or count only based on current search
	 * query arguments.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return \WP_Post[]|int List of property objects (if any) or count only.
	 */
	public function get_properties( \WP_REST_Request $request ) {
		$response_format = $this->get_property_query_response_format( $request );

		if (
			$request->get_param( 'inx-r-lang' ) &&
			apply_filters( 'inx_is_translated_post_type', false, $this->config['property_post_type_name'] )
		) {
			do_action( 'inx_rest_set_query_language', $request->get_param( 'inx-r-lang' ), $request );
		}

		if ( 'html' === $response_format ) {
			return $this->get_property_list_html( $request );
		}

		if ( in_array( $response_format, array( 'json_map_markers', 'json_map_marker_coords' ), true ) ) {
			return $this->get_property_map_markers( $request, $response_format );
		}

		$prefix          = $this->config['public_prefix'];
		$property_search = new Property_Search( $this->config, $this->utils );

		$form_elements = $property_search->get_search_form_elements();
		if ( ! is_array( $form_elements ) || 0 === count( $form_elements ) ) {
			return;
		}

		$search_query_vars = array();
		foreach ( $form_elements as $id => $element ) {
			$var_name = $prefix . 'search-' . $id;
			$value    = $request->get_param( $var_name );

			if ( $value ) {
				$search_query_vars[ $var_name ] = $this->utils['data']->maybe_convert_list_string( $value );
			}
		}

		/**
		 * Check for/include special query variables (e.g. reference flag).
		 */
		$special_query_vars = $this->config['special_query_vars']();
		if ( count( $special_query_vars ) > 0 ) {
			foreach ( $special_query_vars as $var_name ) {
				$value = $request->get_param( $var_name );

				if ( $value ) {
					$search_query_vars[ $var_name ] = $value;
				}
			}
		}

		$tax_and_meta_queries = $property_search->get_tax_and_meta_queries( $search_query_vars );
		$property_list        = new Property_List( $this->config, $this->utils );

		$args = array(
			'fields' => 'count' === $response_format ? 'ids' : 'all',
		);

		if ( ! empty( $search_query_vars[ $prefix . 'author' ] ) ) {
			$author_query                  = $property_search->get_author_query( $search_query_vars[ "{$prefix}author" ] );
			$args[ $author_query['type'] ] = $author_query['user_ids'];
		}

		if ( $tax_and_meta_queries['tax_query'] ) {
			$args['tax_query'] = $tax_and_meta_queries['tax_query'];
		}
		if ( $tax_and_meta_queries['meta_query'] ) {
			$args['meta_query'] = $tax_and_meta_queries['meta_query'];
		}
		if ( $tax_and_meta_queries['geo_query'] ) {
			require_once trailingslashit( $this->config['plugin_dir'] ) . 'lib/gjs-geo-query/gjs-geo-query.php';
			$args['geo_query']        = $tax_and_meta_queries['geo_query'];
			$args['suppress_filters'] = false;
		}

		$this->maybe_add_lang_args( $args, $request );

		$properties = $property_list->get_properties( $args );

		return 'count' === $response_format ? count( $properties ) : $properties;
	} // get_properties

	/**
	 * Render a full property list HTML output and the related pagination.
	 *
	 * @since 1.6.0
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return string[] List and pagination HTML strings.
	 */
	private function get_property_list_html( $request ) {
		$component_instance_data = json_decode( $request->get_param( 'inx-r-cidata' ), true );
		unset( $component_instance_data['is_regular_archive_page'] );

		$this->maybe_add_lang_args( $component_instance_data, $request );

		$template      = ! empty( $component_instance_data['template'] ) ? $component_instance_data['template'] : '';
		$property_list = new Property_List( $this->config, $this->utils );

		$list_html = $property_list->render( $template, $component_instance_data );
		$has_wrap  = preg_match( '/\<div class="inx-cq"\>(.*)\<\/div\>/is', $list_html, $matches );

		if ( $has_wrap ) {
			// Remove a wrap DIV element only required for pseudo container queries.
			$list_html = trim( $matches[1] );
		}

		return array(
			'list'       => $list_html,
			'pagination' => $property_list->get_rendered_pagination(),
		);
	} // get_property_list_html

	/**
	 * Generate a set of property map markers based on the given request data.
	 *
	 * @since 1.6.0
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @param string           $response_format Response format ('json_map_markers'
	 *                                          or 'json_map_marker_coords').
	 *
	 * @return mixed[] Map marker data.
	 */
	private function get_property_map_markers( $request, $response_format = 'json_map_markers' ) {
		$args = json_decode( $request->get_param( 'inx-r-cidata' ), true );
		$id   = $request->get_param( 'id' );

		if ( $id ) {
			$args['id']   = $id;
			$args['type'] = 'json_map_marker_coords' === $response_format ? 'coords' : 'full';
		}

		$this->maybe_add_lang_args( $args, $request );

		return apply_filters( 'inx_get_property_map_markers', array(), $args );
	} // get_property_map_markers

	/**
	 * Determine the response format for property queries.
	 *
	 * @since 1.6.0
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return string Response format key.
	 */
	private function get_property_query_response_format( $request ) {
		$formats         = array( 'json', 'json_map_markers', 'json_map_marker_coords', 'html', 'count' );
		$response_format = $request->get_param( 'inx-r-response' );

		if ( $response_format && in_array( $response_format, $formats, true ) ) {
			return $response_format;
		}

		// Parameter "count" is queried due to compatibility with older/custom skins.
		return $request->get_param( 'count' ) ? 'count' : $formats[0];
	} // get_property_query_response_format

	/**
	 * Check if the authenticated user is allowed to update the property post
	 * with the given ID via REST API (callback).
	 *
	 * @since 1.1.0
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return bool Check result.
	 */
	public function check_property_update_permission( \WP_REST_Request $request ) {
		$params = $request->get_params();
		if ( empty( $params['id'] ) ) {
			return false;
		}

		return current_user_can( 'edit_post', (int) $params['id'] );
	} // check_property_update_permission

	/**
	 * Update a property.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return mixed[] Status and additional data.
	 */
	public function update_property( \WP_REST_Request $request ) {
		$params = $request->get_params();
		$status = self::NOP;
		$data   = array( 'id' => $params['id'] );

		if ( count( $params ) > 0 ) {
			foreach ( $params as $param => $value ) {
				switch ( $param ) {
					case 'reference':
						$new_reference_state = (int) $value ? 1 : 0;
						$result              = update_post_meta( $params['id'], '_immonex_is_reference', $new_reference_state );
						if ( false !== $result ) {
							$status            = self::SUCCESS;
							$data['reference'] = $new_reference_state;
							$this->maybe_update_marketing_type_term( $params['id'], $new_reference_state );
						} else {
							$status            = self::ERROR;
							$data['reference'] = get_post_meta( $params['id'], '_immonex_is_reference', true );
						}
						break;
				}
			}
		}

		return array(
			'status' => $status,
			'data'   => $data,
		);
	} // update_property

	/**
	 * Maybe update the marketing type term of a property after a status update.
	 *
	 * @since 1.0.0
	 *
	 * @param int|string $post_id Property post ID.
	 * @param bool       $is_reference true if the property is marked as reference object.
	 */
	private function maybe_update_marketing_type_term( $post_id, $is_reference ) {
		// Marketing type taxonomy (e.g. "For Sale").
		$taxonomy = $this->config['plugin_prefix'] . 'marketing_type';

		// No Reference <--> Reference (term names).
		$replace_reference_terms = apply_filters(
			'inx_marketing_type_reference_term_replacements',
			array(
				'Zu Verkaufen' => 'Verkauft',
				'Zu verkaufen' => 'verkauft',
				'zu verkaufen' => 'verkauft',
				'Zum Kauf'     => 'verkauft',
				'zum Kauf'     => 'verkauft',
				'Zu Vermieten' => 'Vermietet',
				'Zu vermieten' => 'vermietet',
				'Zur Miete'    => 'vermietet',
				'zur Miete'    => 'vermietet',
				'Zu mieten'    => 'vermietet',
				'zu mieten'    => 'vermietet',
			)
		);

		if ( empty( $replace_reference_terms ) ) {
			return;
		}

		$current_terms = wp_get_object_terms( $post_id, $taxonomy );
		if ( empty( $current_terms ) ) {
			return;
		}

		$replace_term_names = $is_reference ?
			$replace_reference_terms :
			array_flip( $replace_reference_terms );

		$replace = array();
		foreach ( $current_terms as $term ) {
			if ( in_array( $term->name, array_keys( $replace_term_names ), true ) ) {
				$replace[ $term->term_id ] = $replace_term_names[ $term->name ];
			}
		}

		if ( empty( $replace ) ) {
			return;
		}

		// Remove existing terms that have to be replaced.
		wp_remove_object_terms( $post_id, array_keys( $replace ), $taxonomy );

		$add_replacement_terms = array();
		foreach ( $replace as $term_id => $replace_by_name ) {
			$replace_term = get_term_by( 'name', $replace_by_name, $taxonomy );
			if ( $replace_term ) {
				$add_replacement_terms[] = $replace_term->term_id;
			} else {
				// Replacement term with given name does not exist yet - create it.
				$term_data = wp_insert_term( $replace_by_name, $taxonomy );
				if ( is_wp_error( $term_data ) ) {
					return;
				}
				$add_replacement_terms[] = $term_data['term_id'];
			}
		}

		wp_add_object_terms( $post_id, $add_replacement_terms, $taxonomy );
	} // maybe_update_marketing_type_term

	/**
	 * Maybe update the marketing type term of a property after a status update.
	 *
	 * @since 1.7.26-beta
	 *
	 * @param mixed[]          $args    Property query arguments.
	 * @param \WP_REST_Request $request Request object.
	 */
	private function maybe_add_lang_args( &$args, $request ) {
		if (
			$request->get_param( 'inx-r-lang' ) &&
			apply_filters( 'inx_is_translated_post_type', false, $this->config['property_post_type_name'] )
		) {
			$lang                     = $request->get_param( 'inx-r-lang' );
			$args['lang']             = sanitize_key( $lang );
			$args['suppress_filters'] = false;
		}
	} // maybe_add_lang_args

} // REST_API
