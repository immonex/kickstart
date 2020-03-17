<template>
	<div>
		<input type="checkbox" v-model="isReference" @change="toggle">
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'inx-backend-reference-toggle',
	props: ['propertyId', 'defaultChecked'],
	data: function() {
		return {
			isReference: this.defaultChecked
		}
	},
	methods: {
		toggle () {
			if (!this.propertyId) return

			const url = inx_state.site_url + '/wp-json/immonex-kickstart/v1/properties/' + this.propertyId

			axios
				.put(url, {
					reference: this.isReference
				})
				.then(response => {
					if (response.data.status === 'SUCCESS') {
						this.isReference = response.data.data.reference ? true : false
					}
				})
		}
	}
}
</script>
