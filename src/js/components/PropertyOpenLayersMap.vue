<template>
	<div :class="classes">
		<div class="inx-property-map__consent" v-show="!consentGranted">
			<div class="inx-property-map__privacy-note uk-flex uk-flex-top">
				<div class="uk-width-auto uk-margin-small-right"><span uk-icon="icon: location; ratio: 2"></span></div>
				<div class="uk-width-expand" v-html="privacyNote"></div>
			</div>
			<button class="inx-button inx-button--action uk-button uk-button-primary" @click="grantConsent">{{ showMapButtonText }}</button>
		</div>

		<div class="ol-popup" ref="popup" v-show="consentGranted && popupVisible">
			<a class="ol-popup-closer" ref="popupCloser" @click="hidePopup"></a>
			<div ref="popupContent"></div>
		</div>

		<div :class="['inx-property-map__map', { 'inx-property-map__map--has-consent': consentGranted }]" ref="map"></div>
	</div>
</template>

<script>
/* OpenLayers */
import Map from 'ol/Map'
import Feature from 'ol/Feature'
import Collection from 'ol/Collection'
import { Fill, Text, Style, Icon } from 'ol/style'
import View from 'ol/View'
import Overlay from 'ol/Overlay'
import { Point } from 'ol/geom'
import { transform,fromLonLat } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { Cluster, OSM, Vector, XYZ } from 'ol/source'
import { easeIn, easeOut } from 'ol/easing'
import 'ol/ol.css';
import Google from 'ol/source/Google.js'
import Layer from 'ol/layer/WebGLTile.js'
import { Control, defaults as defaultControls } from 'ol/control.js'
import { MouseWheelZoom, defaults } from 'ol/interaction.js';
import { platformModifierKeyOnly } from 'ol/events/condition.js';

import axios from 'axios'
import { getSvgImgSrc, addBacklinkURL } from '../shared_components'
import pinIconSvgSource from '../../assets/marker-pin.source.svg'

