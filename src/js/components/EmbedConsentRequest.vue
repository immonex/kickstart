<template>
	<div :class="classes">
		<div class="inx-embed-consent-request__consent" v-show="!consentGranted">
			<div class="inx-embed-consent-request__icon" v-html="iconTag" v-if="iconTag"></div>
			<p class="inx-embed-consent-request__privacy-note" v-html="privacyNote"></p>
			<div class="uk-flex uk-flex-middle uk-flex-wrap">
				<div class="uk-width-1-1 uk-width-1-2@m uk-margin-small-bottom uk-margin-remove-bottom@m uk-text-center uk-text-left@m"><button class="inx-button inx-button--action uk-button uk-button-primary" @click="grantConsent">{{ buttonText }}</button></div>
				<div class="uk-width-1-1 uk-width-1-2@m uk-margin-small-bottom uk-margin-remove-bottom@m uk-text-center uk-text-right@m" v-show="privacyPolicyUrl"><a :href="privacyPolicyUrl" target="_blank"><span uk-icon="icon: eye-slash" style="margin-right:8px; vertical-align:middle"></span>{{ privacyPolicyTitle }}</a></div>
			</div>
		</div>

		<div class="inx-embed-consent-request__content inx-embed-consent-request__content--has-consent" v-html="content" v-if="consentGranted"></div>
	</div>
</template>

<script>
export default {
	name: 'inx-embed-consent-request',
	props: {
		type: {
			type: String,
			default: 'generic'
		},
		content: {
			type: String,
			default: ''
		},
		wrapClasses: {
			type: String,
			default: ''
		},
		privacyNote: {
			type: String,
			default: ''
		},
		buttonText: {
			type: String,
			default: 'Agreed!'
		},
		iconTag: {
			type: String,
			default: ''
		},
		privacyPolicyUrl: {
			type: String,
			default: ''
		},
		privacyPolicyTitle: {
			type: String,
			default: 'Privacy Policy'
		},
		requireConsent: {
			type: Boolean,
			default: true
		}
	},
	data: function() {
		return {
			id: null,
			consentGranted: false
		}
	},
	computed: {
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-embed-consent-request inx-embed-consent-request--type--' + this.type)
			classes = classes.filter(function (value, index, self) {
				return self.indexOf(value) === index
			})

			return classes.join(' ')
		}
	},
	methods: {
		grantConsent (event) {
			if (event) {
				// Consent button clicked.
				event.preventDefault()
				this.$cookies.set('inx_consent_' + this.type, true)
			}

			this.consentGranted = true
		}
	},
	mounted () {
		this.id = this._uid
		if (!this.requireConsent || this.$cookies.get('inx_consent_' + this.type)) {
			this.grantConsent(null)
		}
	}
}
</script>
