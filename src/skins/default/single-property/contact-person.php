<?php
/**
 * Template for property contact person (agent)
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$inx_skin_name    = $utils['data']->get_details_item( $template_data['details'], 'kontaktperson.ansprechpartner', false, true );
$inx_skin_bio     = $utils['data']->get_details_item( $template_data['details'], 'kontaktperson.freitextfeld', false, true );
$inx_skin_company = $utils['data']->get_details_item( $template_data['details'], 'kontaktperson.firma', false, true );
$inx_skin_address = $utils['data']->get_details_item( $template_data['details'], 'kontaktperson.adresse', false, true );

$inx_skin_contact_person = '';
if ( $inx_skin_name || $inx_skin_bio ) {
	if ( $inx_skin_name ) {
		$inx_skin_contact_person .= "<strong>$inx_skin_name</strong>" . PHP_EOL;
	}
	if ( $inx_skin_bio ) {
		$inx_skin_contact_person .= '<br><br>' . PHP_EOL . $utils['format']->prepare_continuous_text( $inx_skin_bio ) . PHP_EOL;
	}
}

$inx_skin_company_address = '';
if ( $inx_skin_company || $inx_skin_address ) {
	if ( $inx_skin_company ) {
		$inx_skin_company_address .= "$inx_skin_company<br>\n";
	}
	if ( $inx_skin_address ) {
		$inx_skin_company_address .= $inx_skin_address;
	}
}

$inx_skin_groups        = array( 'kontakt' );
$inx_skin_details       = $utils['data']->get_group_items( $template_data['details'], $inx_skin_groups );
$inx_skin_details_split = array(
	'direct'      => array(),
	'head_office' => array(),
);

if ( count( $inx_skin_details ) > 0 ) {
	$inx_skin_email_direct          = '';
	$inx_skin_email_head_office     = '';
	$inx_skin_email_head_office_key = false;
	$inx_skin_emails_match          = false;
	$inx_skin_phone_direct          = '';
	$inx_skin_phone_head_office     = '';
	$inx_skin_phone_head_office_key = false;
	$inx_skin_phone_numbers_match   = false;

	// Check if personal and head office email addresses/phone nmbers match.
	foreach ( $inx_skin_details as $inx_skin_key => $inx_skin_element ) {
		if ( 'kontaktperson.email_direkt' === $inx_skin_element['name'] ) {
			$inx_skin_email_direct = $inx_skin_element['value'];
		} elseif ( 'kontaktperson.email_zentrale' === $inx_skin_element['name'] ) {
			$inx_skin_email_head_office     = $inx_skin_element['value'];
			$inx_skin_email_head_office_key = $inx_skin_key;
		} elseif ( 'kontaktperson.tel_durchw' === $inx_skin_element['name'] ) {
			$inx_skin_phone_direct = $inx_skin_element['value'];
		} elseif ( 'kontaktperson.tel_zentrale' === $inx_skin_element['name'] ) {
			$inx_skin_phone_head_office     = $inx_skin_element['value'];
			$inx_skin_phone_head_office_key = $inx_skin_key;
		}

		if ( $inx_skin_email_direct && ! $inx_skin_emails_match && $inx_skin_email_direct === $inx_skin_email_head_office ) {
			$inx_skin_emails_match = true;
		}

		if ( $inx_skin_phone_direct && ! $inx_skin_phone_numbers_match && $inx_skin_phone_direct === $inx_skin_phone_head_office ) {
			$inx_skin_phone_numbers_match = true;
		}
	}

	// Display one email/phone element only if personal and
	// head office addresses are identical.
	if ( $inx_skin_emails_match ) {
		unset( $inx_skin_details[ $inx_skin_email_head_office_key ] );
	}

	if ( $inx_skin_phone_numbers_match ) {
		unset( $inx_skin_details[ $inx_skin_phone_head_office_key ] );
	}

	foreach ( $inx_skin_details as $inx_skin_key => $inx_skin_element ) {
		if ( false !== strpos( $inx_skin_element['name'], '_zentrale' ) ) {
			$inx_skin_details_split['head_office'][ $inx_skin_key ] = $inx_skin_element;
		} else {
			$inx_skin_details_split['direct'][ $inx_skin_key ] = $inx_skin_element;
		}
	}
}

$inx_skin_headline      = isset( $template_data['headline'] ) ? $template_data['headline'] : __( 'Your contact person with us', 'immonex-kickstart' );
$inx_skin_heading_level = isset( $template_data['heading_level'] ) ? $template_data['heading_level'] : 2;

if ( $inx_skin_contact_person || count( $inx_skin_details ) > 0 ) :
	?>
<div class="inx-single-property__section inx-single-property__section--type--contact-person">
	<?php echo $utils['format']->get_heading( $inx_skin_headline, $inx_skin_heading_level, 'inx-single-property__section-title uk-heading-divider' ); ?>

	<?php if ( $inx_skin_contact_person ) : ?>
	<div class="inx-single-property__contact-person-name-bio uk-margin-bottom">
		<?php echo $inx_skin_contact_person; ?>
	</div>
	<?php endif; ?>

	<?php if ( count( $inx_skin_details_split['direct'] ) > 0 ) : ?>
	<ul class="inx-detail-list uk-grid-small" uk-grid>
		<?php foreach ( $inx_skin_details_split['direct'] as $inx_skin_detail ) : ?>
		<li class="inx-detail-list__item uk-width-1-1">
			<span class="inx-detail-list__title"><?php echo $inx_skin_detail['title']; ?>:</span>
			<span class="inx-detail-list__value"><?php echo $utils['string']->convert_urls( $inx_skin_detail['value'] ); ?></span>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>

	<?php if ( $inx_skin_company_address ) : ?>
	<div class="inx-single-property__contact-person-company-address uk-margin-top">
		<?php echo $inx_skin_company_address; ?>
	</div>
	<?php endif; ?>

	<?php if ( count( $inx_skin_details_split['head_office'] ) > 0 ) : ?>
	<ul class="inx-detail-list uk-grid-small<?php echo $inx_skin_company_address ? ' uk-margin-small-top' : ''; ?>" uk-grid>
		<?php foreach ( $inx_skin_details_split['head_office'] as $inx_skin_detail ) : ?>
		<li class="inx-detail-list__item uk-width-1-1">
			<span class="inx-detail-list__title"><?php echo $inx_skin_detail['title']; ?>:</span>
			<span class="inx-detail-list__value"><?php echo $utils['string']->convert_urls( $inx_skin_detail['value'] ); ?></span>
		</li>
		<?php endforeach; ?>
	</ul>
	<?php endif; ?>
</div>
	<?php
endif;
