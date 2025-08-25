<?php
/**
 * Template for property details header with core data
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_head_show = function ( $keys ) use ( $template_data ) {
	$contents = ! empty( $template_data['element_atts']['head']['contents'] ) ?
		$template_data['element_atts']['head']['contents'] : false;
	if ( ! $contents ) {
		// Show all contents.
		return true;
	}

	$keys = explode( ',', $keys );

	return ! empty( array_intersect( $keys, $contents ) );
}; // inx_skin_head_show

$inx_skin_rooms_icon = 'flaticon-blueprint';

if (
	$template_data['primary_rooms']['value'] &&
	isset( $template_data['primary_rooms']['meta']['mapping_source'] ) &&
	'flaechen->anzahl_schlafzimmer' === $template_data['primary_rooms']['meta']['mapping_source']
) {
	$inx_skin_rooms_icon = 'flaticon-hotel';
}

if ( $inx_skin_head_show( 'core_data' ) ) {
	$inx_skin_head_elements = array(
		'property_id'   => array(
			'title'   => __( 'Property ID', 'immonex-kickstart' ),
			'data'    => isset( $template_data['property_id'] ) ? $template_data['property_id'] : null,
			'icon'    => 'flaticon-numbers',
			'classes' => '',
		),
		'build_year'    => array(
			'title'   => '',
			'data'    => isset( $template_data['build_year'] ) ? $template_data['build_year'] : null,
			'icon'    => 'flaticon-date-day-with-architect-calendar-reminder-to-house-construction-project-development',
			'classes' => '',
		),
		'primary_area'  => array(
			'title'   => '',
			'data'    => isset( $template_data['primary_area'] ) ? $template_data['primary_area'] : null,
			'icon'    => 'flaticon-size',
			'classes' => '',
		),
		'plot_area'     => array(
			'title'   => '',
			'data'    => isset( $template_data['plot_area'] ) ? $template_data['plot_area'] : null,
			'icon'    => 'flaticon-blueprint-3',
			'classes' => '',
		),
		'primary_rooms' => array(
			'title'   => '',
			'data'    => isset( $template_data['primary_rooms'] ) ? $template_data['primary_rooms'] : null,
			'icon'    => $inx_skin_rooms_icon,
			'classes' => '',
		),
	);

	if (
		isset( $inx_skin_head_elements['primary_area'] ) &&
		isset( $inx_skin_head_elements['plot_area'] ) &&
		$inx_skin_head_elements['plot_area']['data']['value_formatted'] === $inx_skin_head_elements['primary_area']['data']['value_formatted']
	) {
		unset( $inx_skin_head_elements['plot_area'] );
	}
}
?>
<div class="inx-single-property__head uk-padding">
	<?php if ( $inx_skin_head_show( 'type,labels' ) ) : ?>
	<div class="uk-flex uk-flex-between@s uk-flex-middle uk-flex-wrap-reverse uk-flex-wrap@m">
		<?php if ( $inx_skin_head_show( 'type' ) ) : ?>
		<div class="inx-single-property__head-type uk-width-1-1 uk-width-auto@s uk-margin-right@m uk-margin-bottom">
			<?php
			if ( $template_data['type_of_use'] ) {
				echo $template_data['type_of_use'] . ' &gt; ';
			}

			echo $template_data['property_type'];
			?>
		</div>
		<?php endif; ?>

		<?php if ( $inx_skin_head_show( 'labels' ) ) : ?>
		<div class="uk-width-1-1 uk-width-auto@s uk-margin-bottom uk-margin-remove@m">
			<?php if ( count( $template_data['labels'] ) > 0 ) : ?>
			<div class="inx-single-property__labels uk-position-top-right">
				<?php
				foreach ( $template_data['labels'] as $inx_skin_label ) :
					if ( ! $inx_skin_label['show'] ) {
						continue;
					}
					?>
				<span class="<?php echo implode( ' ', $inx_skin_label['css_classes'] ); ?> uk-label"><?php echo esc_html( $inx_skin_label['name'] ); ?></span>
					<?php
					endforeach;
				?>
			</div>
			<?php endif; ?>
		</div>
		<?php endif; ?>
	</div>
	<?php endif; ?>

	<?php echo $inx_skin_head_show( 'title' ) ? $utils['format']->get_heading( $template_data['title'], 1, 'inx-single-property__head-title uk-margin-bottom' ) : ''; ?>

	<?php if ( $inx_skin_head_show( 'location,price' ) ) : ?>
	<div class="inx-single-property__head-elements uk-flex uk-flex-between@s uk-flex-middle uk-flex-wrap-reverse uk-flex-wrap@m">
		<?php if ( $inx_skin_head_show( 'location' ) ) : ?>
		<div class="inx-single-property__head-location uk-width-1-1 uk-width-expand@m uk-flex uk-flex-middle uk-flex-stretch"><!-- Address -->
			<div class="inx-core-detail-icon uk-width-auto"><i class="flaticon-placeholder" title="<?php echo __( 'Location', 'immonex-kickstart' ); ?>"></i></div>
			<?php if ( $template_data['full_address'] ) : ?>
			<div class="uk-width-expand"><?php echo $template_data['full_address']; ?></div>
			<?php endif; ?>
		</div><!-- /Address -->
		<?php endif; ?>

		<?php if ( $inx_skin_head_show( 'price' ) ) : ?>
		<div class="uk-width-1-1 uk-width-auto@m uk-margin-small-bottom"><!-- Primary Price -->
			<div class="inx-single-property__head-primary-price uk-text-right">
				<?php echo $template_data['primary_price']['value_formatted']; ?>
				<?php
				if ( $template_data['price_time_unit']['value'] ) {
					echo $template_data['price_time_unit']['value'];}
				?>
			</div>
		</div><!-- /Primary Price -->
		<?php endif; ?>
	</div>
	<?php endif; ?>

	<?php if ( $inx_skin_head_show( 'core_data' ) ) : ?>
	<hr>

	<div class="inx-single-property__head-elements uk-child-width-auto" uk-grid>
		<?php
		foreach ( $inx_skin_head_elements as $inx_skin_element ) :
			if ( ! isset( $inx_skin_element['data']['value'] ) || ! $inx_skin_element['data']['value'] ) {
				continue;
			}
			?>
		<div class="<?php echo isset( $inx_skin_element['classes'] ) ? $inx_skin_element['classes'] . ' ' : ''; ?> uk-flex uk-flex-middle">
			<?php
			if ( is_array( $inx_skin_element['data'] ) ) {
				// Use value related title instead of element title (possibly)
				// stated above.
				$inx_skin_title = isset( $inx_skin_element['data']['title'] ) ? $inx_skin_element['data']['title'] : $inx_skin_element['title'];

				// Use the pre-formatted value if existent.
				$inx_skin_value = isset( $inx_skin_element['data']['value_formatted'] ) ? $inx_skin_element['data']['value_formatted'] : $inx_skin_element['data']['value'];
			} else {
				// Data/Value given as string.
				$inx_skin_title = $inx_skin_element['title'];
				$inx_skin_value = $inx_skin_element['data'];
			}

			if ( $inx_skin_value ) :
				if ( isset( $inx_skin_element['icon'] ) ) :
					?>
			<div class="inx-core-detail-icon"><i class="<?php echo $inx_skin_element['icon']; ?>" title="<?php echo $inx_skin_title; ?>"></i></div>
					<?php
				endif;
				?>
			<div class="inx-single-property__head-element-title"><?php echo $inx_skin_value; ?></div>
					<?php
			endif;
			?>
		</div>
			<?php
			endforeach;
		?>
	</div>
	<?php endif; ?>
</div>
