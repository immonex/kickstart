<?php
/**
 * Template for downloads and link lists
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_item_count    = count( $template_data['file_attachments'] ) + count( $template_data['links'] );
$inx_skin_heading_level = isset( $template_data['heading_level'] ) ? $template_data['heading_level'] : 2;

if ( $inx_skin_item_count > 0 ) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--downloads-and-links">
	<?php
	if ( isset( $template_data['headline'] ) ) {
		echo $utils['format']->get_heading(
			$template_data['headline'],
			$inx_skin_heading_level,
			'inx-single-property__section-title uk-heading-divider'
		);
	}
	?>

	<ul class="inx-file-link-list uk-grid-small" uk-grid>
		<?php
		if ( count( $template_data['file_attachments'] ) ) :
			$inx_skin_attachment_types = array(
				'pdf',
				'txt',
				'rtf',
				'msword',
				'vnd.oasis.opendocument.text',
			);

			foreach ( $template_data['file_attachments'] as $inx_skin_attachment ) :
				if ( in_array( $inx_skin_attachment['subtype'], $inx_skin_attachment_types, true ) ) {
					// Attachment is a document.
					$inx_skin_icon = 'copy';
				} elseif ( 'image' === $inx_skin_attachment['type'] ) {
					$inx_skin_icon = 'image';
				} else {
					// Default download icon.
					$inx_skin_icon = 'download';
				}
				?>
		<li class="inx-file-link-list__item uk-width-1-2@m uk-flex">
			<div class="inx-file-link-list__icon uk-width-auto"><span class="uk-margin-small-right" uk-icon="<?php echo $inx_skin_icon; ?>"></span></div>
			<div class="inx-file-link-list__name uk-width-expand">
				<a href="<?php echo $inx_skin_attachment['url']; ?>" target="_blank"><?php echo $utils['format']->prepare_single_value( $inx_skin_attachment['title'] ); ?></a>
			</div>
		</li>
				<?php
			endforeach;
		endif;

		if ( count( $template_data['links'] ) ) :
			foreach ( $template_data['links'] as $inx_skin_link ) :
				$inx_skin_title = $inx_skin_link['title'];
				if ( ! $inx_skin_title ) {
					$inx_skin_title = $utils['string']->get_excerpt( trim( $inx_skin_link['url'] ), 32 );
				}
				?>
		<li class="inx-file-link-list__item uk-width-1-2@m uk-flex">
			<div class="inx-file-link-list__icon uk-width-auto"><span class="uk-margin-small-right" uk-icon="link"></span></div>
			<div class="inx-file-link-list__name uk-width-expand">
				<a href="<?php echo $inx_skin_link['url']; ?>" target="_blank"><?php echo $utils['format']->prepare_single_value( $inx_skin_title ); ?></a>
			</div>
		</li>
				<?php
			endforeach;
		endif;
		?>
	</ul>
</div>
	<?php
endif;
