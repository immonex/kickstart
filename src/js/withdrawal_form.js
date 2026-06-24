const $ = jQuery

function init() {
	$('.inx-withdrawal-form input[name=consent]').attr('disabled', true)

	setTimeout(() => {
		$('.inx-withdrawal-form').on('submit', function (e) {
			e.preventDefault()

			const form = $(this)
			const resultEl = form.find('.inx-withdrawal-form__result').first()
			const submitEl = resultEl.parentsUntil('.inx-withdrawal-form').parent().find('.inx-withdrawal-form__submit')

			if (inx_state.withdrawal.enable_ts && inx_state.withdrawal.ts_sitekey) {
				const tsEl = form.find('.inx-team-contact-form__turnstile')
				const tsWidgetID = tsEl.length > 0 ? tsEl.attr('widget-id') : false

				if (tsWidgetID === false) {
					initTurnstile(form, submitEl, resultEl)
				} else {
					turnstile.reset(tsWidgetID)
				}
			} else {
				submitFormData(form, submitEl, resultEl)
			}
		})
	}, 2500)
} // init

function submitFormData(form, submitEl, resultEl) {
	const autofilled = []
	form.find('input[data-com-onepassword-filled],input:autofill').each((index, element) => {
		autofilled.push(element.name)
	})

	const formData = new FormData(form[0])
	formData.append('autofilled', JSON.stringify(autofilled))
	const serializedFormData = new URLSearchParams(formData).toString()

	form.find('.inx-withdrawal-form__input--has-error').removeClass('inx-withdrawal-form__input--has-error')

	const spinner = form.children('.inx-withdrawal-form__spinner').first()
	spinner.show()

	$.post(
		form.attr('action'),
		serializedFormData,
		function (response) {
			var data = 'string' === typeof response ? JSON.parse(response.match(/{.*}/)) : response

			form[0].reset()
			form.find('textarea').val('')
			submitEl.attr('disabled', true)

			form.find('.inx-withdrawal-form__input:not(.inx-withdrawal-form__result-wrap)').hide()

			if ( 'undefined' !== typeof response.redirect_url && response.redirect_url ) {
				window.location.href = response.redirect_url
				return
			}

			resultEl.html('<span uk-icon="icon: check; ratio: 2"></span> <span>' + data.message + '</span>')
			resultEl[0].className = 'inx-withdrawal-form__result inx-withdrawal-form__result--type--success uk-margin'
		},
		'json'
	).fail(function (xhr) {
		const data = xhr.responseJSON

		if (typeof data !== 'undefined' && typeof data.field_errors !== 'undefined' && data.field_errors) {
			$.each(data.field_errors, function (fieldName, message) {
				const inputEl = form.find('.inx-withdrawal-form__input--name--' + fieldName).first()
				inputEl.children('.inx-withdrawal-form__input-error').first().html(message)
				inputEl.addClass('inx-withdrawal-form__input--has-error')
			})
		} else {
			console.error('Form Submission Error:');
			console.error(xhr);
		}

		if (typeof data !== 'undefined' && typeof data.spam_check !== 'undefined' && data.spam_check) {
			resultEl.html('<span uk-icon="icon: warning; ratio: 2"></span> <span>' + data.message + '</span>')
			resultEl[0].className = 'inx-withdrawal-form__result inx-withdrawal-form__result--type--warning uk-margin'
		} else {
			resultEl.html('<span uk-icon="icon: warning; ratio: 2"></span> <span>' + data.message + '</span>')
			resultEl[0].className = 'inx-withdrawal-form__result inx-withdrawal-form__result--type--error uk-margin'
		}
	}).always(function (xhr) {
		spinner.hide()
	})
} // submitFormData

function handleTurnstileError(errorCode, resultEl) {
	const errorFamily = Math.floor(errorCode / 1000);

	switch(errorFamily) {
		case 100:
			showError(inx_state.withdrawal.ts_error_msg_refresh, resultEl);
			break;
		case 110:
			showError(inx_state.withdrawal.ts_error_msg_config, resultEl);
			break;
		case 300:
		case 600:
			showError(inx_state.withdrawal.ts_error_msg_security, resultEl);
			break;
		default:
			showError(inx_state.withdrawal.ts_error_msg_unexpected, resultEl);
	}
} // handleTurnstileError

function showError(message, resultEl) {
	resultEl.html('<span uk-icon="icon: warning; ratio: 2"></span> <span>' + message + '</span>')
	resultEl[0].className = 'inx-withdrawal-form__result inx-withdrawal-form__result--type--error uk-margin'
} // showError

function hideTurnstileError(resultEl) {
	resultEl.html('')
	resultEl[0].className = 'inx-withdrawal-form__result'
} // hideTurnstileError

function initTurnstile(form, submitEl, resultEl) {
	window.inxkickRenderTurnstile = function() {
		submitEl.attr('disabled', true)

		const tsEl = form.find('.inx-withdrawal-form__turnstile')[0]

		const tsWidgetID = turnstile.render(tsEl, {
			sitekey: inx_state.withdrawal.ts_sitekey,
			appearance: 'always',
			retry: 'never',
			callback: function (token) {
				submitEl.attr('disabled', false)
				resultEl[0].className = 'inx-withdrawal-form__result uk-margin'
				submitFormData(form, submitEl, resultEl)
			},
			'error-callback': function(errorCode) {
				console.error('Turnstile error:', errorCode)
				handleTurnstileError(errorCode, resultEl)
				return true
			}
		})

		tsEl.setAttribute('widget-id', tsWidgetID)
	}

	// const form = submitEl.parentsUntil('.inx-withdrawal-form').parent()
	const consentEl = form.find('.inx-withdrawal-form__consent-text')

	let div = document.createElement('div')
	div.setAttribute('class', 'inx-withdrawal-form__turnstile')
	consentEl.append(div)

	const script = document.createElement('script')
	script.setAttribute('src', 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=inxkickRenderTurnstile')
	script.setAttribute('defer', '')
	document.head.appendChild(script)
} // initTurnstile

export { init }
