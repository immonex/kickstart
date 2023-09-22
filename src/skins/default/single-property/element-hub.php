<?php
/**
 * Template for combining/arranging multiple property details sections
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $immonex_kickstart;

$inx_skin_available_elements       = $template_data['detail_page_elements'];
$inx_skin_remove_optional_elements = true;

// Shall specific elements be INCLUDED (priority) or EXCLUDED?
$inx_skin_include_elements = isset( $template_data['elements'] ) && $template_data['elements'];
$inx_skin_exclude_elements = ! $inx_skin_include_elements && isset( $template_data['exclude'] ) && $template_data['exclude'];

if ( $inx_skin_include_elements || $inx_skin_exclude_elements ) {
	// Render one ore more specified detail page elements.
	if ( $inx_skin_include_elements ) {
		$inx_skin_element_keys = is_array( $template_data['elements'] ) ?
			$template_data['elements'] :
			array_map( 'trim', explode( ',', $template_data['elements'] ) );

		$inx_skin_remove_optional_elements = false;
	} else {
		$inx_skin_element_keys         = array_keys( $inx_skin_available_elements );
		$inx_skin_exclude_element_keys = is_array( $template_data['exclude'] ) ?
			$template_data['exclude'] :
			array_map( 'trim', explode( ',', $template_data['exclude'] ) );

		if ( count( $inx_skin_exclude_element_keys ) > 0 ) {
			foreach ( $inx_skin_exclude_element_keys as $inx_skin_exclude_key ) {
				$inx_skin_array_key = array_search( $inx_skin_exclude_key, $inx_skin_element_keys, true );
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
				in_array( $inx_skin_key, array_keys( $inx_skin_available_elements ), true ) &&
				(
					! empty( $inx_skin_available_elements[ $inx_skin_key ]['template'] ) ||
					! empty( $inx_skin_available_elements[ $inx_skin_key ]['do_action'] )
				)
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

if ( $inx_skin_remove_optional_elements ) {
	// Filter out optional elements.
	$inx_skin_page_elements = array_filter(
		$inx_skin_page_elements,
		function ( $inx_skin_element ) {
			return empty( $inx_skin_element['optional'] );
		}
	);
}

if ( $inx_skin_enable_tabs ) :
	$inx_skin_tabbed_content_elements = $template_data['tabbed_content_elements'];

	if ( ! empty( $inx_skin_tabbed_content_elements['before_tabs'] ) ) :
		foreach ( $inx_skin_tabbed_content_elements['before_tabs'] as $inx_skin_element_key ) {
			if ( isset( $inx_skin_page_elements[ $inx_skin_element_key ] ) ) {
				do_action( "inx_before_render_detail_element_{$inx_skin_element_key}", 'before_tabs' );

				if ( ! empty( $inx_skin_page_elements[ $inx_skin_element_key ]['do_action'] ) ) {
					call_user_func_array( 'do_action', $inx_skin_page_elements[ $inx_skin_element_key ]['do_action'] );
				} else {
					do_action(
						'inx_render_property_contents',
						false,
						basename( __DIR__ ) . '/' . $inx_skin_page_elements[ $inx_skin_element_key ]['template'],
						$inx_skin_page_elements[ $inx_skin_element_key ]
					);
				}

				do_action( "inx_after_render_detail_element_{$inx_skin_element_key}", 'before_tabs' );
			}
		}
	endif;
	?>

<div class="inx-single-property__tabbed-content uk-padding uk-margin-large-bottom">
	<ul class="inx-single-property__tab-nav uk-margin-bottom uk-tab inx-cq" uk-tab>
		<?php foreach ( $inx_skin_tabbed_content_elements['tabs'] as $inx_skin_tab_id => $inx_skin_tab ) : ?>
		<li><a href="javascript:void(0)"><?php echo $inx_skin_tab['title']; ?></a></li>
		<?php endforeach; ?>
	</ul>

	<ul id="inx-single-property__tab-contents" class="uk-switcher">
		<?php foreach ( $inx_skin_tabbed_content_elements['tabs'] as $inx_skin_tab_id => $inx_skin_tab ) : ?>
		<li class="uk-animation-fade uk-transform-origin-top-center">
			<?php
			foreach ( $inx_skin_tab['elements'] as $inx_skin_part_id ) :
				if ( ! isset( $inx_skin_page_elements[ $inx_skin_part_id ] ) ) {
					continue;
				}

				$inx_skin_element_atts                  = $inx_skin_page_elements[ $inx_skin_part_id ];
				$inx_skin_element_atts['heading_level'] = 3;
				if (
					! empty( $inx_skin_element_atts['no_headline_in_tabs'] ) ||
					count( $inx_skin_tab['elements'] ) === 1 || (
						! empty( $inx_skin_element_atts['headline'] ) &&
						$inx_skin_element_atts['headline'] === $inx_skin_tab['title']
					)
				) {
					$inx_skin_element_atts['headline'] = '';
				}

				do_action( "inx_before_render_detail_element_{$inx_skin_part_id}", 'tab_content' );

				do_action(
					'inx_render_property_contents',
					false,
					basename( __DIR__ ) . '/' . $inx_skin_element_atts['template'],
					$inx_skin_element_atts
				);

				do_action( "inx_after_render_detail_element_{$inx_skin_part_id}", 'tab_content' );
			endforeach;
			?>
		</li>
		<?php endforeach; ?>
	</ul>
</div>

	<?php
	if ( ! empty( $inx_skin_tabbed_content_elements['after_tabs'] ) ) :
		foreach ( $inx_skin_tabbed_content_elements['after_tabs'] as $inx_skin_element_key ) {
			if ( isset( $inx_skin_page_elements[ $inx_skin_element_key ] ) ) {
				do_action( "inx_before_render_detail_element_{$inx_skin_element_key}", 'after_tabs' );

				if ( ! empty( $inx_skin_page_elements[ $inx_skin_element_key ]['do_action'] ) ) {
					call_user_func_array( 'do_action', $inx_skin_page_elements[ $inx_skin_element_key ]['do_action'] );
				} else {
					do_action(
						'inx_render_property_contents',
						false,
						basename( __DIR__ ) . '/' . $inx_skin_page_elements[ $inx_skin_element_key ]['template'],
						$inx_skin_page_elements[ $inx_skin_element_key ]
					);
				}

				do_action( "inx_after_render_detail_element_{$inx_skin_element_key}", 'after_tabs' );
			}
		}
	endif;
else :
	foreach ( $inx_skin_page_elements as $inx_skin_element_key => $inx_skin_element_atts ) {
		do_action( "inx_before_render_detail_element_{$inx_skin_element_key}", 'no_tabs' );

		if ( ! empty( $inx_skin_element_atts['do_action'] ) ) {
			call_user_func_array( 'do_action', $inx_skin_element_atts['do_action'] );
		} else {
			do_action(
				'inx_render_property_contents',
				false,
				basename( __DIR__ ) . '/' . $inx_skin_element_atts['template'],
				$inx_skin_element_atts
			);
		}

		do_action( "inx_after_render_detail_element_{$inx_skin_element_key}", 'no_tabs' );
	}
endif;
