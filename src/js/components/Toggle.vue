<template>
	<span :class="classes" @click="toggle">
		<slot name="active" v-if="active"></slot>
		<slot name="inactive" v-if="!active"></slot>
	</span>
</template>

<script>
export default {
	name: 'inx-toggle',
	props: {
		state: {
			type: Number,
			default: 0
		},
		wrapClasses: {
			type: String,
			default: ''
		}
	},
	data: function() {
		return {
			active: 0
		}
	},
	computed: {
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-toggle')
			if (this.active) classes.push('inx-toggle--is-active')
			classes = classes.filter(function (value, index, self) {
				return self.indexOf(value) === index
			})

			return classes.join(' ')
		}
	},
	methods: {
		toggle () {
			this.active = this.active === 0 ? 1 : 0
		}
	},
	mounted () {
		this.active = this.state
	}
}
</script>
