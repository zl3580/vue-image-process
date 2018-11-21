import Vue from 'vue'

import App from './App.vue'

import {router} from './Router.js'

import imageprocess from './lib/index.js'
Vue.use(imageprocess)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
