// Vue
import Vue from 'vue'
inx_state.vue = Vue

// vue-cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('24h', '', '', process.env.NODE_ENV === 'production')

// UIkit
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

inx_state.uikit = UIkit

UIkit.use(Icons)

// immonex Kickstart State
import inxState from './state'
Vue.mixin(inxState)

// Property Search
import './property_search'

// Property Lists
import './property_lists'

// Property Details
import './property_details'

// (S)CSS
import '../../scss/frontend.scss'
