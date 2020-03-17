<?php
/**
 * Class WP_Bootstrap
 *
 * @package immonex-kickstart
 */

namespace immonex\Kickstart;

/**
 * Register plugin-specific menus, custom post types and taxonomies.
 */
class WP_Bootstrap {

	/**
	 * Array of bootstrap data
	 *
	 * @var mixed[]
	 */
	private $data;

	/**
	 * Prefix for custom post type and taxonomy names
	 *
	 * @var string
	 */
	private $prefix;

	/**
	 * Main plugin object
	 *
	 * @var \immonex\Kickstart\Kickstart
	 */
	private $plugin;

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @param mixed[]                      $bootstrap_data Plugin bootstrap data.
	 * @param \immonex\Kickstart\Kickstart $plugin Main plugin object.
	 */
	public function __construct( $bootstrap_data = array(), $plugin ) {
		$this->data   = $bootstrap_data;
		$this->prefix = $bootstrap_data['plugin_prefix'];
		$this->plugin = $plugin;

		add_action( 'admin_menu', array( $this, 'add_menu_items' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ), 10 );
		add_action( 'init', array( $this, 'register_custom_post_types' ), 20 );
		add_action( 'init', array( $this, 'register_image_sizes' ) );
		add_action( 'widgets_init', array( $this, 'register_sidebars' ) );
		add_action(
			'manage_' . $bootstrap_data['property_post_type_name'] . '_posts_custom_column',
			array( $this, 'add_posts_custom_columns' )
		);

		add_filter(
			'manage_edit-' . $bootstrap_data['property_post_type_name'] . '_columns',
			array( $this, 'add_posts_custom_columns_header_footer' )
		);
		add_filter(
			'manage_edit-' . $bootstrap_data['property_post_type_name'] . '_sortable_columns',
			array( $this, 'add_posts_custom_sortable_columns' )
		);
		add_filter( 'parent_file', array( $this, 'set_current_menu' ) );

		add_filter( 'body_class', array( $this, 'check_body_classes' ), 90 );
	} // __construct

