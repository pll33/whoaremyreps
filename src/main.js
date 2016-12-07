import Vue from 'vue'
import App from './App'
import 'font-awesome-loader'

Vue.use(require('vue-resource'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
