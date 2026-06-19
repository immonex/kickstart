<?php
/**
 * Class Turnstile
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Cloudflare Turnstile support.
 */
class Turnstile {

	const BASE_URI = 'https://challenges.cloudflare.com/turnstile/v0/';

	/**
	 * Verify the Turnstile token.
	 *
	 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
	 *
	 * @param string $token The Turnstile token to verify.
	 *
	 * @return bool True if the token is valid, false otherwise.
	 */
	public static function verify( $token ) {
		$core_options = apply_filters( 'inx_options', [], 'core' );
		$utils        = apply_filters( 'inxkick_get_utils', false );

		if ( empty( $core_options['turnstile_secret_key'] ) || ! $utils ) {
			return false;
		}

		$request_data = [
			'secret'   => $core_options['turnstile_secret_key'],
			'response' => $token,
			'remoteip' => ! empty( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : null,
		];

		$body = $utils['general']->post( self::BASE_URI . 'siteverify', array_filter( $request_data ) );

		if ( empty( $body ) || is_wp_error( $body ) ) {
			return false;
		}

		$result = json_decode( $body, true );
		if ( ! $result ) {
			return false;
		}

		return false !== $result['success'];
	} // verify

	/**
	 * Add a consent note for Turnstile to the given existing consent text.
	 *
	 * @param string $consent_text The existing consent text.
	 */
	public static function add_consent_note( &$consent_text ) {
		$core_options   = apply_filters( 'inx_options', [], 'core' );
		$turnstile_note = ! empty( $core_options['turnstile_consent_note'] ) ? $core_options['turnstile_consent_note'] : '';

		if ( ! $turnstile_note ) {
			$turnstile_note = wp_sprintf(
				/* translators: %s = Cloudflare Turnstile privacy policy URL */
				__( 'By confirming, <a href="%s" target="_blank">Cloudflare Turnstile</a> will be activated, which we use to protect our forms from spam and bots.', 'immonex-kickstart' ),
				__( 'https://www.cloudflare.com/privacypolicy/', 'immonex-kickstart' )
			);
		}

		$consent_text .= ( $consent_text ? PHP_EOL : '' ) . "<p>{$turnstile_note}</p>";
	} // add_consent_note

} // Turnstile
