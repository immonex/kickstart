<template>
	<div :class="mainClass">
		<input type="hidden" :id="this.name" :name="this.name" :value="this.transferValue">
		<div :class="mainClass + '__label-value'">
			<span :class="mainClass + '__label'" v-if="this.label">{{ label }}:</span>
			<span :class="mainClass + '__value'">{{ currentValueFormatted }}</span>
		</div>
		<div :class="mainClass + '__nouislider'" ref="slider"></div>
	</div>
</template>

<script>
import noUiSlider from 'nouislider'

export default {
	name: 'inx-range-slider',
	props: {
		name: String,
		label: {
			type: String,
			default: ''
		},
		range: String,
		value: String,
		pips: {
			type: Boolean,
			default: false
		},
		unit: {
			type: String,
			default: ''
		},
		currency: {
			type: String,
			default: ''
		},
		replaceNull: {
			type: String,
			default: ''
		},
		rangeUnlimitedTerm: {
			type: String,
			default: ''
		},
		locale: {
			type: String,
			default: 'de-DE'
		},
		wrapClasses: {
			type: String,
			default: 'inx-range-slider'
		}
	},
	data: function () {
		return {
			min: 0,
			max: 0,
			parsedRange: [],
			currentValue: [0],
			currentMarketingType: 'all'
		}
	},
	computed: {
		step: function () {
			if (this.max <= 100) return 1
			else if (this.max <= 1000) return 10
			else if (this.max <= 2000) return 50
			else if (this.max <= 5000) return 100
			else if (this.max <= 10000) return 500
			else return 1000
		},
		currentValueFormatted: function () {
			if  (this.isUnlimited(true) && this.rangeUnlimitedTerm) {
				return this.rangeUnlimitedTerm
			}

			if (typeof this.currentValue === 'object') {
				if ( this.currentValue.length === 2 ) {
					const from = this.getFormattedValue(this.currentValue[0])
					const to = this.getFormattedValue(this.currentValue[1])

					return from + ' - ' + to
				} else {
					return this.getFormattedValue(this.currentValue[0])
				}
			}
		},
		transferValue: function () {
			if (typeof jQuery !== 'undefined') {
				jQuery('input#' + this.name).trigger('change')
			}

			if ( this.isUnlimited(false) ) {
				return ''
			}

			let transferValue = this.currentValue
			if (Array.isArray(transferValue) && transferValue.length === 2) {
				transferValue = transferValue.concat([this.min, this.max])
			}

			return JSON.stringify(transferValue)
		},
		mainClass: function () {
			return this.wrapClasses.split(' ')[0]
		}
	},
	watch: {
		'inxState.search': function (value) {
			if (this.currentMarketingType !== this.getCurrentMarketingType()) {
				this.updateRange()
				this.currentMarketingType = this.getCurrentMarketingType()
			}
		}
	},
	methods: {
		isUnlimited (rangesOnly) {
			if (
				Array.isArray(this.currentValue) && (
					(
						!rangesOnly &&
						this.currentValue.length === 1 &&
						0 === this.currentValue[0]
					) || (
						this.currentValue[0] === this.min &&
						this.currentValue[1] === this.max
					)
				)
			) {
				return true
			}

			return false
		},
		getFormattedValue (value) {
			if (value === 0 && this.replaceNull) return this.replaceNull

			let suffix = ''
			let digits = 0

			if (value >= 1000000) {
				value = value / 1000000
				digits = 1
				suffix = 'Mio. '
			} else if (value >= 10000) {
				value = value / 1000
				suffix = this.currency ? 'T' : 'Tsd. '
			}

			if (this.unit && !this.currency) suffix = suffix.concat(this.unit)

			let args = { style: this.currency ? 'currency' : 'decimal', minimumFractionDigits: digits, maximumFractionDigits: digits }
			let formatted = value

			if (this.currency) args.currency = this.currency;
			try {
				formatted = value.toLocaleString(this.locale, args)
			} catch (e) {
				// Fallback (invalid currency code).
				formatted = value.toString()
				if (this.currency) {
					formatted += ' ' + this.currency
				}
			}

			return this.currency ? formatted.replace(/\s/, ' ' + suffix) : formatted + ' ' + suffix
		},
		getCurrentMarketingType () {
			if (
				typeof this.inxState.search['inx-search-marketing-type'] !== 'undefined' &&
				this.inxState.search['inx-search-marketing-type'].match(/verkauf|sale/)
			) {
				return 'sale'
			} else if (
				typeof this.inxState.search['inx-search-marketing-type'] !== 'undefined' &&
				this.inxState.search['inx-search-marketing-type'].match(/miete|rent/)
			) {
				return 'rent'
			} else {
				return 'all'
			}
		},
		updateRange () {
			if (this.parsedRange.length === 6) {
				let current = this.getCurrentMarketingType()

				if (current === 'sale') {
					// Min/Max range for properties that are for sale.
					this.min = this.parsedRange[2]
					this.max = this.parsedRange[3]
				} else if (current === 'rent') {
					// Min/Max range for properties that are for rent.
					this.min = this.parsedRange[4]
					this.max = this.parsedRange[5]
				} else {
					// Min/Max range if no marketing type has been selected.
					this.min = this.parsedRange[0]
					this.max = this.parsedRange[1]
				}

				const slider = this.$refs.slider
				if (typeof slider !== 'undefined') {
					this.currentValue = [this.min, this.max]

					slider.noUiSlider.updateOptions(
						{
							start: this.currentValue,
							range: {
								'min': this.min,
								'max': this.max
							},
							step: this.step
						},
						false // Boolean 'fireSetEvent'
					)
				}
			} else {
				this.min = this.parsedRange[0]
				this.max = this.parsedRange[1]
			}
		}
	},
	created: function () {
		this.currentMarketingType = this.getCurrentMarketingType()
		this.parsedRange = JSON.parse(this.range)
		this.updateRange()

		let initialValue

		try {
			initialValue = JSON.parse(this.value)
		} catch (e) {
			initialValue = 0
		}

		if (typeof initialValue === 'object') {
			if (initialValue.length === 3) {
				// (Single) Value array contains min/max range: ignore the latter.
				initialValue = initialValue[0]
			} else {
				// Intitial value is a min/max array.
				let minValue = parseInt(initialValue[0])
				let maxValue = parseInt(initialValue[1])

				initialValue = [
					minValue >= this.min ? minValue : this.min,
					maxValue <= this.max ? maxValue : this.max
				]
			}
		} else {
			// Initial value is a single number.
			initialValue = parseInt(this.value)
			if (
				initialValue < this.min ||
				initialValue >= this.max ||
				initialValue === 'NaN'
			) {
				initialValue = this.min
			}

			// Convert value to a single value array.
			initialValue = [initialValue]
		}

		this.currentValue = initialValue
	},
	mounted: function() {
		const slider = this.$refs.slider
		const that = this

		let attributes = {
			start: this.currentValue,
			connect: true,
			step: that.step,
			range: {
				'min': this.min,
				'max': this.max
			},
			format: {
				to: function (value) {
					return parseInt(value)
				},
				from: function (value) {
					return parseInt(value)
				}
			}
		}

		if (this.pips) {
			attributes.pips = {
				mode: 'positions',
				values: [0, 50, 100],
				density: 10,
				stepped: true,
				format: {
					to: function (value) {
						return that.getFormattedValue(value)
					}
				}
			}
		}

		noUiSlider.create(slider, attributes)

		slider.noUiSlider.on('update', function (values, handle) {
			that.currentValue = values
		})
	}
}
</script>

<style lang="scss">
	.inx-range-slider {
		padding-right: .75em;
	}
</style>