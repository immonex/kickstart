export default function beToggleReference(event) {
	if (
		!document.getElementById('posts-filter') ||
		!inx_state.rest_nonce
	) {
		return
	}

	const propertyId = event.target.getAttribute('data-property-id');
	if (!propertyId) {
		return;
	}

	const apiUrl = inx_state.site_url + '/wp-json/immonex-kickstart/v1/properties/' + propertyId

	jQuery.ajax({
		type: 'PUT',
		url: apiUrl,
		headers: {
			'X-WP-Nonce': inx_state.rest_nonce
		},
		data: {
			reference: event.target.checked ? 1 : 0
		}
	}).done(function (data) {
		if ('SUCCESS' !== data.status) {
			console.log('immonex Kickstart: Error on saving property reference state!');
		}
	});
} // beToggleReference
