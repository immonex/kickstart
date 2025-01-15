<?php
/**
 * Class User_Consent
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * User consent.
 */
class User_Consent {

	/**
	 * Various component configuration data
	 *
	 * @var mixed[]
	 */
	private $config;

	/**
	 * Helper/Utility objects
	 *
	 * @var object[]
	 */
	private $utils;

	/**
	 * Constructor
	 *
	 * @since 1.9.0
	 *
	 * @param mixed[]  $config Various component configuration data.
	 * @param object[] $utils Helper/Utility objects.
	 */
	public function __construct( $config, $utils ) {
		$this->config = $config;
		$this->utils  = $utils;
	} // __construct

	/**
	 * Register user consent related actions and filters.
	 *
	 * @since 1.9.0
	 */
	public function init() {
		add_filter( 'inx_user_consent_contents', array( $this, 'consent_contents' ) );
		add_filter( 'inx_get_user_consent_content', array( $this, 'get_consent_content' ), 10, 3 );
	} // init

	/**
	 * Return user consent texts (privacy note and button) of the specified type
	 * (filter callback).
	 *
	 * @since 1.9.0
	 *
	 * @param mixed[] $content     Current consent content or empty array.
	 * @param string  $type_or_url Consent type or URL.
	 * @param string  $context     Consent context (optional).
	 *
	 * @return string[] Privacy note and button text.
	 */
	public function get_consent_content( $content, $type_or_url, $context = '' ) {
		$consent_contents    = apply_filters( 'inx_user_consent_contents', array() );
		$default_button_text = apply_filters( 'inx_user_consent_default_button_text', __( 'Agreed!', 'immonex-kickstart' ) );

		if ( empty( $consent_contents ) ) {
			return $this->get_fallback_consent_texts( $type_or_url, $context );
		}

		if ( ! empty( $consent_contents[ $type_or_url ] ) ) {
			return $this->get_display_consent_data( $consent_contents[ $type_or_url ] );
		}

		/**
		 * Search for aliases.
		 */

		foreach ( $consent_contents as $key => $consent_rec ) {
			if ( ! empty( $consent_rec['aliases'] ) ) {
				if ( in_array( $type_or_url, $consent_rec['aliases'], true ) ) {
					return $this->get_display_consent_data( $consent_rec );
				}
			}
		}

		if ( false !== strpos( $type_or_url, '_' ) ) {
			/**
			 * Return main type record if existent.
			 */

			$type_split = explode( '_', $type_or_url );
			$main_type  = array_shift( $type_split );

			if ( ! empty( $consent_contents[ $main_type ] ) ) {
				return $this->get_display_consent_data( $consent_contents[ $main_type ] );
			}
		}

		/**
		 * URL-based search for consent records.
		 */

		foreach ( $consent_contents as $key => $consent_rec ) {
			if ( empty( $consent_rec['url_parts'] ) ) {
				continue;
			}
			if ( preg_match( '`' . addslashes( implode( '|', $consent_rec['url_parts'] ) ) . '`', $type_or_url ) ) {
				return $this->get_display_consent_data( $consent_rec );
			}
		}

		return $this->get_fallback_consent_texts( $type_or_url, $context );
	} // get_consent_content

