import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import NotFound from '../views/NotFound'
import About from '../views/About'
import LegislativeComposition from '../views/LegislativeComposition'
import DistrictMaps from '../views/DistrictMaps'
import PrivacyPolicy from '../views/PrivacyPolicy'
import TermsOfService from '../views/TermsOfService'
import RepresentativeList from '../views/RepresentativeList'
import RepresentativePage from '../views/RepresentativePage'

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about', component: About },
    { path: '/composition', name: 'composition', component: LegislativeComposition },
    { path: '/maps', name: 'maps', component: DistrictMaps },
    { path: '/privacy', name: 'privacy', component: PrivacyPolicy },
    { path: '/terms', name: 'terms', component: TermsOfService },
    { path: '/:level(all|federal|state|local)', component: RepresentativeList },
    { path: '/:level(all|federal|state|local)/:rep', component: RepresentativePage },
    { path: '*', component: NotFound }
  ]
})
