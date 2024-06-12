<?php
/**
 * Class Document_Head
 *
 * @package immonex\Kickstart
 */

namespace immonex\Kickstart;

/**
 * HTML document head related functionality.
 */
class Document_Head {

	/**
	 * Array of bootstrap data
	 *
	 * @var mixed[]
	 */
	private $data;

	/**
	 * Flag to determine if buffering has started
	 *
	 * @var bool
	 */
	private $buffering_started = false;

	/**
	 * Constructor
	 *
	 * @since 1.9.18-beta
	 *
	 * @param mixed[] $bootstrap_data Bootstrap data.
	 */
	public function __construct( $bootstrap_data ) {
		$this->data = $bootstrap_data;

		add_action( 'wp_head', array( $this, 'start_head_buffering' ), 0 );
		add_action( 'wp_head', array( $this, 'stop_head_buffering' ), PHP_INT_MAX );
	} // __construct

	/**
	 * Start buffering the head data output.
	 *
	 * @since 1.9.18-beta
	 */
	public function start_head_buffering() {
		if ( ! apply_filters( 'inx_enable_doc_head_buffering', false ) ) {
			return;
		}

		$this->buffering_started = ob_start();
	} // start_head_buffering

	/**
	 * Stop buffering and actually output the (filtered) head data.
	 *
	 * @since 1.9.18-beta
	 */
	public function stop_head_buffering() {
		if ( ! $this->buffering_started ) {
			return '';
		}

		$this->buffering_started = false;

		echo apply_filters( 'inx_doc_head_contents', ob_get_clean() );
	} // stop_head_buffering

} // Document_Head
