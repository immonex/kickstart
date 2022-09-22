<template>
	<span :class="wrapClasses">{{ numberOfMatches }}</span>
</template>

<script>
export default {
	name: 'inx-number-of-matches',
	props: {
		formIndex: {
			type: Number,
			default: 0
		},
		name: {
			type: String,
			default: ''
		},
		oneMatch: {
			type: String,
			default: ''
		},
		noMatches: {
			type: String,
			default: ''
		},
		locale: {
			type: String,
			default: 'de-DE'
		},
		wrapClasses: {
			type: String,
			default: 'inx-number-of-matches'
		}
	},
	data: function() {
		return {
			numberOfResults: ''
		}
	},
	computed: {
		numberOfMatches: function() {
			let value

			if (this.inxState.search.forms && this.inxState.search.forms[this.formIndex]) {
				value = this.inxState.search.forms[this.formIndex].numberOfMatches
			} else {
				value = this.inxState.search.number_of_matches
			}

			if (value === 0 && this.noMatches) {
				value = this.noMatches
			} else if (value === 1 && this.oneMatch) {
				value = this.oneMatch
			} else if (
				!isNaN(parseFloat(value)) &&
				isFinite(value) &&
				value > 1 &&
				this.name
			) {
				let formatted = value
				try {
					formatted = value.toLocaleString(this.locale)
				} catch (e) {
					formatted = value.toString()
				}

				value = formatted + ' ' + this.name
			}

			return value ? value : ''
		}
	}
}
</script>
