<template>
	<span :class="wrapClasses">{{ numberOfMatches }}</span>
</template>

<script>
export default {
	name: 'inx-number-of-matches',
	props: {
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
			let value = this.inxState.search.number_of_matches
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
				value += ' ' + this.name
			}

			return value ? value : ''
		}
	}
}
</script>
