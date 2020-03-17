<template>
	<div :class="wrapClasses">
		<button :class="buttonClasses" :disabled="disabled">
			<span class="inx-icon" uk-icon="search"></span>
			&nbsp;
			<inx-number-of-matches
				:name="nomName"
				:one-match="nomOneMatch"
				:no-matches="nomNoMatches">
			</inx-number-of-matches>
		</button>
	</div>
</template>

<script>
import NumberOfMatches from './NumberOfMatches.vue'

export default {
	name: 'inx-search-submit-button',
	props: {
		title: {
			type: String,
			default: 'Submit'
		},
		nomName: {
			type: String,
			default: 'matches'
		},
		nomOneMatch: {
			type: String,
			default: 'one match'
		},
		nomNoMatches: {
			type: String,
			default: 'no matches'
		},
		wrapClasses: {
			type: String,
			default: 'inx-search-submit-button'
		},
		buttonClasses: {
			type: String,
			default: ''
		}
	},
	computed: {
		disabled: function () {
			return typeof this.inxState.search.number_of_matches === 'undefined' ||
				!this.inxState.search.number_of_matches
		}
	},
	components: {
		'inx-number-of-matches': NumberOfMatches
	}
}
</script>

<style lang="scss" scoped>
button {
	display: flex;
	align-items: center;
	justify-content: center;

	span:first-child {
		margin-right: .5em;
	}
}

button:disabled:hover {
	pointer-events: none;
}
</style>