import Vue from 'vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VueResource from 'vue-resource'

import 'font-awesome-loader'
import App from './App'
// import Hello from './views/Hello'

Vue.use(VueResource)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
