import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../views/Home'
import NotFound from '../views/NotFound'
import RepresentativeLevel from '../views/RepresentativeLevel'
import RepresentativePage from '../views/RepresentativePage'
// import Representative from '../views/Representative'

export default new Router({
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