	/**
	 * Define taxonomies for categorizing immonex properties.
	 *
	 * @since 1.0.0
	 */
	public function get_taxonomies() {
		$taxonomies = array(
			$this->prefix . 'location'       => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Locations', 'taxonomy general name', 'inx' ),
					'singular_name'     => _x( 'Location', 'taxonomy singular name', 'inx' ),
					'all_items'         => __( 'All Locations', 'inx' ),
					'edit_item'         => __( 'Edit Location', 'inx' ),
					'view_item'         => __( 'View Location', 'inx' ),
					'update_item'       => __( 'Update Location', 'inx' ),
					'add_new_item'      => __( 'Add New Location', 'inx' ),
					'new_item_name'     => __( 'New Location Name', 'inx' ),
					'parent_item'       => __( 'Parent Location', 'inx' ),
					'parent_item_colon' => __( 'Parent Location:', 'inx' ),
					'search_items'      => __( 'Search Locations', 'inx' ),
					'popular_items'     => __( 'Popular Locations', 'inx' ),
					'not_found'         => __( 'No Locations found.', 'inx' ),
				),
				'public'            => true,
				'show_admin_column' => true,
				'hierarchical'      => true,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => _x( 'properties/location', 'Custom Taxonomy Slug', 'inx' ),
					'with_front' => false,
				),
			),
			$this->prefix . 'type_of_use'    => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Types Of Use', 'taxonomy general name', 'inx' ),
					'singular_name'     => _x( 'Type Of Use', 'taxonomy singular name', 'inx' ),
					'all_items'         => __( 'All Types Of Use', 'inx' ),
					'edit_item'         => __( 'Edit Type Of Use', 'inx' ),
					'view_item'         => __( 'View Type Of Use', 'inx' ),
					'update_item'       => __( 'Update Type Of Use', 'inx' ),
					'add_new_item'      => __( 'Add New Type Of Use', 'inx' ),
					'new_item_name'     => __( 'New Type Of Use Name', 'inx' ),
					'parent_item'       => __( 'Parent Type Of Use', 'inx' ),
					'parent_item_colon' => __( 'Parent Type Of Use:', 'inx' ),
					'search_items'      => __( 'Search Types Of Use', 'inx' ),
					'popular_items'     => __( 'Popular Types Of Use', 'inx' ),
					'not_found'         => __( 'No Types Of Use found.', 'inx' ),
				),
				'public'            => true,
				'show_admin_column' => false,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => _x( 'properties/type-of-use', 'Custom Taxonomy Slug', 'inx' ),
					'with_front' => false,
				),
			),
			$this->prefix . 'property_type'  => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Property Types', 'taxonomy general name', 'inx' ),
					'singular_name'     => _x( 'Property Type', 'taxonomy singular name', 'inx' ),
					'all_items'         => __( 'All Property Types', 'inx' ),
					'edit_item'         => __( 'Edit Property Type', 'inx' ),
					'view_item'         => __( 'View Property Type', 'inx' ),
					'update_item'       => __( 'Update Property Type', 'inx' ),
					'add_new_item'      => __( 'Add New Property Type', 'inx' ),
					'new_item_name'     => __( 'New Property Type Name', 'inx' ),
					'parent_item'       => __( 'Parent Property Type', 'inx' ),
					'parent_item_colon' => __( 'Parent Property Type:', 'inx' ),
					'search_items'      => __( 'Search Property Types', 'inx' ),
					'popular_items'     => __( 'Popular Property Types', 'inx' ),
					'not_found'         => __( 'No Property Types found.', 'inx' ),
				),
				'public'            => true,
				'show_admin_column' => true,
				'hierarchical'      => true,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => _x( 'properties/type', 'Custom Taxonomy Slug', 'inx' ),
					'with_front' => false,
				),
			),
			$this->prefix . 'marketing_type' => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Marketing Types', 'taxonomy general name', 'inx' ),
					'singular_name'     => _x( 'Marketing Type', 'taxonomy singular name', 'inx' ),
					'all_items'         => __( 'All Marketing Types', 'inx' ),
					'edit_item'         => __( 'Edit Marketing Type', 'inx' ),
					'view_item'         => __( 'View Marketing Type', 'inx' ),
					'update_item'       => __( 'Update Marketing Type', 'inx' ),
					'add_new_item'      => __( 'Add New Marketing Type', 'inx' ),
					'new_item_name'     => __( 'New Marketing Type Name', 'inx' ),
					'parent_item'       => __( 'Parent Marketing Type', 'inx' ),
					'parent_item_colon' => __( 'Parent Marketing Type:', 'inx' ),
					'search_items'      => __( 'Search Marketing Types', 'inx' ),
					'popular_items'     => __( 'Popular Marketing Types', 'inx' ),
					'not_found'         => __( 'No Marketing Types found.', 'inx' ),
				),
				'public'            => true,
				'show_admin_column' => true,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => _x( 'properties/buy-rent', 'Custom Taxonomy Slug', 'inx' ),
					'with_front' => false,
				),
			),
			$this->prefix . 'feature'        => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Features', 'taxonomy general name', 'inx' ),
					'singular_name'     => _x( 'Feature', 'taxonomy singular name', 'inx' ),
					'all_items'         => __( 'All Features', 'inx' ),
					'edit_item'         => __( 'Edit Feature', 'inx' ),
					'view_item'         => __( 'View Feature', 'inx' ),
					'update_item'       => __( 'Update Feature', 'inx' ),
					'add_new_item'      => __( 'Add New Feature', 'inx' ),
					'new_item_name'     => __( 'New Feature Name', 'inx' ),
					'parent_item'       => __( 'Parent Feature', 'inx' ),
					'parent_item_colon' => __( 'Parent Feature:', 'inx' ),
					'search_items'      => __( 'Search Features', 'inx' ),
					'popular_items'     => __( 'Popular Features', 'inx' ),
					'not_found'         => __( 'No Features found.', 'inx' ),
				),
				'public'            => true,
				'show_admin_column' => false,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => _x( 'properties/feature', 'Custom Taxonomy Slug', 'inx' ),
					'with_front' => false,
				),
			),
			$this->prefix . 'label'          => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Labels', 'taxonomy general name', 'inx' ),
					'singular_name'     => _x( 'Label', 'taxonomy singular name', 'inx' ),
					'all_items'         => __( 'All Labels', 'inx' ),
					'edit_item'         => __( 'Edit Label', 'inx' ),
					'view_item'         => __( 'View Label', 'inx' ),
					'update_item'       => __( 'Update Label', 'inx' ),
					'add_new_item'      => __( 'Add New Label', 'inx' ),
					'new_item_name'     => __( 'New Label Name', 'inx' ),
					'parent_item'       => __( 'Parent Label', 'inx' ),
					'parent_item_colon' => __( 'Parent Label:', 'inx' ),
					'search_items'      => __( 'Search Labels', 'inx' ),
					'popular_items'     => __( 'Popular Labels', 'inx' ),
					'not_found'         => __( 'No Labels found.', 'inx' ),
				),
				'public'            => true,
				'show_admin_column' => false,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => _x( 'properties/label', 'Custom Taxonomy Slug', 'inx' ),
					'with_front' => false,
				),
			),
		);

		return apply_filters( 'inx_taxonomies', $taxonomies );
	} // get_taxonomies

	/**
	 * Create a custom backend menu for all immonex related items.
	 *
	 * @since 1.0.0
	 */
	public function add_menu_items() {
		add_menu_page(
			$this->data['plugin_name'],
			'immonex',
			'edit_posts',
			$this->prefix . 'menu',
			'post-new.php?post_type=' . $this->data['property_post_type_name'],
			'dashicons-admin-multisite',
			5
		);

		$submenu_items = array();
		$taxonomies    = $this->get_taxonomies();
		$menu_pos_cnt  = 100;

		$submenu_items[] = array(
			$this->prefix . 'menu',
			'',
			'',
			'read',
			'#inx-submenu-separator',
			'',
			$menu_pos_cnt - 1,
		);

		if ( $taxonomies && count( $taxonomies ) > 0 ) {
			foreach ( $taxonomies as $taxonomy => $args ) {
				$args = array(
					$this->prefix . 'menu',
					$args['labels']['add_new_item'],
					$args['labels']['name'],
					'manage_categories',
					wp_sprintf(
						'edit-tags.php?taxonomy=%s&post_type=%s',
						$taxonomy,
						$this->data['property_post_type_name']
					),
					'',
					$menu_pos_cnt,
				);

				$submenu_items[] = $args;

				$menu_pos_cnt += 10;
			}
		}

		$submenu_items[] = array(
			$this->prefix . 'menu',
			'',
			'',
			'read',
			'#inx-submenu-separator',
			'',
			899,
		);

		$submenu_items = apply_filters( 'inx_submenu_items', $submenu_items );

		if ( $submenu_items && count( $submenu_items ) > 0 ) {
			usort(
				$submenu_items,
				function ( $a, $b ) {
					if ( $a[6] === $b[6] ) {
						return 0;
					}
					return $a[6] < $b[6] ? -1 : 1;
				}
			);

			foreach ( $submenu_items as $item ) {
				call_user_func_array( 'add_submenu_page', $item );
			}
		}
	} // add_menu_items

	/**
	 * Set the current menu item and open the custom backend main menu defined
	 * above (filter callback).
	 *
	 * @see Bootstrap::add_menu_items()
	 *
	 * @since 1.0.0
	 *
	 * @param string $parent_file Parent file submitted via WP filter.
	 *
	 * @return string Alternative parent file term.
	 */
	public function set_current_menu( $parent_file ) {
		global $submenu_file, $current_screen, $pagenow;

		if ( $current_screen->post_type === $this->data['property_post_type_name'] ) {
			if ( 'post.php' === $pagenow ) {
				$submenu_file = 'edit.php?post_type=' . $current_screen->post_type;
			}

			if ( 'edit-tags.php' === $pagenow ) {
				$submenu_file = wp_sprintf( 'edit-tags.php?taxonomy=%s&post_type=%s', $current_screen->taxonomy, $current_screen->post_type );
			}

			$parent_file = $this->prefix . 'menu';
		}

		return $parent_file;
	} // set_current_menu

	/**
	 * Register a custom post type for immonex properties.
	 *
	 * @since 1.0.0
	 */
	public function register_custom_post_types() {
		$property_post_type_args = apply_filters(
			'inx_property_post_type_args',
			array(
				'labels'       => array(
					'name'               => __( 'Properties', 'inx' ),
					'singular_name'      => __( 'Property', 'inx' ),
					'add_new_item'       => __( 'Add New Property', 'inx' ),
					'edit_item'          => __( 'Edit Property', 'inx' ),
					'new_item'           => __( 'New Property', 'inx' ),
					'view_item'          => __( 'View Property', 'inx' ),
					'search_items'       => __( 'Search Properties', 'inx' ),
					'not_found'          => __( 'No properties found', 'inx' ),
					'not_found_in_trash' => __( 'No properties found in Trash', 'inx' ),
				),
				'public'       => true,
				'has_archive'  => true,
				'show_ui'      => true,
				'show_in_menu' => $this->prefix . 'menu',
				'show_in_rest' => true,
				'supports'     => array( 'title', 'editor', 'author', 'thumbnail' ),
				'map_meta_cap' => true,
				'rewrite'      => array(
					'slug' => _x( 'properties', 'Custom Post Type Slug (plural only!)', 'inx' ),
				),
			)
		);

		register_post_type(
			$this->data['property_post_type_name'],
			$property_post_type_args
		);
	} // register_custom_post_types

	/**
	 * Register property-related taxonomies.
	 *
	 * @see Bootstrap::get_taxonomies()
	 *
	 * @since 1.0.0
	 */
	public function register_taxonomies() {
		$taxonomies = $this->get_taxonomies();

		foreach ( $taxonomies as $taxonomy => $args ) {
			register_taxonomy( $taxonomy, array( $this->data['property_post_type_name'] ), $args );
		}
	} // register_taxonomies

	/**
	 * Register plugin-specific sidebars.
	 *
	 * @since 1.0.0
	 */
	public function register_sidebars() {
		// Sidebar for property list (archive) pages.
		register_sidebar(
			array(
				'name'          => __( 'Property Archive Page', 'inx' ),
				'id'            => $this->data['public_prefix'] . 'property-archive',
				'description'   => __( 'Widgets in this area will be shown on property archive pages.', 'inx' ),
				'before_widget' => '<li id="%1$s" class="widget %2$s">',
				'after_widget'  => '</li>',
				'before_title'  => '<h2 class="widgettitle">',
				'after_title'   => '</h2>',
			)
		);

		// Sidebar for property detail page.
		register_sidebar(
			array(
				'name'          => __( 'Property Detail Page', 'inx' ),
				'id'            => $this->data['public_prefix'] . 'property-details',
				'description'   => __( 'Widgets in this area will be shown on property detail pages.', 'inx' ),
				'before_widget' => '<li id="%1$s" class="widget %2$s">',
				'after_widget'  => '</li>',
				'before_title'  => '<h2 class="widgettitle">',
				'after_title'   => '</h2>',
			)
		);
	} // register_sidebars

	/**
	 * Register custom image sizes.
	 *
	 * @since 1.0.0
	 */
	public function register_image_sizes() {
		add_image_size( 'inx-thumbnail', 120, 68, true );
	} // register_image_sizes

	/**
	 * Add contents for custom columns in backend property lists.
	 *
	 * @since 1.0.0
	 *
	 * @param string $column Current column.
	 */
	public function add_posts_custom_columns( $column ) {
		global $post;

		switch ( $column ) {
			case 'reference':
				$is_reference = get_post_meta( $post->ID, '_immonex_is_reference', true ) ? 'true' : 'false';
				echo '<inx-backend-reference-toggle property-id="' . esc_attr( $post->ID ) . '" :default-checked="' . esc_attr( $is_reference ) . '">';
				break;
		}
	} // add_posts_custom_columns

	/**
	 * Add headers/footers for custom columns in backend property lists.
	 *
	 * @since 1.0.0
	 *
	 * @param string[] $columns Associative array of current columns.
	 *
	 * @return string[] Extended columns array.
	 */
	public function add_posts_custom_columns_header_footer( $columns ) {
		$modified_columns = array();

		foreach ( $columns as $key => $title ) {
			if ( 'author' === $key ) {
				$modified_columns['reference'] = __( 'Reference Property', 'inx' );
			} else {
				$modified_columns[ $key ] = $title;
			}
		}

		return $modified_columns;
	} // add_posts_custom_columns_header_footer

	/**
	 * Make custom columns in backend property lists sortable.
	 *
	 * @since 1.0.0
	 *
	 * @param string[] $columns Associative array of current columns.
	 *
	 * @return string[] Extended columns array.
	 */
	public function add_posts_custom_sortable_columns( $columns ) {
		$columns['reference'] = '_immonex_is_reference';

		return $columns;
	} // add_posts_custom_sortable_columns

	/**
	 * Filter out irregular body classes (e.g. has-sidebar in property pages).
	 *
	 * @since 1.0.0
	 *
	 * @param string[] $classes Current class array.
	 *
	 * @return string[] Maybe modified array.
	 */
	public function check_body_classes( $classes ) {
		if (
			get_post_type() === $this->data['property_post_type_name'] &&
			count( $classes ) > 0
		) {
			$irregular_has_sidebar = array_search( 'has-sidebar', $classes );
			if ( false !== $irregular_has_sidebar ) {
				unset( $classes[ $irregular_has_sidebar ] );
			}
		}

		return $classes;
	} // check_body_classes

} // class WP_Bootstrap
