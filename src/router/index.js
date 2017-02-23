import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Home from '../views/Home'
import NotFound from '../views/NotFound'
import About from '../views/About'
import PrivacyPolicy from '../views/PrivacyPolicy'
import LegislativeComposition from '../views/LegislativeComposition'
import AdditionalResources from '../views/AdditionalResources'
import RepresentativeList from '../views/RepresentativeList'
import RepresentativePage from '../views/RepresentativePage'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about', component: About },
    { path: '/privacy', name: 'privacy', component: PrivacyPolicy },
    { path: '/composition', name: 'composition', component: LegislativeComposition },
    { path: '/resources', name: 'resources', component: AdditionalResources },
    { path: '/:level(all|federal|state|local)', component: RepresentativeList },
    { path: '/:level(all|federal|state|local)/:rep', component: RepresentativePage },
    { path: '*', component: NotFound }
  ]
})
