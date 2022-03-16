<template>
	<div :class="mainClass">
		<input type="hidden" :name="this.name" :value="this.transferValue">
		<div :class="mainClass + '__label-value'">
			<span :class="mainClass + '__label'" v-if="this.label">{{ label }}:</span>
			<span :class="mainClass + '__value'">{{ currentValueFormatted }}</span>
		</div>
		<div :class="mainClass + '__nouislider'" ref="slider"></div>
	</div>
</template>

<script>
import noUiSlider from 'nouislider'

const defaultStepRanges = '{"100":10,"1000":50,"2000":100,"5000":500,"10000":1000}'

export default {
	name: 'inx-range-slider',
	props: {
		formIndex: {
			type: Number,
			default: 0
		},
		name: String,
		label: {
			type: String,
			default: ''
		},
		range: String,
		stepRanges: {
			type: String,
			default: defaultStepRanges
		},
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
			stepRangesConv: {},
			parsedRange: [],
			currentValue: [0],
			currentMarketingType: 'all',
			initialValueResettedOnce: false
		}
	},
	computed: {
		step: function () {
			if (
				typeof this.stepRangesConv === 'number' &&
				this.stepRangesConv > 0 &&
				this.stepRangesConv <= 10000
			) {
				return this.stepRangesConv
			}

			let currentStep = 1

			if (typeof this.stepRangesConv === 'object') {
				for (let key in this.stepRangesConv) {
					let threshold = parseInt(key)
					let thresholdStep = parseInt(this.stepRangesConv[key])
					if (!threshold || !thresholdStep) continue

					if (this.max > threshold &&	currentStep < thresholdStep) {
						currentStep = thresholdStep
					}
				}
			}

			return currentStep
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
		'transferValue': function (value) {
			if (
				typeof this.inxState.search.forms[this.formIndex] === 'undefined' ||
				(
					Array.isArray(this.currentValue) &&
					value === this.currentValue.join(',')
				)
			) {
				return
			}

			const formElementID = this.inxState.search.forms[this.formIndex].formElID
			jQuery('#' + formElementID + ' input[name=' + this.name + ']').trigger('change')
		},
		'inxState.search.forms': function (value) {
			const newMarketingType = this.getCurrentMarketingType()
			if (this.currentMarketingType !== newMarketingType) {
				this.updateRange()
				if (
					newMarketingType !== 'all' &&
					this.value !== this.range &&
					parseInt(this.value) !== 0 &&
					!this.initialValueResettedOnce
				) {
					this.setInitialValue()
					this.$refs.slider.noUiSlider.updateOptions({ start: this.currentValue }, false)
					this.initialValueResettedOnce = true
				}
				this.currentMarketingType = newMarketingType
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
		getSmoothRoundedValue (values) {
			if (!Array.isArray(values)) {
				const intValue = parseInt(values)
				if (isNaN(intValue)) return 0

				values = [intValue]
			}

			values.forEach((value, index) => {
				if (value >= 1000000) {
					values[index] = (value / 1000000).toFixed(1) * 1000000
				}
			})

			return values
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

			let args = {
				style: this.currency ? 'currency' : 'decimal',
				minimumFractionDigits: digits,
				maximumFractionDigits: digits
			}
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
			if (typeof this.inxState.search.forms[this.formIndex]['inx-search-marketing-type'] === 'undefined') {
				return 'all'
			}
			if (this.inxState.search.forms[this.formIndex]['inx-search-marketing-type'].match(/miete|rent/)) {
				return 'rent'
			}

			return 'sale'
		},
		setInitialValue () {
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
					// Initial value is a min/max array.
					let minValue = parseInt(initialValue[0])
					let maxValue = parseInt(initialValue[1])

					initialValue = [
						minValue,
						maxValue
					]
				}
			} else {
				// Initial value is a single number.
				initialValue = parseInt(this.value)
				if (
					initialValue < this.min ||
					initialValue >= this.max ||
					isNaN(initialValue)
				) {
					initialValue = this.min
				}

				// Convert value to a single value array.
				initialValue = [initialValue]
			}

			this.currentValue = initialValue
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

			this.stepRangesConv = JSON.parse(this.stepRanges ? this.stepRanges : defaultStepRanges)
		}
	},
	created: function () {
		this.currentMarketingType = this.getCurrentMarketingType()
		this.parsedRange = JSON.parse(this.range)
		this.updateRange()
		this.setInitialValue()
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

		window.setTimeout( () => {
			slider.noUiSlider.on('update', function (values, handle) {
				that.currentValue = that.getSmoothRoundedValue(values)
			})
		}, 2000 )
	}
}
</script>

<style lang="scss">
	.inx-range-slider {
		padding-right: .75em;
	}
</style>