export default {
	name: 'inx-property-open-layers-map',
	props: {
		type: {
			type: String,
			default: 'osm'
		},
		options: {
			type: String,
			default: ''
		},
		apiKey: {
			type: String,
			default: ''
		},
		useClustering: {
			type: Boolean,
			default: true
		},
		lat: {
			type: Number,
			default: 49.8587840
		},
		lng: {
			type: Number,
			default: 6.7854410
		},
		zoom: {
			type: Number,
			default: 12
		},
		autoFit: {
			type: Boolean,
			default: true
		},
		markerSetId: {
			type: String,
			default: ''
		},
		markerFillColor: {
			type: String,
			default: '#E77906'
		},
		markerFillOpacity: {
			type: Number,
			default: .8
		},
		markerStrokeColor: {
			type: String,
			default: '#404040'
		},
		markerStrokeWidth: {
			type: Number,
			default: 3
		},
		markerScale: {
			type: Number,
			default: .75,
		},
		markerIconUrl: false,
		wrapClasses: {
			type: String,
			default: ''
		},
		privacyNote: {
			type: String,
			default: ''
		},
		showMapButtonText: {
			type: String,
			default: 'Agreed, show maps!'
		},
		requireConsent: {
			type: Boolean,
			default: true
		},
		disableLinks: {
			type: String,
			default: ''
		},
		forceLang: {
			type: String,
			default: ''
		},
		previewMarkers: {
			type: String,
			default: ''
		},
	},
	data: function() {
		return {
			id: null,
			overlay: null,
			consentGranted: false,
			popupVisible: false,
			map: null,
			currentZoom: 0,
			vectorSource: null,
			markerPropertyData: {},
			markerIconScale: .75,
			markerIconAnchorY: .925,
			markerIconTextOffsetY: -15,
			markerStyleCache: {}
		}
	},
	computed: {
		olSourceType () {
			if (this.type.substring(0, 4) === 'gmap') return 'google'
			if (this.type.substring(0, 3) === 'osm') return 'osm'

			return 'xyz'
		},
		classes () {
			let classes = this.wrapClasses.length > 0 ? this.wrapClasses.split(' ') : []
			classes.push('inx-property-map inx-property-map--type--olmap')
			classes = classes.filter(function (value, index, self) {
				return self.indexOf(value) === index
			})

			return classes.join(' ')
		},
		markerSet () {
			const markers = []
			const markerSource = this.previewMarkers ?
				JSON.parse(atob(this.previewMarkers)) :
				this.inxMaps[this.markerSetId]

			for (let postId in markerSource) {
				const markerData = markerSource[postId]

				const lat = parseFloat(Array.isArray(markerData) ? markerData[0] : markerData.lat)
				const lng = parseFloat(Array.isArray(markerData) ? markerData[1] : markerData.lng)

				if (!lat || ! lng) continue
				markers.push(this.propertyMarker([lng, lat], postId))
			}

			return markers
		}
	},
	watch: {
		'markerSet': function (newMarkers) {
			if (!this.map) return

			this.updateMarkers(newMarkers)

			if (this.markerSet.length === 1) {
				const coords = this.markerSet[0].getGeometry().getCoordinates()
				const propertyId = this.markerSet[0].get('name')
				this.showPopup(null, [propertyId], coords)
			} else {
				this.fitMapView(this.map)
			}
		}
	},
	methods: {
		grantConsent (event) {
			if (event) {
				// Consent button clicked.
				event.preventDefault()
				this.$cookies.set('inx_consent_use_maps', true)
			}

			this.consentGranted = true

			this.map = this.createMap()
			this.$nextTick(() => {
				this.map.updateSize()
			})
		},
		isCluster (feature) {
			if (feature && typeof feature.get('features') !== 'undefined') {
				return true
			}

			return false
		},
		sanitizeUrl (url) {
			return url.replace('[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]', '')
		},
		async fetchMarkerPropertyData (propertyPostIds) {
			if (this.markerPropertyData[propertyPostIds]) {
				return this.markerPropertyData[propertyPostIds]
			}

			let url = inx_state.core.rest_base_url + 'immonex-kickstart/v1/properties/' + propertyPostIds + '/'
			url += (url.indexOf('?') === -1 ? '?' : '&') + 'inx-r-response=json_map_markers&inx-r-lang=' + inx_state.core.locale.substring(0, 2)

			if (this.disableLinks) {
				url += '&inx-r-disable-links=' + this.disableLinks
			}
			if (this.forceLang) {
				url += '&inx-r-force-lang=' + this.forceLang
			}

			try {
				const response = await axios.get(url)

				this.markerPropertyData[propertyPostIds] = response.data
				return this.markerPropertyData[propertyPostIds]
			} catch (e) {
				return false
			}
		},
		async showPopup (event, postIds, coords) {
			const contentEl = this.$refs.popupContent;
			const resolution = this.map.getView().getResolution()
			const viewExtent = this.map.getView().calculateExtent()
			const viewWidth = viewExtent[2] - viewExtent[0]
			const viewHeight = viewExtent[3] - viewExtent[1]

			let center = [coords[0], coords[1]]
			center[0] = center[0] + 90 * resolution // ((viewWidth * 0.3) / 2)
			center[1] = center[1] + (viewHeight * 0.9) / 2

			this.map.getView().animate(
				{
					center: center,
					duration: 800,
					easing: easeOut
				},
				{
					center: center,
					duration: 800,
					easing: easeIn
				}
			)

			let property = ''
			let content = ''
			let wrapStyle = ''

			const propertyData = await this.fetchMarkerPropertyData(postIds.slice(0, 64).join(','))
			if (!propertyData) return

			for (let i = 0; i < postIds.length; i++) {
				const property = propertyData[postIds[i]]
				if (!property) continue

				content += '<div class="inx-property-map__property">'
				if (property.url) {
					property.url = addBacklinkURL(property.url)
					content += '<a href="' + this.sanitizeUrl(property.url) + '">'
				}
				if (property.thumbnail_url) {
					content += '<img src="' + this.sanitizeUrl(property.thumbnail_url) + '">'
				}
				content += '<div>' + property.title + '</div>'
				if (property.url) {
					content += '</a>'
				}
				if (property.type) {
					content += '<div>' + property.type + '</div>'
				}
				content += '</div>'
			}

			contentEl.innerHTML = '<div class="inx-property-map__property-wrap">' + content + '</div>'

			this.overlay.setPosition(coords)
			this.popupVisible = true
		},
		hidePopup () {
			if (!this.popupVisible) return
			this.popupVisible = false
			this.overlay.setPosition(undefined)
			this.$refs.popupCloser.blur()
			return false
		},
		addPopup (map) {
			const container = this.$refs.popup

			this.overlay = new Overlay({
				element: container,
				positioning: 'bottom-center',
				offset: [1, -50 * Math.min(1, this.markerScale)]
			})

			map.addOverlay(this.overlay)
		},
		propertyMarker (lonLat, postId) {
			let marker = new Feature({
				geometry: new Point(
					fromLonLat(lonLat)
				),
				name: postId
			})

			return marker
		},
		updateMarkers(newMarkers) {
			this.hidePopup()
			this.vectorSource.clear()
			this.vectorSource.addFeatures(newMarkers)
		},
		fitMapView (map) {
			if (!map || !this.autoFit || this.markerSet.length === 0) return

			this.$nextTick(() => {
				map.updateSize()

				const extent = this.vectorSource.getExtent()
				map.getView().fit(extent, { size: map.getSize(), padding: [48, 32, 32, 32] })
			})
		},
		addMarkers (map) {
			const that = this

			if (this.useClustering) {
				const clusterSource = new Cluster({
					distance: 50,
					source: this.vectorSource
				})

				const clusterVectorLayer = new VectorLayer({
					source: clusterSource,
					style: (feature) => that.getMarkerStyle(feature.get('features').length)
				})

				map.addLayer(clusterVectorLayer)
			} else {
				const markerVectorLayer = new VectorLayer({
					source: this.vectorSource
				})

				map.addLayer(markerVectorLayer)
			}

			this.fitMapView(map)
		},
		getMarkerStyle(size) {
			if (this.markerStyleCache[size]) return this.markerStyleCache[size]

			let style

			const markerScale = Math.min(1, this.markerScale)
			const markerAnchorY = 1 - markerScale * .1

			if (this.markerIconUrl) {
				/**
				 * Custom Marker Icon
				 */

				style = new Style({
					image: new Icon(({
						anchor: [.5, markerAnchorY],
						src: this.markerIconUrl,
						scale: markerScale
					}))
				})
			} else {
				/**
				 * SVG Marker Pin
				 */

				const parser = new DOMParser()
				const pinSvgElement = parser.parseFromString(pinIconSvgSource, 'image/svg+xml').documentElement

				pinSvgElement.style.cssText = '--fillColor:' + this.markerFillColor
					+ ' ;--fillOpacity:' + this.markerFillOpacity
					+ ' ;--strokeWidth:' + this.markerStrokeWidth
					+ ' ;--strokeColor:' + this.markerStrokeColor

				if (markerScale !== 1) {
					pinSvgElement.setAttribute('width', Math.floor(pinSvgElement.getAttribute('width') * markerScale))
					pinSvgElement.setAttribute('height', Math.floor(pinSvgElement.getAttribute('height') * markerScale))
				}

				const pinSvgElementString = (new XMLSerializer()).serializeToString(pinSvgElement)

				style = new Style({
					image: new Icon({
						anchor: [0.5, this.markerIconAnchorY],
						src: 'data:image/svg+xml,' + getSvgImgSrc(pinSvgElementString)
					})
				})
			}

			if (size > 1) {
				style.setText( new Text({
					text: [ size.toString(), 'bold 10px sans-serif' ],
					offsetY: -20 * Math.min(1, markerScale),
					fill: new Fill({
						color: '#FFF'
					})
				}))
			}

			this.markerStyleCache[size] = style

			return style
		},
		addClickEventListener (map) {
			const that = this

			map.on('singleclick', function(event) {
				let propertyPostIds = []

				const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
					return feature
				})

				if (that.isCluster(feature)) {
					if (feature.get('features').length > 1 && that.currentZoom < this.getView().getMaxZoom()) {
						const clusterVectorSource = new Vector({
							features: feature.get('features')
						})

						that.$nextTick(() => {
							map.updateSize()

							const extent = clusterVectorSource.getExtent()
							map.getView().fit(extent, { size: map.getSize(), padding: [48, 32, 32, 32], duration: 500 })
						})
					} else {
						feature.get('features').forEach(property => {
							propertyPostIds.push(property.get('name'))
						})
					}
				} else if (feature) {
					propertyPostIds.push(feature.get('name'))
				}

				if (propertyPostIds.length > 0) {
					that.showPopup(event, propertyPostIds, feature.getGeometry().getCoordinates())
				} else {
					that.hidePopup()
				}
			})
		},
		addZoomChangeEventListener (map) {
			const that = this

			map.on('moveend', function(event) {
				const newZoom = map.getView().getZoom()

				if (newZoom !== that.currentZoom) {
					that.currentZoom = newZoom
					that.hidePopup()
				}
			})
		},
		createMap () {
			const mapElement = this.$refs.map

			if (!this.lat) {
				this.lat = 49.8587840
			}
			if (!this.lng) {
				this.lng = 6.7854410
			}

			let source
			let controls
			let options = this.options ? JSON.parse(atob(this.options)) : {}

			if ('crossOrigin' in options && options.crossOrigin === 'null') {
				options.crossOrigin = null
			}

			switch (this.olSourceType) {
				case 'google':
					options.key = this.apiKey
					source = new Google(options)

					class GoogleLogoControl extends Control {
						constructor() {
							const element = document.createElement('img')
							element.style.pointerEvents = 'none'
							element.style.position = 'absolute'
							element.style.bottom = '5px'
							element.style.left = '5px'
							element.style.width = '66px'
							element.style.height = '26px'
							element.src =
								'data:image/svg+xml,%3Csvg%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2069%2029%22%3E%3Cg%20opacity%3D%22.6%22%20fill%3D%22%23fff%22%20stroke%3D%22%23fff%22%20stroke-width%3D%221.5%22%3E%3Cpath%20d%3D%22M17.4706%207.33616L18.0118%206.79504%2017.4599%206.26493C16.0963%204.95519%2014.2582%203.94522%2011.7008%203.94522c-4.613699999999999%200-8.50262%203.7551699999999997-8.50262%208.395779999999998C3.19818%2016.9817%207.0871%2020.7368%2011.7008%2020.7368%2014.1712%2020.7368%2016.0773%2019.918%2017.574%2018.3689%2019.1435%2016.796%2019.5956%2014.6326%2019.5956%2012.957%2019.5956%2012.4338%2019.5516%2011.9316%2019.4661%2011.5041L19.3455%2010.9012H10.9508V14.4954H15.7809C15.6085%2015.092%2015.3488%2015.524%2015.0318%2015.8415%2014.403%2016.4629%2013.4495%2017.1509%2011.7008%2017.1509%209.04835%2017.1509%206.96482%2015.0197%206.96482%2012.341%206.96482%209.66239%209.04835%207.53119%2011.7008%207.53119%2013.137%207.53119%2014.176%208.09189%2014.9578%208.82348L15.4876%209.31922%2016.0006%208.80619%2017.4706%207.33616z%22/%3E%3Cpath%20d%3D%22M24.8656%2020.7286C27.9546%2020.7286%2030.4692%2018.3094%2030.4692%2015.0594%2030.4692%2011.7913%2027.953%209.39011%2024.8656%209.39011%2021.7783%209.39011%2019.2621%2011.7913%2019.2621%2015.0594c0%203.25%202.514499999999998%205.6692%205.6035%205.6692zM24.8656%2012.8282C25.8796%2012.8282%2026.8422%2013.6652%2026.8422%2015.0594%2026.8422%2016.4399%2025.8769%2017.2905%2024.8656%2017.2905%2023.8557%2017.2905%2022.8891%2016.4331%2022.8891%2015.0594%2022.8891%2013.672%2023.853%2012.8282%2024.8656%2012.8282z%22/%3E%3Cpath%20d%3D%22M35.7511%2017.2905v0H35.7469C34.737%2017.2905%2033.7703%2016.4331%2033.7703%2015.0594%2033.7703%2013.672%2034.7343%2012.8282%2035.7469%2012.8282%2036.7608%2012.8282%2037.7234%2013.6652%2037.7234%2015.0594%2037.7234%2016.4439%2036.7554%2017.2962%2035.7511%2017.2905zM35.7387%2020.7286C38.8277%2020.7286%2041.3422%2018.3094%2041.3422%2015.0594%2041.3422%2011.7913%2038.826%209.39011%2035.7387%209.39011%2032.6513%209.39011%2030.1351%2011.7913%2030.1351%2015.0594%2030.1351%2018.3102%2032.6587%2020.7286%2035.7387%2020.7286z%22/%3E%3Cpath%20d%3D%22M51.953%2010.4357V9.68573H48.3999V9.80826C47.8499%209.54648%2047.1977%209.38187%2046.4808%209.38187%2043.5971%209.38187%2041.0168%2011.8998%2041.0168%2015.0758%2041.0168%2017.2027%2042.1808%2019.0237%2043.8201%2019.9895L43.7543%2020.0168%2041.8737%2020.797%2041.1808%2021.0844%2041.4684%2021.7772C42.0912%2023.2776%2043.746%2025.1469%2046.5219%2025.1469%2047.9324%2025.1469%2049.3089%2024.7324%2050.3359%2023.7376%2051.3691%2022.7367%2051.953%2021.2411%2051.953%2019.2723v-8.8366zm-7.2194%209.9844L44.7334%2020.4196C45.2886%2020.6201%2045.878%2020.7286%2046.4808%2020.7286%2047.1616%2020.7286%2047.7866%2020.5819%2048.3218%2020.3395%2048.2342%2020.7286%2048.0801%2021.0105%2047.8966%2021.2077%2047.6154%2021.5099%2047.1764%2021.7088%2046.5219%2021.7088%2045.61%2021.7088%2045.0018%2021.0612%2044.7336%2020.4201zM46.6697%2012.8282C47.6419%2012.8282%2048.5477%2013.6765%2048.5477%2015.084%2048.5477%2016.4636%2047.6521%2017.2987%2046.6697%2017.2987%2045.6269%2017.2987%2044.6767%2016.4249%2044.6767%2015.084%2044.6767%2013.7086%2045.6362%2012.8282%2046.6697%2012.8282zM55.7387%205.22083v-.75H52.0788V20.4412H55.7387V5.220829999999999z%22/%3E%3Cpath%20d%3D%22M63.9128%2016.0614L63.2945%2015.6492%2062.8766%2016.2637C62.4204%2016.9346%2061.8664%2017.3069%2061.0741%2017.3069%2060.6435%2017.3069%2060.3146%2017.2088%2060.0544%2017.0447%2059.9844%2017.0006%2059.9161%2016.9496%2059.8498%2016.8911L65.5497%2014.5286%2066.2322%2014.2456%2065.9596%2013.5589%2065.7406%2013.0075C65.2878%2011.8%2063.8507%209.39832%2060.8278%209.39832%2057.8445%209.39832%2055.5034%2011.7619%2055.5034%2015.0676%2055.5034%2018.2151%2057.8256%2020.7369%2061.0659%2020.7369%2063.6702%2020.7369%2065.177%2019.1378%2065.7942%2018.2213L66.2152%2017.5963%2065.5882%2017.1783%2063.9128%2016.0614zM61.3461%2012.8511L59.4108%2013.6526C59.7903%2013.0783%2060.4215%2012.7954%2060.9017%2012.7954%2061.067%2012.7954%2061.2153%2012.8161%2061.3461%2012.8511z%22/%3E%3C/g%3E%3Cpath%20d%3D%22M11.7008%2019.9868C7.48776%2019.9868%203.94818%2016.554%203.94818%2012.341%203.94818%208.12803%207.48776%204.69522%2011.7008%204.69522%2014.0331%204.69522%2015.692%205.60681%2016.9403%206.80583L15.4703%208.27586C14.5751%207.43819%2013.3597%206.78119%2011.7008%206.78119%208.62108%206.78119%206.21482%209.26135%206.21482%2012.341%206.21482%2015.4207%208.62108%2017.9009%2011.7008%2017.9009%2013.6964%2017.9009%2014.8297%2017.0961%2015.5606%2016.3734%2016.1601%2015.7738%2016.5461%2014.9197%2016.6939%2013.7454h-4.9931V11.6512h7.0298C18.8045%2012.0207%2018.8456%2012.4724%2018.8456%2012.957%2018.8456%2014.5255%2018.4186%2016.4637%2017.0389%2017.8434%2015.692%2019.2395%2013.9838%2019.9868%2011.7008%2019.9868z%22%20fill%3D%22%234285F4%22/%3E%3Cpath%20d%3D%22M29.7192%2015.0594C29.7192%2017.8927%2027.5429%2019.9786%2024.8656%2019.9786%2022.1884%2019.9786%2020.0121%2017.8927%2020.0121%2015.0594%2020.0121%2012.2096%2022.1884%2010.1401%2024.8656%2010.1401%2027.5429%2010.1401%2029.7192%2012.2096%2029.7192%2015.0594zM27.5922%2015.0594C27.5922%2013.2855%2026.3274%2012.0782%2024.8656%2012.0782S22.1391%2013.2937%2022.1391%2015.0594C22.1391%2016.8086%2023.4038%2018.0405%2024.8656%2018.0405S27.5922%2016.8168%2027.5922%2015.0594z%22%20fill%3D%22%23E94235%22/%3E%3Cpath%20d%3D%22M40.5922%2015.0594C40.5922%2017.8927%2038.4159%2019.9786%2035.7387%2019.9786%2033.0696%2019.9786%2030.8851%2017.8927%2030.8851%2015.0594%2030.8851%2012.2096%2033.0614%2010.1401%2035.7387%2010.1401%2038.4159%2010.1401%2040.5922%2012.2096%2040.5922%2015.0594zM38.4734%2015.0594C38.4734%2013.2855%2037.2087%2012.0782%2035.7469%2012.0782%2034.2851%2012.0782%2033.0203%2013.2937%2033.0203%2015.0594%2033.0203%2016.8086%2034.2851%2018.0405%2035.7469%2018.0405%2037.2087%2018.0487%2038.4734%2016.8168%2038.4734%2015.0594z%22%20fill%3D%22%23FABB05%22/%3E%3Cpath%20d%3D%22M51.203%2010.4357v8.8366C51.203%2022.9105%2049.0595%2024.3969%2046.5219%2024.3969%2044.132%2024.3969%2042.7031%2022.7955%2042.161%2021.4897L44.0417%2020.7095C44.3784%2021.5143%2045.1997%2022.4588%2046.5219%2022.4588%2048.1479%2022.4588%2049.1499%2021.4487%2049.1499%2019.568V18.8617H49.0759C48.5914%2019.4612%2047.6552%2019.9786%2046.4808%2019.9786%2044.0171%2019.9786%2041.7668%2017.8352%2041.7668%2015.0758%2041.7668%2012.3%2044.0253%2010.1319%2046.4808%2010.1319%2047.6552%2010.1319%2048.5914%2010.6575%2049.0759%2011.2323H49.1499V10.4357H51.203zM49.2977%2015.084C49.2977%2013.3512%2048.1397%2012.0782%2046.6697%2012.0782%2045.175%2012.0782%2043.9267%2013.3429%2043.9267%2015.084%2043.9267%2016.8004%2045.175%2018.0487%2046.6697%2018.0487%2048.1397%2018.0487%2049.2977%2016.8004%2049.2977%2015.084z%22%20fill%3D%22%234285F4%22/%3E%3Cpath%20d%3D%22M54.9887%205.22083V19.6912H52.8288V5.220829999999999H54.9887z%22%20fill%3D%22%2334A853%22/%3E%3Cpath%20d%3D%22M63.4968%2016.6854L65.1722%2017.8023C64.6301%2018.6072%2063.3244%2019.9869%2061.0659%2019.9869%2058.2655%2019.9869%2056.2534%2017.827%2056.2534%2015.0676%2056.2534%2012.1439%2058.2901%2010.1483%2060.8278%2010.1483%2063.3818%2010.1483%2064.6301%2012.1768%2065.0408%2013.2773L65.2625%2013.8357%2058.6843%2016.5623C59.1853%2017.5478%2059.9737%2018.0569%2061.0741%2018.0569%2062.1746%2018.0569%2062.9384%2017.5067%2063.4968%2016.6854zM58.3312%2014.9115L62.7331%2013.0884C62.4867%2012.4724%2061.764%2012.0454%2060.9017%2012.0454%2059.8012%2012.0454%2058.2737%2013.0145%2058.3312%2014.9115z%22%20fill%3D%22%23E94235%22/%3E%3C/svg%3E'
							super({
								element: element
							})
						}
					}

					controls = defaultControls().extend([new GoogleLogoControl()])
					break;
				case 'osm':
					source = new OSM(options)
					break;
				default:
					source = new XYZ(options)
			}

			source.on('change', () => {
				if (source.getState() === 'error') {
					console.error('[immonex Kickstart] ' + source.getError())
				}
			})

			const maxZoom = options.maxZoom || 18
			let currentZoom = this.zoom
			if (maxZoom && currentZoom > maxZoom) {
				currentZoom = maxZoom
			}

			const map = new Map({
				target: mapElement,
				interactions: defaults({mouseWheelZoom: false}).extend([
					new MouseWheelZoom({
						condition: platformModifierKeyOnly
					}),
				]),
				layers: [
					new TileLayer({source})
				],
				controls: controls,
				view: new View({
					center: fromLonLat([this.lng, this.lat]),
					zoom: currentZoom,
					minZoom: 0,
					maxZoom: maxZoom
				})
			})

			this.addMarkers(map)
			this.addPopup(map)
			this.addClickEventListener(map)
			this.addZoomChangeEventListener(map)

			return map
		}
	},
	mounted () {
		if (this.type === 'gmaps' && ! this.apiKey) {
			console.error('[immonex Kickstart] Google Maps API key is missing.')
			return
		}

		this.vectorSource = new Vector({
			features: this.markerSet
		})

		if (!this.requireConsent || this.$cookies.get('inx_consent_use_maps')) {
			this.grantConsent(null)
		}
	}
}
</script>

<style lang="scss" scoped>
	a {
		text-decoration: none;
		box-shadow: none;
	}

	.ol-popup {
		position: absolute;
		bottom: 12px;
		left: -50px;
		padding: 15px;
		border: 1px solid #cccccc;
		border-radius: 5px 5px 10px 5px;
		min-width: 220px;
		background-color: white;
		-webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
		filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
	}

	.ol-popup:after,
	.ol-popup:before {
		position: absolute;
		top: 100%;
		height: 0;
		width: 0;
		border: solid transparent;
		content: " ";
		pointer-events: none;
	}

	.ol-popup:after {
		left: 48px;
		margin-left: -10px;
		border-width: 10px;
		border-top-color: white;
	}

	.ol-popup:before {
		left: 48px;
		margin-left: -11px;
		border-width: 11px;
		border-top-color: #ccc;
	}

	.ol-popup-closer {
		position: absolute;
		top: 2px;
		right: 8px;
		text-decoration: none;
		cursor: pointer;
	}
	.ol-popup-closer:after {
		content: "✖";
	}
</style>
