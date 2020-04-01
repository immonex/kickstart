<?php
/**
 * Template for combining/arranging multiple property details sections
 *
 * @package immonex-kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $immonex_kickstart;

$inx_skin_available_elements = $template_data['detail_page_elements'];

// Shall specific elements be INCLUDED (priority) or EXCLUDED?
$inx_skin_include_elements = isset( $template_data['elements'] ) && $template_data['elements'];
$inx_skin_exclude_elements = ! $inx_skin_include_elements && isset( $template_data['exclude'] ) && $template_data['exclude'];

if ( $inx_skin_include_elements || $inx_skin_exclude_elements ) {
	// Render one ore more specified detail page elements.
	if ( $inx_skin_include_elements ) {
		$inx_skin_element_keys = is_array( $template_data['elements'] ) ?
			$template_data['elements'] :
			array_map( 'trim', explode( ',', $template_data['elements'] ) );
	} else {
		$inx_skin_element_keys         = array_keys( $inx_skin_available_elements );
		$inx_skin_exclude_element_keys = is_array( $template_data['exclude'] ) ?
			$template_data['exclude'] :
			array_map( 'trim', explode( ',', $template_data['exclude'] ) );

		if ( count( $inx_skin_exclude_element_keys ) > 0 ) {
			foreach ( $inx_skin_exclude_element_keys as $inx_skin_exclude_key ) {
				$inx_skin_array_key = array_search( $inx_skin_exclude_key, $inx_skin_element_keys );
				if ( false !== $inx_skin_array_key ) {
					unset( $inx_skin_element_keys[ $inx_skin_array_key ] );
				}
			}
		}
	}
	$inx_skin_page_elements = array();
	$inx_skin_enable_tabs   = isset( $template_data['enable-tabs'] ) ? (bool) $template_data['enable-tabs'] : false;

	if ( count( $inx_skin_element_keys ) > 0 ) {
		foreach ( $inx_skin_element_keys as $inx_skin_key ) {
			$inx_skin_key      = strtolower( $inx_skin_key );
			$inx_skin_template = $utils['template']->locate_template_file( "single-property/{$inx_skin_key}" );
			if (
				in_array( $inx_skin_key, array_keys( $inx_skin_available_elements ) ) &&
				! empty( $inx_skin_available_elements[ $inx_skin_key ]['template'] )
			) {
				$inx_skin_page_elements[ $inx_skin_key ] = $inx_skin_available_elements[ $inx_skin_key ];
			} elseif ( $inx_skin_template ) {
				$inx_skin_page_elements[ basename( $inx_skin_key, '.php' ) ] = array(
					'template' => basename( $inx_skin_key, '.php' ),
				);
			}
		}
	}
} else {
	// Render all available detail page elements.
	$inx_skin_page_elements = $inx_skin_available_elements;
	$inx_skin_enable_tabs   = isset( $template_data['enable-tabs'] ) ? (bool) $template_data['enable-tabs'] : true;
}

if ( $inx_skin_enable_tabs ) :
	$inx_skin_tabs = array(
		'main_description' => array(
			'title'    => __( 'The Property', 'immonex-kickstart' ),
			'elements' => array( 'main_description' ),
		),
		'details'          => array(
			'title'    => __( 'Details', 'immonex-kickstart' ),
			'elements' => array( 'areas', 'condition', 'misc' ),
		),
		'features'         => array(
			'title'    => __( 'Features', 'immonex-kickstart' ),
			'elements' => array( 'features' ),
		),
		'epass'            => array(
			'title'    => __( 'Energy Pass', 'immonex-kickstart' ),
			'elements' => array( 'epass', 'epass_energy_scale', 'epass_images' ),
		),
		'location'         => array(
			'title'    => __( 'Location & Infrastructure', 'immonex-kickstart' ),
			'elements' => array( 'location' ),
		),
		'prices'           => array(
			'title'    => __( 'Prices', 'immonex-kickstart' ),
			'elements' => array( 'prices' ),
		),
		'downloads_links'  => array(
			'title'    => __( 'Downloads & Links', 'immonex-kickstart' ),
			'elements' => array( 'downloads_links' ),
		),
	);

	if ( isset( $inx_skin_page_elements['head'] ) ) {
		do_action(
			'inx_render_property_contents',
			get_the_ID(),
			basename( __DIR__ ) . '/' . $inx_skin_page_elements['head']['template'],
			$inx_skin_page_elements['head']
		);
	}

	if ( isset( $inx_skin_page_elements['gallery'] ) ) {
		do_action(
			'inx_render_property_contents',
			get_the_ID(),
			basename( __DIR__ ) . '/' . $inx_skin_page_elements['gallery']['template'],
			$inx_skin_page_elements['gallery']
		);
	}
	?>

<div class="inx-single-property__tabbed-content uk-padding uk-margin-large-bottom">
	<ul class="inx-single-property__tab-nav uk-margin-bottom" uk-tab>
		<?php foreach ( $inx_skin_tabs as $inx_skin_tab_id => $inx_skin_tab ) : ?>
		<li><a href="javascript:void(0)"><?php echo $inx_skin_tab['title']; ?></a></li>
		<?php endforeach; ?>
	</ul>

	<ul id="inx-single-property__tab-contents" class="uk-switcher">
		<?php foreach ( $inx_skin_tabs as $inx_skin_tab_id => $inx_skin_tab ) : ?>
		<li class="uk-animation-fade uk-transform-origin-top-center">
			<?php
			foreach ( $inx_skin_tab['elements'] as $inx_skin_part_id ) :
				if ( ! isset( $inx_skin_page_elements[ $inx_skin_part_id ] ) ) {
					continue;
				}

				$inx_skin_element_atts                  = $inx_skin_page_elements[ $inx_skin_part_id ];
				$inx_skin_element_atts['heading_level'] = 3;
				if ( count( $inx_skin_tab['elements'] ) === 1 ) {
					$inx_skin_element_atts['headline'] = '';
				}

				do_action(
					'inx_render_property_contents',
					get_the_ID(),
					basename( __DIR__ ) . '/' . $inx_skin_element_atts['template'],
					$inx_skin_element_atts
				);
				endforeach;
			?>
		</li>
		<?php endforeach; ?>
	</ul>
</div>

	<?php
	if ( isset( $inx_skin_page_elements['floor_plans'] ) ) {
		do_action(
			'inx_render_property_contents',
			get_the_ID(),
			basename( __DIR__ ) . '/' . $inx_skin_page_elements['floor_plans']['template'],
			$inx_skin_page_elements['floor_plans']
		);
	}

	if ( isset( $inx_skin_page_elements['contact_person'] ) ) {
		do_action(
			'inx_render_property_contents',
			get_the_ID(),
			basename( __DIR__ ) . '/' . $inx_skin_page_elements['contact_person']['template'],
			$inx_skin_page_elements['contact_person']
		);
	}

	do_action(
		'inx_render_property_contents',
		get_the_ID(),
		basename( __DIR__ ) . '/' . $inx_skin_page_elements['footer']['template'],
		$inx_skin_page_elements['footer']
	);
else :
	foreach ( $inx_skin_page_elements as $inx_skin_element_atts ) {
		do_action(
			'inx_render_property_contents',
			get_the_ID(),
			basename( __DIR__ ) . '/' . $inx_skin_element_atts['template'],
			$inx_skin_element_atts
		);
	}
endif;
