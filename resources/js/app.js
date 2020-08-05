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
//export default new Vuetify(opts)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('frame-component', () => import('./components/FrameComponent'));
Vue.component('admin-component', () => import("./components/AdminComponent"));


//import App from './App'

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify()
  });
