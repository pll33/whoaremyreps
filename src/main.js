import Vue from 'vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VueResource from 'vue-resource'

import App from './App'

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
