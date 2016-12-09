import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import 'font-awesome-loader'
// import Hello from './components/Hello'
import Home from './components/views/Home'
import NotFound from './components/views/NotFound'
import RepresentativeLevel from './components/views/RepresentativeLevel'
// import Representative from './components/views/Representative'
import RepresentativePage from './components/views/RepresentativePage'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/reps', redirect: '/' },
    { path: '/reps/:level', component: RepresentativeLevel },
    { path: '/reps/:level/:representative', component: RepresentativePage },
    { path: '*', component: NotFound }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
