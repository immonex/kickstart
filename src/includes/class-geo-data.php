<?php
/**
 * Class Geo_Data
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * Geo/Location related data.
 */
class Geo_Data {

	const COUNTRIES = array(
		'de' => array(
			'iso3'    => 'deu',
			'name_en' => 'Germany',
			'name_de' => 'Deutschland',
		),
		'at' => array(
			'iso3'    => 'aut',
			'name_en' => 'Austria',
			'name_de' => 'Österreich',
		),
		'ch' => array(
			'iso3'    => 'che',
			'name_en' => 'Switzerland',
			'name_de' => 'Schweiz',
		),
		'lu' => array(
			'iso3'    => 'lux',
			'name_en' => 'Luxembourg',
			'name_de' => 'Luxemburg',
		),
		'be' => array(
			'iso3'    => 'bel',
			'name_en' => 'Belgium',
			'name_de' => 'Belgien',
		),
		'fr' => array(
			'iso3'    => 'fra',
			'name_en' => 'France',
			'name_de' => 'Frankreich',
		),
		'nl' => array(
			'iso3'    => 'nld',
			'name_en' => 'Netherlands',
			'name_de' => 'Niederlande',
		),
		'dk' => array(
			'iso3'    => 'dnk',
			'name_en' => 'Denmark',
			'name_de' => 'Dänemark',
		),
		'pl' => array(
			'iso3'    => 'pol',
			'name_en' => 'Poland',
			'name_de' => 'Polen',
		),
		'es' => array(
			'iso3'    => 'esp',
			'name_en' => 'Spain',
			'name_de' => 'Spanien',
		),
		'it' => array(
			'iso3'    => 'ita',
			'name_en' => 'Italy',
			'name_de' => 'Italien',
		),
		'gr' => array(
			'iso3'    => 'grc',
			'name_en' => 'Greece',
			'name_de' => 'Griechenland',
		),
		'ee' => array(
			'iso3'    => 'est',
			'name_en' => 'Estonia',
			'name_de' => 'Estland',
		),
		'lv' => array(
			'iso3'    => 'lva',
			'name_en' => 'Latvia',
			'name_de' => 'Lettland',
		),
		'lt' => array(
			'iso3'    => 'ltu',
			'name_en' => 'Lithuania',
			'name_de' => 'Litauen',
		),
		'pt' => array(
			'iso3'    => 'prt',
			'name_en' => 'Portugal',
			'name_de' => 'Portugal',
		),
		'sk' => array(
			'iso3'    => 'svk',
			'name_en' => 'Slovakia',
			'name_de' => 'Slowakei',
		),
		'cz' => array(
			'iso3'    => 'cze',
			'name_en' => 'Czech Republic',
			'name_de' => 'Tschechische Republik',
		),
		'hr' => array(
			'iso3'    => 'hrv',
			'name_en' => 'Croatia',
			'name_de' => 'Kroatien',
		),
		'ro' => array(
			'iso3'    => 'rou',
			'name_en' => 'Romania',
			'name_de' => 'Rumänien',
		),
		'si' => array(
			'iso3'    => 'svn',
			'name_en' => 'Slovenia',
			'name_de' => 'Slowenien',
		),
		'hu' => array(
			'iso3'    => 'hun',
			'name_en' => 'Hungary',
			'name_de' => 'Ungarn',
		),
		'fi' => array(
			'iso3'    => 'fin',
			'name_en' => 'Finland',
			'name_de' => 'Finnland',
		),
		'ie' => array(
			'iso3'    => 'irl',
			'name_en' => 'Ireland',
			'name_de' => 'Irland',
		),
		'mt' => array(
			'iso3'    => 'mlt',
			'name_en' => 'Malta',
			'name_de' => 'Malta',
		),
		'se' => array(
			'iso3'    => 'swe',
			'name_en' => 'Sweden',
			'name_de' => 'Schweden',
		),
		'cy' => array(
			'iso3'    => 'cyp',
			'name_en' => 'Cyprus',
			'name_de' => 'Zypern',
		),
		'al' => array(
			'iso3'    => 'alb',
			'name_en' => 'Albania',
			'name_de' => 'Albanien',
		),
		'li' => array(
			'iso3'    => 'lie',
			'name_en' => 'Liechtenstein',
			'name_de' => 'Liechtenstein',
		),
		'ru' => array(
			'iso3'    => 'rus',
			'name_en' => 'Russia',
			'name_de' => 'Russland',
		),
		'ad' => array(
			'iso3'    => 'and',
			'name_en' => 'Andorra',
			'name_de' => 'Andorra',
		),
		'is' => array(
			'iso3'    => 'isl',
			'name_en' => 'Iceland',
			'name_de' => 'Island',
		),
		'mk' => array(
			'iso3'    => 'mkd',
			'name_en' => 'North Macedonia',
			'name_de' => 'Nordmazedonien',
		),
		'sm' => array(
			'iso3'    => 'smr',
			'name_en' => 'San Marino',
			'name_de' => 'San Marino',
		),
		'no' => array(
			'iso3'    => 'nor',
			'name_en' => 'Norway',
			'name_de' => 'Norwegen',
		),
		'tr' => array(
			'iso3'    => 'tur',
			'name_en' => 'Turkey',
			'name_de' => 'Türkei',
		),
		'by' => array(
			'iso3'    => 'blr',
			'name_en' => 'Belarus',
			'name_de' => 'Belarus',
		),
		'ua' => array(
			'iso3'    => 'ukr',
			'name_en' => 'Ukraine',
			'name_de' => 'Ukraine',
		),
		'md' => array(
			'iso3'    => 'mda',
			'name_en' => 'Moldova',
			'name_de' => 'Moldau',
		),
		'rs' => array(
			'iso3'    => 'srb',
			'name_en' => 'Serbia',
			'name_de' => 'Serbien',
		),
		'ba' => array(
			'iso3'    => 'bih',
			'name_en' => 'Bosnia and Herzegovina',
			'name_de' => 'Bosnien und Herzegowina',
		),
		'ge' => array(
			'iso3'    => 'geo',
			'name_en' => 'Georgia',
			'name_de' => 'Georgien',
		),
		'mc' => array(
			'iso3'    => 'mco',
			'name_en' => 'Monaco',
			'name_de' => 'Monaco',
		),
		'bg' => array(
			'iso3'    => 'bgr',
			'name_en' => 'Bulgaria',
			'name_de' => 'Bulgarien',
		),
		'me' => array(
			'iso3'    => 'mne',
			'name_en' => 'Montenegro',
			'name_de' => 'Montenegro',
		),
		'gb' => array(
			'iso3'    => 'gbr',
			'name_en' => 'United Kingdom',
			'name_de' => 'Vereinigtes Königreich',
		),
		'us' => array(
			'iso3'    => 'usa',
			'name_en' => 'United States of America',
			'name_de' => 'Vereinigte Staaten von Amerika',
		),
		'ca' => array(
			'iso3'    => 'can',
			'name_en' => 'Canada',
			'name_de' => 'Kanada',
		),
	);

	/**
	 * Return country data based on the given country code (ISO).
	 *
	 * @since 1.6.0
	 *
	 * @param string $country_code Country code (ISO 3166 ALPHA-2/3).
	 *
	 * @return mixed[]|bool Country data or false if not found.
	 */
	public static function get_country_data( $country_code ) {
		$country_code = strtolower( $country_code );

		if ( isset( self::COUNTRIES[ $country_code ] ) ) {
			return self::COUNTRIES[ $country_code ];
		}

		$index = array_search( $country_code, array_column( self::COUNTRIES, 'iso3' ), true );
		if ( false !== $index ) {
			return self::COUNTRIES[ array_keys( self::COUNTRIES )[ $index ] ];
		}

		return false;
	} // get_country_data

} // Geo_Data
