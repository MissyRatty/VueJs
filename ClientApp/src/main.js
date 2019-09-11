// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Entry point file which will mount App.vue – our main UI component
// This is the first file to be executed when the application starts
import Vue from 'vue'
import App from './App'
import router from './router'
// Adding bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Adding Axios Http Client Library (A decorator around Ajax Fetch Calls)
import Axios from 'axios'

Vue.config.productionTip = false

// configure it to use the API_ENDPOINT environment variable as a base URL for all the Axios requests.
// 'process' is a global Node.js variable thru which we can access environment variables.
Axios.defaults.baseURL = process.env.API_ENDPOINT

// Vue.use() function is used to install vue plugins.
// it triggers the install function inside a plugin.
Vue.use(BootstrapVue)

// instantiate a new Vue component which is going to mount our App.vue component (UI) inside a div with the id app attribute(this is the div id=app in index.html).
// Finally, we notify our Vue component to use the router.
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
