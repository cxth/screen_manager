/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {iframeResize} from 'iframe-resizer'
import VueCookies from 'vue-cookies'


window.Vue = require('vue');

// iframe resizer
Vue.directive('resize', {
  bind: function(el, { value = {} }) {
    el.addEventListener('load', () => iFrameResize(value, el))
  }
})

var fetch_timeout = 60000 // 1 minute
if (window.location.hostname == 'sm.local')
{
  fetch_timeout = 8000 // 8 seconds
}

// declare global variable here
Vue.mixin({
    data: function() {
        return {
            siteURL: `https://${ window.location.hostname }`,
            fetchTimeout: fetch_timeout
        }
    }
})

Vue.use(Vuetify)
Vue.use(VueCookies)
// set default config
Vue.$cookies.config('7d')
Vue.$cookies.set('cross-site-cookie=bar; SameSite=None; Secure')

const opts = {}

Vue.component('frame-component', () => import('./components/FrameComponent'));
Vue.component('admin-component', () => import("./components/AdminComponent"));

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify()
  });
