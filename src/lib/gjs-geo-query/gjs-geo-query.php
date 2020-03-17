<?php if(!defined('ABSPATH')) { die(); } // Include in all php files, to prevent direct execution
/**
 * Plugin Name: WP Geo Query
 * Plugin URI: https://gschoppe.com/wordpress/geo-searches/
 * Description: Adds location search support to WP_Query, making it easy to create completely custom "Find Location" pages.
 * Author: Greg Schoppe
 * Author URI: https://gschoppe.com
 * Version: 1.0.0
 **/

if( !class_exists('GJSGeoQuery') ) {
	class GJSGeoQuery {
		public static function Instance() {
			static $instance = null;
			if ($instance === null) {
				$instance = new self();
			}
			return $instance;
		}

		private function __construct() {
			add_filter( 'posts_fields' , array( $this, 'posts_fields'  ), 10, 2 );
			add_filter( 'posts_join'   , array( $this, 'posts_join'    ), 10, 2 );
			add_filter( 'posts_where'  , array( $this, 'posts_where'   ), 10, 2 );
			add_filter( 'posts_orderby', array( $this, 'posts_orderby' ), 10, 2 );
		}

		// add a calculated "distance" parameter to the sql query, using a haversine formula
		public function posts_fields( $sql, $query ) {
			global $wpdb;
			$geo_query = $query->get('geo_query');
			if( $geo_query ) {

				if( $sql ) {
					$sql .= ', ';
				}
				$sql .= $this->haversine_term( $geo_query ) . " AS geo_query_distance";
			}
			return $sql;
		}

		public function posts_join( $sql, $query ) {
			global $wpdb;
			$geo_query = $query->get('geo_query');
			if( $geo_query ) {

				if( $sql ) {
					$sql .= ' ';
				}
				$sql .= "INNER JOIN " . $wpdb->prefix . "postmeta AS geo_query_lat ON ( " . $wpdb->prefix . "posts.ID = geo_query_lat.post_id ) ";
				$sql .= "INNER JOIN " . $wpdb->prefix . "postmeta AS geo_query_lng ON ( " . $wpdb->prefix . "posts.ID = geo_query_lng.post_id ) ";
			}
			return $sql;
		}

		// match on the right metafields, and filter by distance
		public function posts_where( $sql, $query ) {
			global $wpdb;
			$geo_query = $query->get('geo_query');
			if( $geo_query ) {
				$lat_field = 'latitude';
				if( !empty( $geo_query['lat_field'] ) ) {
					$lat_field =  $geo_query['lat_field'];
				}
				$lng_field = 'longitude';
				if( !empty( $geo_query['lng_field'] ) ) {
					$lng_field =  $geo_query['lng_field'];
				}
				$distance = 20;
				if( isset( $geo_query['distance'] ) ) {
					$distance = $geo_query['distance'];
				}
				if( $sql ) {
					$sql .= " AND ";
				}
				$haversine = $this->haversine_term( $geo_query );
				$new_sql = "( geo_query_lat.meta_key = %s AND geo_query_lng.meta_key = %s AND " . $haversine . " <= %f )";
				$sql .= $wpdb->prepare( $new_sql, $lat_field, $lng_field, $distance );
			}
			return $sql;
		}

		// handle ordering
		public function posts_orderby( $sql, $query ) {
			$geo_query = $query->get('geo_query');
			if( $geo_query ) {
				$orderby = $query->get('orderby');
				$order   = $query->get('order');
				if( $orderby == 'distance' ) {
					if( !$order ) {
						$order = 'ASC';
					}
					$sql = 'geo_query_distance ' . $order;
				}
			}
			return $sql;
		}

		public static function the_distance( $post_obj = null, $round = false ) {
			echo self::get_the_distance( $post_obj, $round );
		}

		public static function get_the_distance( $post_obj = null, $round = false ) {
			global $post;
			if( !$post_obj ) {
				$post_obj = $post;
			}
			if( property_exists( $post_obj, 'geo_query_distance' ) ) {
				$distance = $post_obj->geo_query_distance;
				if( $round !== false ) {
					$distance = round( $distance, $round );
				}
				return $distance;
			}
			return false;
		}

		private function haversine_term( $geo_query ) {
			global $wpdb;
			$units = "miles";
			if( !empty( $geo_query['units'] ) ) {
				$units = strtolower( $geo_query['units'] );
			}
			$radius = 3959;
			if( in_array( $units, array( 'km', 'kilometers' ) ) ) {
				$radius = 6371;
			}
			$lat_field = "geo_query_lat.meta_value";
			$lng_field = "geo_query_lng.meta_value";
			$lat = 0;
			$lng = 0;
			if( isset( $geo_query['latitude'] ) ) {
				$lat = $geo_query['latitude' ];
			}
			if(  isset( $geo_query['longitude'] ) ) {
				$lng = $geo_query['longitude'];
			}
			$haversine  = "( " . $radius . " * ";
			$haversine .=     "acos( cos( radians(%f) ) * cos( radians( " . $lat_field . " ) ) * ";
			$haversine .=     "cos( radians( " . $lng_field . " ) - radians(%f) ) + ";
			$haversine .=     "sin( radians(%f) ) * sin( radians( " . $lat_field . " ) ) ) ";
			$haversine .= ")";
			$haversine  = $wpdb->prepare( $haversine, array( $lat, $lng, $lat ) );
			return $haversine;
		}
	}
	GJSGeoQuery::Instance();
}

if( !function_exists( 'the_distance' ) ) {
	function the_distance( $post_obj = null, $round = false ) {
		GJSGeoQuery::the_distance( $post_obj, $round );
	}
}

if( !function_exists( 'get_the_distance' ) ) {
	function get_the_distance( $post_obj = null, $round = false ) {
		return GJSGeoQuery::get_the_distance( $post_obj, $round );
	}
}