<?php
/**
 * Class Query_Helper
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * WP Query related helper methods.
 */
class Query_Helper {

	/**
	 * Plugin options
	 *
	 * @var mixed[]
	 */
	private $plugin_options;

	/**
	 * Constructor
	 *
	 * @since 1.6.17-beta
	 *
	 * @param mixed[] $plugin_options Plugin options.
	 */
	public function __construct( $plugin_options ) {
		$this->plugin_options = $plugin_options;
	} // __construct

	/**
	 * Merge meta or taxonomy queries.
	 *
	 * @since 1.6.17-beta
	 *
	 * @param mixed[] $org_query Original query.
	 * @param mixed[] $add_query Additional query.
	 * @param string  $relation  Relation (optional, "AND" by default).
	 *
	 * @return mixed[] Merged query.
	 */
	public function merge_queries( $org_query, $add_query, $relation = 'AND' ) {
		$relation = strtoupper( $relation );
		if ( ! in_array( $relation, array( 'AND', 'OR' ), true ) ) {
			$relation = 'AND';
		}

		if (
			! is_array( $org_query )
			|| ( 1 === count( $org_query ) && isset( $org_query['relation'] ) )
		) {
			$org_query = array();
		}
		if (
			! is_array( $add_query )
			|| ( 1 === count( $add_query ) && isset( $add_query['relation'] ) )
		) {
			$add_query = array();
		}

		if (
			2 === count( $org_query )
			&& isset( $org_query['relation'] )
			&& $relation === $org_query['relation']
		) {
			unset( $org_query['relation'] );
		}
		if (
			2 === count( $add_query )
			&& isset( $add_query['relation'] )
			&& $relation === $add_query['relation']
		) {
			unset( $add_query['relation'] );
		}

		$merged_query = array();

		if ( ! empty( $org_query ) && ! empty( $add_query ) ) {
			$merged_query['relation'] = $relation;
		}

		if ( ! empty( $org_query ) ) {
			$merged_query = array_merge(
				$merged_query,
				count( $org_query ) === 1 ? $org_query : array( $org_query )
			);
		}

		if ( ! empty( $add_query ) ) {
			$merged_query = array_merge(
				$merged_query,
				count( $add_query ) === 1 ? $add_query : array( $add_query )
			);
		}

		return $merged_query;
	} // merge_queries

} // Query_Helper