	/**
	 * Return all consent contents (filter callback).
	 *
	 * @since 1.9.0
	 *
	 * @param mixed[] $contents Current consent contents or empty array.
	 *
	 * @return mixed[] Consent contents.
	 */
	public function consent_contents( $contents ) {
		$contents = array(
			'gmap'       => array(
				'text'        => wp_sprintf(
					/* translators: %1 = Google Privacy Policy, %2 = dataliberation.org */
					__(
						'This website utilizes Google Maps services. Google collects and processes certain, possibly personal data when using the maps services. Detailed informationen about scope and usage of this data as well as your personal privacy options is available in <a href="%1$s" target="_blank">Google\'s privacy policy</a>. Comprehensive instructions on how to manage your own data related to Google products can also be found here: <a href="%2$s" target="_blank">dataliberation.org</a>

By clicking on the following button, you permit submission of data collected during using the map function to Google in accordance with the privacy policy mentioned above.',
						'immonex-kickstart'
					),
					'https://policies.google.com/privacy',
					'https://www.dataliberation.org/'
				),
				'button_text' => __( 'Agreed, show maps!', 'immonex-kickstart' ),
				'icon_tag'    => '<span class="inx-icon inx-icon--ratio--3" uk-icon="location"></span>',
				'url_parts'   => array(
					'google.com/maps',
					'maps.googleapis',
					'maps.gstatic',
				),
			),
			'osm_otm'    => array(
				'aliases'     => array( 'ol_osm_map_otm' ),
				'text'        => wp_sprintf(
					/* translators: %1$s = OpenTopoMap Credits URL, %2$s = OSM Privacy Policy URL */
					__(
						'This website utilizes map services provided by the <a href="%1$s" target="_blank">OpenTopoMap project</a> and the OpenStreetMap Foundation, St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, United Kingdom (short OSMF). Your Internet browser or application will connect to servers operated by the OpenTopoMap contributors and/or OSMF located in the United Kingdom and in other countries.

The operator of this site has no control over such connections and processing of your data by <a href="%1$s" target="_blank">OpenTopoMap</a> or the OSMF. You can find more information on the processing of user data by the OSMF in the <a href="%2$s" target="_blank">OSMF privacy policy</a>.',
						'immonex-kickstart'
					),
					'https://opentopomap.org/credits',
					'https://wiki.osmfoundation.org/wiki/Privacy_Policy'
				),
				'button_text' => __( 'Agreed, show maps!', 'immonex-kickstart' ),
				'icon_tag'    => '<span class="inx-icon inx-icon--ratio--3" uk-icon="location"></span>',
				'url_parts'   => array( 'openstreetmap', 'opentopomap' ),
			),
			'osm'        => array(
				'aliases'     => array( 'osmaps', 'ol_osm_map_marker', 'ol_osm_map_german' ),
				'text'        => wp_sprintf(
					/* translators: %s = OSM Privacy Policy URL */
					__(
						'This website utilizes map services provided by the OpenStreetMap Foundation, St John’s Innovation Centre, Cowley Road, Cambridge, CB4 0WS, United Kingdom (short OSMF). Your Internet browser or application will connect to servers operated by the OSMF located in the United Kingdom and in other countries.

The operator of this site has no control over such connections and processing of your data by the OSMF. You can find more information on the processing of user data by the OSMF in the <a href="%s" target="_blank">OSMF privacy policy</a>.',
						'immonex-kickstart'
					),
					'https://wiki.osmfoundation.org/wiki/Privacy_Policy'
				),
				'button_text' => __( 'Agreed, show maps!', 'immonex-kickstart' ),
				'icon_tag'    => '<span class="inx-icon inx-icon--ratio--3" uk-icon="location"></span>',
				'url_parts'   => array( 'openstreetmap' ),
			),
			'youtube'    => array(
				'text'        => wp_sprintf(
					/* translators: %s = YouTube Data Protection Info URL */
					__(
						'This embedded video is provided by YouTube, LLC, 901 Cherry Ave, San Bruno, CA 94066, USA.

When playing the video, a connection to the Youtube servers is established. Youtube will be informed which pages you visit. If you are logged into your Youtube account, Youtube can assign your surfing behavior to you individually. You can prevent this by logging out of your YouTube account beforehand (see <a href="%s" target="_blank">YouTube\'s data protection information</a> for details).',
						'immonex-kickstart'
					),
					'https://www.youtube.com/howyoutubeworks/our-commitments/protecting-user-data/'
				),
				'button_text' => __( 'Agreed, show video!', 'immonex-kickstart' ),
				'icon_tag'    => '<span class="inx-icon inx-icon--ratio--3" uk-icon="youtube"></span>',
				'url_parts'   => array( 'youtube' ),
			),
			'vimeo'      => array(
				'text'        => wp_sprintf(
					/* translators: %s = Vimeo Privacy Policy URL */
					__(
						'This embedded video is provided by Vimeo, Inc., 555 West 18th Street, New York, New York 10011, USA.

When playing the video, a connection to the Vimeo servers is established. Vimeo will be informed which pages you visit. If you are logged into your Vimeo account, Vimeo can assign your surfing behavior to you individually. You can prevent this by logging out of your Vimeo account beforehand (see <a href="%s" target="_blank">Vimeo\'s Privacy Policy</a> for details).',
						'immonex-kickstart'
					),
					'https://vimeo.com/privacy'
				),
				'button_text' => __( 'Agreed, show video!', 'immonex-kickstart' ),
				'icon_tag'    => '<span class="inx-icon inx-icon--ratio--3" uk-icon="vimeo"></span>',
				'url_parts'   => array( 'vimeo' ),
			),
			'matterport' => array(
				'text'        => wp_sprintf(
					/* translators: %s = Matterport Privacy Policy URL */
					__(
						'This interactive 360° virtual tour is provided by Matterport, Inc. in 352 E. Java Dr., Sunnyvale, CA 94089, USA.

When confirmed, the viewer is loaded from a Matterport server. The operator of this site has no control over such connections and the the associated processing of user-related data. Please see <a href="%s" target="_blank">Matterport\'s Privacy Policy</a> for details.',
						'immonex-kickstart'
					),
					'https://matterport.com/de/node/44'
				),
				'button_text' => __( 'Agreed, show virtual tour!', 'immonex-kickstart' ),
				'icon_tag'    => '<span class="inx-icon inx-icon--360 inx-icon--ratio--2"></span>',
				'url_parts'   => array( 'matterport' ),
			),
			'giraffe360' => array(
				'text'        => wp_sprintf(
					/* translators: %s = Matterport Privacy Policy URL */
					__(
						'The Giraffe360 Service is provided by Giraffe360 Limited, a company registered in England with company number 11274984 and its registered office at 9th Floor 107 Cheapside, London, United Kingdom, EC2V 6DN.

When confirmed, the viewer is loaded from a Giraffe360 server. The operator of this site has no control over such connections and the the associated processing of user-related data. Please see <a href="%s" target="_blank">Giraffe360\'s Privacy Policy</a> for details.',
						'immonex-kickstart'
					),
					__( 'https://www.giraffe360.com/privacy-policy/', 'immonex-kickstart' )
				),
				'button_text' => __( 'Agreed, show virtual tour!', 'immonex-kickstart' ),
				'icon_tag'    => '<span class="inx-icon inx-icon--360 inx-icon--ratio--2"></span>',
				'url_parts'   => array( 'giraffe360' ),
			),
		);

		return $contents;
	} // consent_contents

	/**
	 * Return fallback content for the specified context or a generic text.
	 *
	 * @since 1.9.0
	 *
	 * @param string $type_or_url Consent type or URL.
	 * @param string $context     Consent context (optional).
	 *
	 * @return string Fallback/Generic consent text.
	 */
	private function get_fallback_consent_texts( $type_or_url, $context ) {
		$context_purposes     = array(
			'geo'          => __( 'for displaying maps and providing location based functions', 'immonex-kickstart' ),
			'video'        => __( 'for embedding video contents', 'immonex-kickstart' ),
			'virtual_tour' => __( 'for embedding interactive 3D images, 360° views and virtual tours', 'immonex-kickstart' ),
		);
		$icon_tags            = array(
			'geo'          => '<span class="inx-icon inx-icon--ratio--3" uk-icon="location"></span>',
			'video'        => '<span class="inx-icon inx-icon--ratio--3" uk-icon="play-circle"></span>',
			'virtual_tour' => '<span class="inx-icon inx-icon--360 inx-icon--ratio--2"></span>',
		);
		$purpose              = isset( $context_purposes[ $context ] ) ?
			$context_purposes[ $context ] :
			__( 'for providing specific functions to improve the usability', 'immonex-kickstart' );
		$privacy_policy_url   = get_privacy_policy_url();
		$default_button_text  = apply_filters( 'inx_user_consent_default_button_text', __( 'Agreed!', 'immonex-kickstart' ) );
		$service_name_or_link = $this->get_service_name_or_link( $type_or_url );

		$consent_text = wp_sprintf(
			'%1$s%2$s %3$s.' . PHP_EOL . PHP_EOL . '%4$s',
			__( 'This website utilizes an external service', 'immonex-kickstart' ),
			$service_name_or_link ? " ({$service_name_or_link})" : '',
			$purpose,
			__( 'When confirmed, the web browser will connect to servers operated by the service provider that <strong>may</strong> be located outside of the EU. The operator of this site has no control over such connections and the associated processing of user-related data.', 'immonex-kickstart' )
		);

		return array(
			'text'        => $consent_text,
			'button_text' => $default_button_text,
			'icon_tag'    => ! empty( $icon_tags[ $context ] ) ? $icon_tags[ $context ] : '',
		);
	} // get_fallback_consent_texts

	/**
	 * Return a link to the main host or name suitable for output purposes
	 * for the specified consent type or URL.
	 *
	 * @since 1.9.0
	 *
	 * @param string $type_or_url Consent type or URL.
	 *
	 * @return string Service link, host or name.
	 */
	private function get_service_name_or_link( $type_or_url ) {
		$url_parts = wp_parse_url( $type_or_url );

		if ( false === $url_parts ) {
			return ucfirst( $type_or_url );
		}

		if (
			! empty( $url_parts['scheme'] )
			&& ! empty( $url_parts['host'] )
		) {
			return wp_sprintf(
				'<a href="%1$s://%2$s/" target="_blank">%2$s</a>',
				$url_parts['scheme'],
				$url_parts['host']
			);
		}

		if ( ! empty( $url_parts['host'] ) ) {
			return $url_parts['host'];
		}

		if ( ! empty( $url_parts['path'] ) ) {
			return false !== strpos( $url_parts['path'], '.' ) ?
				$url_parts['path'] :
				ucfirst( $url_parts['path'] );
		}

		return ucfirst( $type_or_url );
	} // get_service_name

	/**
	 * Remove non-display-relevant data from the given consent record.
	 *
	 * @since 1.9.13-beta
	 *
	 * @param mixed[] $consent_rec Consent information record.
	 *
	 * @return mixed[] Consent data relevant for display.
	 */
	private function get_display_consent_data( $consent_rec ) {
		return array(
			'text'        => $consent_rec['text'],
			'button_text' => ! empty( $consent_rec['button_text'] ) ?
				$consent_rec['button_text'] :
				$default_button_text,
			'icon_tag'    => ! empty( $consent_rec['icon_tag'] ) ?
				$consent_rec['icon_tag'] :
				'',
		);
	} // get_display_consent_data

} // User_Consent
