<?php
/**
 * Block-backed shim for classic header templates
 *
 * @package immonex\Kickstart
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>
		<?php wp_body_open(); ?>

		<div class="wp-site-blocks">
			<header class="wp-block-template-part">
				<?php block_header_area(); ?>
			</header>

			<main id="main" class="site-content">
