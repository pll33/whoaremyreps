import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../views/Home'
import NotFound from '../views/NotFound'
import PrivacyPolicy from '../views/PrivacyPolicy'
import RepresentativeLevel from '../views/RepresentativeLevel'
import RepresentativePage from '../views/RepresentativePage'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/privacy', component: PrivacyPolicy },
    { path: '/:level', component: RepresentativeLevel },
    { path: '/:level/:rep', component: RepresentativePage },
    // { path: '/:level/:rep/print', component: PrintRepresentative },
    { path: '*', component: NotFound }
  ]
})
