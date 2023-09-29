// import tailwindcss
// import './index.css'
// Additional polyfills
import 'custom-event-polyfill'
import 'url-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

import globals from './globals'
import Popper from 'popper.js'

import VueProgressBar from 'vue-progressbar'
import Auth from './auth'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import store from "./store"
import ElementUI from 'element-ui';
import { ElementTiptapPlugin } from 'element-tiptap';
// import ElementUI's styles
import 'element-ui/lib/theme-chalk/index.css';
// import this package's styles
import 'element-tiptap/lib/index.css';

// Vue.use(ElementUI)

Vue.use(VueSweetalert2)

Vue.use(ElementTiptapPlugin, {
  lang : 'en',
})

window.auth = new Auth()

Vue.use(VueProgressBar, {
  color: 'rgb(3, 169, 244)',
  failedColor: 'red',
  thickness: '5px',
  transition: {
    speed: '1.5s',
    opacity: '0.5s',
    termination: 1600
  },
})

// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

Vue.config.productionTip = false

Vue.use(BootstrapVue)


// Global RTL flag
Vue.mixin({
  data: globals
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
