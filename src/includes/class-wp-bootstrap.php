<?php
/**
 * Class WP_Bootstrap
 *
 * @package immonex\Kickstart
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
	public function __construct( $bootstrap_data, $plugin ) {
		$this->data   = is_array( $bootstrap_data ) ? $bootstrap_data : array();
		$this->prefix = $bootstrap_data['plugin_prefix'];
		$this->plugin = $plugin;

		add_action( 'admin_menu', array( $this, 'add_menu_items' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ), 10 );
		add_action( 'init', array( $this, 'register_custom_post_types' ), 10 );
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
		add_filter( 'request', array( $this, 'reference_column_orderby' ) );
		add_filter( 'parent_file', array( $this, 'set_current_menu' ) );
		add_filter( 'body_class', array( $this, 'check_body_classes' ), 90 );

		add_filter( 'inx_get_taxonomies', array( $this, 'get_taxonomies' ) );
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
					'name'              => _x( 'Locations', 'taxonomy general name', 'immonex-kickstart' ),
					'singular_name'     => _x( 'Location', 'taxonomy singular name', 'immonex-kickstart' ),
					'all_items'         => __( 'All Locations', 'immonex-kickstart' ),
					'edit_item'         => __( 'Edit Location', 'immonex-kickstart' ),
					'view_item'         => __( 'View Location', 'immonex-kickstart' ),
					'update_item'       => __( 'Update Location', 'immonex-kickstart' ),
					'add_new_item'      => __( 'Add New Location', 'immonex-kickstart' ),
					'new_item_name'     => __( 'New Location Name', 'immonex-kickstart' ),
					'parent_item'       => __( 'Parent Location', 'immonex-kickstart' ),
					'parent_item_colon' => __( 'Parent Location:', 'immonex-kickstart' ),
					'search_items'      => __( 'Search Locations', 'immonex-kickstart' ),
					'popular_items'     => __( 'Popular Locations', 'immonex-kickstart' ),
					'not_found'         => __( 'No Locations found.', 'immonex-kickstart' ),
				),
				'public'            => true,
				'show_admin_column' => true,
				'hierarchical'      => true,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => $this->plugin->tax_location_slug_rewrite,
					'with_front' => false,
				),
			),
			$this->prefix . 'type_of_use'    => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Types Of Use', 'taxonomy general name', 'immonex-kickstart' ),
					'singular_name'     => _x( 'Type Of Use', 'taxonomy singular name', 'immonex-kickstart' ),
					'all_items'         => __( 'All Types Of Use', 'immonex-kickstart' ),
					'edit_item'         => __( 'Edit Type Of Use', 'immonex-kickstart' ),
					'view_item'         => __( 'View Type Of Use', 'immonex-kickstart' ),
					'update_item'       => __( 'Update Type Of Use', 'immonex-kickstart' ),
					'add_new_item'      => __( 'Add New Type Of Use', 'immonex-kickstart' ),
					'new_item_name'     => __( 'New Type Of Use Name', 'immonex-kickstart' ),
					'parent_item'       => __( 'Parent Type Of Use', 'immonex-kickstart' ),
					'parent_item_colon' => __( 'Parent Type Of Use:', 'immonex-kickstart' ),
					'search_items'      => __( 'Search Types Of Use', 'immonex-kickstart' ),
					'popular_items'     => __( 'Popular Types Of Use', 'immonex-kickstart' ),
					'not_found'         => __( 'No Types Of Use found.', 'immonex-kickstart' ),
				),
				'public'            => true,
				'show_admin_column' => false,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => $this->plugin->tax_type_of_use_slug_rewrite,
					'with_front' => false,
				),
			),
			$this->prefix . 'property_type'  => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Property Types', 'taxonomy general name', 'immonex-kickstart' ),
					'singular_name'     => _x( 'Property Type', 'taxonomy singular name', 'immonex-kickstart' ),
					'all_items'         => __( 'All Property Types', 'immonex-kickstart' ),
					'edit_item'         => __( 'Edit Property Type', 'immonex-kickstart' ),
					'view_item'         => __( 'View Property Type', 'immonex-kickstart' ),
					'update_item'       => __( 'Update Property Type', 'immonex-kickstart' ),
					'add_new_item'      => __( 'Add New Property Type', 'immonex-kickstart' ),
					'new_item_name'     => __( 'New Property Type Name', 'immonex-kickstart' ),
					'parent_item'       => __( 'Parent Property Type', 'immonex-kickstart' ),
					'parent_item_colon' => __( 'Parent Property Type:', 'immonex-kickstart' ),
					'search_items'      => __( 'Search Property Types', 'immonex-kickstart' ),
					'popular_items'     => __( 'Popular Property Types', 'immonex-kickstart' ),
					'not_found'         => __( 'No Property Types found.', 'immonex-kickstart' ),
				),
				'public'            => true,
				'show_admin_column' => true,
				'hierarchical'      => true,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => $this->plugin->tax_property_type_slug_rewrite,
					'with_front' => false,
				),
			),
			$this->prefix . 'marketing_type' => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Marketing Types', 'taxonomy general name', 'immonex-kickstart' ),
					'singular_name'     => _x( 'Marketing Type', 'taxonomy singular name', 'immonex-kickstart' ),
					'all_items'         => __( 'All Marketing Types', 'immonex-kickstart' ),
					'edit_item'         => __( 'Edit Marketing Type', 'immonex-kickstart' ),
					'view_item'         => __( 'View Marketing Type', 'immonex-kickstart' ),
					'update_item'       => __( 'Update Marketing Type', 'immonex-kickstart' ),
					'add_new_item'      => __( 'Add New Marketing Type', 'immonex-kickstart' ),
					'new_item_name'     => __( 'New Marketing Type Name', 'immonex-kickstart' ),
					'parent_item'       => __( 'Parent Marketing Type', 'immonex-kickstart' ),
					'parent_item_colon' => __( 'Parent Marketing Type:', 'immonex-kickstart' ),
					'search_items'      => __( 'Search Marketing Types', 'immonex-kickstart' ),
					'popular_items'     => __( 'Popular Marketing Types', 'immonex-kickstart' ),
					'not_found'         => __( 'No Marketing Types found.', 'immonex-kickstart' ),
				),
				'public'            => true,
				'show_admin_column' => true,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => $this->plugin->tax_marketing_type_slug_rewrite,
					'with_front' => false,
				),
			),
			$this->prefix . 'project'        => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Projects', 'taxonomy general name', 'immonex-kickstart' ),
					'singular_name'     => _x( 'Project', 'taxonomy singular name', 'immonex-kickstart' ),
					'all_items'         => __( 'All Projects', 'immonex-kickstart' ),
					'edit_item'         => __( 'Edit Project', 'immonex-kickstart' ),
					'view_item'         => __( 'View Project', 'immonex-kickstart' ),
					'update_item'       => __( 'Update Project', 'immonex-kickstart' ),
					'add_new_item'      => __( 'Add New Project', 'immonex-kickstart' ),
					'new_item_name'     => __( 'New Project', 'immonex-kickstart' ),
					'parent_item'       => __( 'Parent Project', 'immonex-kickstart' ),
					'parent_item_colon' => __( 'Parent Project:', 'immonex-kickstart' ),
					'search_items'      => __( 'Search Project', 'immonex-kickstart' ),
					'popular_items'     => __( 'Popular Projects', 'immonex-kickstart' ),
					'not_found'         => __( 'No Projects found.', 'immonex-kickstart' ),
				),
				'public'            => true,
				'show_admin_column' => false,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => $this->plugin->tax_project_slug_rewrite,
					'with_front' => false,
				),
			),
			$this->prefix . 'feature'        => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Features', 'taxonomy general name', 'immonex-kickstart' ),
					'singular_name'     => _x( 'Feature', 'taxonomy singular name', 'immonex-kickstart' ),
					'all_items'         => __( 'All Features', 'immonex-kickstart' ),
					'edit_item'         => __( 'Edit Feature', 'immonex-kickstart' ),
					'view_item'         => __( 'View Feature', 'immonex-kickstart' ),
					'update_item'       => __( 'Update Feature', 'immonex-kickstart' ),
					'add_new_item'      => __( 'Add New Feature', 'immonex-kickstart' ),
					'new_item_name'     => __( 'New Feature Name', 'immonex-kickstart' ),
					'parent_item'       => __( 'Parent Feature', 'immonex-kickstart' ),
					'parent_item_colon' => __( 'Parent Feature:', 'immonex-kickstart' ),
					'search_items'      => __( 'Search Features', 'immonex-kickstart' ),
					'popular_items'     => __( 'Popular Features', 'immonex-kickstart' ),
					'not_found'         => __( 'No Features found.', 'immonex-kickstart' ),
				),
				'public'            => true,
				'show_admin_column' => false,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => $this->plugin->tax_feature_slug_rewrite,
					'with_front' => false,
				),
			),
			$this->prefix . 'label'          => array(
				'description'       => '',
				'labels'            => array(
					'name'              => _x( 'Labels', 'taxonomy general name', 'immonex-kickstart' ),
					'singular_name'     => _x( 'Label', 'taxonomy singular name', 'immonex-kickstart' ),
					'all_items'         => __( 'All Labels', 'immonex-kickstart' ),
					'edit_item'         => __( 'Edit Label', 'immonex-kickstart' ),
					'view_item'         => __( 'View Label', 'immonex-kickstart' ),
					'update_item'       => __( 'Update Label', 'immonex-kickstart' ),
					'add_new_item'      => __( 'Add New Label', 'immonex-kickstart' ),
					'new_item_name'     => __( 'New Label Name', 'immonex-kickstart' ),
					'parent_item'       => __( 'Parent Label', 'immonex-kickstart' ),
					'parent_item_colon' => __( 'Parent Label:', 'immonex-kickstart' ),
					'search_items'      => __( 'Search Labels', 'immonex-kickstart' ),
					'popular_items'     => __( 'Popular Labels', 'immonex-kickstart' ),
					'not_found'         => __( 'No Labels found.', 'immonex-kickstart' ),
				),
				'public'            => true,
				'show_admin_column' => false,
				'hierarchical'      => false,
				'show_in_rest'      => true,
				'rewrite'           => array(
					'slug'       => $this->plugin->tax_label_slug_rewrite,
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

		if ( is_array( $submenu_items ) && count( $submenu_items ) > 0 ) {
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
				// @codingStandardsIgnoreLine
				$submenu_file = 'edit.php?post_type=' . $current_screen->post_type;
			}

			if ( 'edit-tags.php' === $pagenow ) {
				// @codingStandardsIgnoreLine
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
					'name'               => __( 'Properties', 'immonex-kickstart' ),
					'singular_name'      => __( 'Property', 'immonex-kickstart' ),
					'add_new_item'       => __( 'Add New Property', 'immonex-kickstart' ),
					'edit_item'          => __( 'Edit Property', 'immonex-kickstart' ),
					'new_item'           => __( 'New Property', 'immonex-kickstart' ),
					'view_item'          => __( 'View Property', 'immonex-kickstart' ),
					'search_items'       => __( 'Search Properties', 'immonex-kickstart' ),
					'not_found'          => __( 'No properties found', 'immonex-kickstart' ),
					'not_found_in_trash' => __( 'No properties found in Trash', 'immonex-kickstart' ),
				),
				'public'       => true,
				'has_archive'  => true,
				'show_ui'      => true,
				'show_in_menu' => $this->prefix . 'menu',
				'show_in_rest' => true,
				'supports'     => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt' ),
				'map_meta_cap' => true,
				'rewrite'      => array(
					'slug'       => $this->plugin->property_post_type_slug_rewrite,
					'with_front' => true,
				),
			)
		);

		if (
			( $this->plugin->property_list_page_id || $this->plugin->property_details_page_id )
			&& ! empty( $property_post_type_args['rewrite']['slug'] )
		) {
			$archive_redirect_slug   = get_page_uri( $this->plugin->property_list_page_id );
			$single_redirect_slug    = get_page_uri( $this->plugin->property_details_page_id );
			$translated_rewrite_slug = apply_filters(
				'inx_translated_slug',
				strtolower( $property_post_type_args['rewrite']['slug'] ),
				$this->data['property_post_type_name'],
				substr( get_locale(), 0, 2 ),
				true
			);
		}

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
				'name'          => __( 'Property Archive Page', 'immonex-kickstart' ),
				'id'            => $this->data['public_prefix'] . 'property-archive',
				'description'   => __( 'Widgets in this area will be shown on property archive pages.', 'immonex-kickstart' ),
				'before_widget' => '<li id="%1$s" class="widget %2$s">',
				'after_widget'  => '</li>',
				'before_title'  => '<h2 class="widgettitle">',
				'after_title'   => '</h2>',
			)
		);

		// Sidebar for property detail page.
		register_sidebar(
			array(
				'name'          => __( 'Property Detail Page', 'immonex-kickstart' ),
				'id'            => $this->data['public_prefix'] . 'property-details',
				'description'   => __( 'Widgets in this area will be shown on property detail pages.', 'immonex-kickstart' ),
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
		$image_sizes = apply_filters(
			'inx_image_sizes',
			array(
				'inx-thumbnail' => array(
					'width'  => 120,
					'height' => 68,
					'crop'   => true,
				),
			)
		);

		if ( is_array( $image_sizes ) && count( $image_sizes ) > 0 ) {
			foreach ( $image_sizes as $key => $params ) {
				if (
					empty( $params['width'] ) ||
					empty( $params['height'] )
				) {
					continue;
				}

				$crop = isset( $params['crop'] ) ? $params['crop'] : true;

				add_image_size( $key, (int) $params['width'], (int) $params['height'], $crop );
			}
		}
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
				$is_reference = get_post_meta( $post->ID, '_immonex_is_reference', true );
				echo wp_sprintf(
					'<input type="checkbox" data-property-id="%s" onchange="inx_state.beToggleReference(event)"%s>',
					esc_attr( $post->ID ),
					$is_reference ? ' checked' : ''
				);
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
				$modified_columns['reference'] = __( 'Reference Property', 'immonex-kickstart' );
				$author_title                  = $title;
			} else {
				if (
					'date' === $key
					&& ! empty( $author_title )
				) {
					$modified_columns['author'] = $author_title;
				}

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
		$columns['reference'] = 'reference';

		return $columns;
	} // add_posts_custom_sortable_columns

	/**
	 * Make backend property lists sortable by reference state.
	 *
	 * @since 1.6.15-beta
	 *
	 * @param mixed[] $query_vars Query vars.
	 *
	 * @return mixed[] Possibly extended query vars.
	 */
	public function reference_column_orderby( $query_vars ) {
		if (
			is_admin()
			&& isset( $query_vars['orderby'] )
			&& 'reference' === $query_vars['orderby']
		) {
			$query_vars = array_merge(
				$query_vars,
				array(
					// @codingStandardsIgnoreLine
					'meta_key' => '_immonex_is_reference',
					'orderby'  => 'meta_value_num',
				)
			);
		}

		return $query_vars;
	} // reference_column_orderby

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
			$irregular_has_sidebar = array_search( 'has-sidebar', $classes, true );
			if ( false !== $irregular_has_sidebar ) {
				unset( $classes[ $irregular_has_sidebar ] );
			}
		}

		return $classes;
	} // check_body_classes

} // class WP_Bootstrap
