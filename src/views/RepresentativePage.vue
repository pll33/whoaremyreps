<template>
  <div class="rep-container">
    <div class="rep-page" v-if="rep" v-once>
      <party-affiliation-marker :party="rep.party" :display_bool="false"></party-affiliation-marker>
      <span class="name"> {{ rep.name }}<br></span>
      <span class="position">{{ rep.position }}<br></span>
      <div class="rep-info">
        <div class="rep-main">
          <img v-if="rep.photoUrl" v-bind:src="rep.photoUrl">
          <div class="address" v-if="rep.address">
            <span>{{rep.address[0].line1}}<br></span>
            <span v-if="rep.address[0].line2">{{rep.address[0].line2}}<br></span>
            <span>{{rep.address[0].city}}, {{rep.address[0].state}} {{rep.address[0].zip}}</span>
          </div>
          <div v-if="rep.channels">
            <ul class="social-media">
              <social-media-icon v-for="channel in rep.channels" :channel="channel"></social-media-icon>
            </ul>
            <span class="websites" v-for="site in rep.urls">
              <a v-bind:href="site" target="_blank" rel="noopener"><i class="fa fa-external-link-square"></i></a>
            </span>
          </div>
          <div class="phones" v-for="num in rep.phones">
            <span><i class="fa fa-phone"></i> {{ num }}</span>
          </div>
          <button v-if="rep.address || rep.channels" class="btn"><i class="fa fa-envelope-o"></i> Send contact info via email</button>
          <v-card v-if="rep.address || rep.channels" :rep="rep"></v-card>
        </div>
        <div class="rep-detail" v-if="rep.extraInfo">
          <president-info v-if="isHeadOfGov && isFederal" :slug="rep.slug"></president-info>
          <governor-info v-else-if="isHeadOfGov && !isFederal"></governor-info>
          <legislator-info-federal v-else-if="isFederal"
            :slug="rep.slug" :role="rep.role" :name="rep.name" :party="rep.party" :ocd="rep.ocd_id">
          </legislator-info-federal>
          <legislator-info-state v-else-if="!isFederal"
            :slug="rep.slug" :role="rep.role" :name="rep.name" :party="rep.party"></legislator-info-state>
        </div>
        <div class="no-info" v-if="!rep.address && !rep.channels">No contact information available.</div>
      </div>
    </div>
    <div v-else>
      <h2>Representative Not Found</h2>
      <router-link to="/all">Back to All</router-link>
      <!-- <clip-loader v-if="!rep" :color="loader.color"></clip-loader> -->
      <!-- <span>Redirecting to <router-link to="/all">/all</router-link> in 10 seconds...</span> -->
      <!-- TO-DO: redirect to /all in x seconds if representative could not load -->
    </div>
  </div>
</template>
<script>
// import store from '../store'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import PartyAffiliationMarker from '../components/PartyAffiliationMarker'
import SocialMediaIcon from '../components/SocialMediaIcon'
import vCard from '../components/vCard'
import PresidentInfo from './PresidentInfo'
import GovernorInfo from './GovernorInfo'
import LegislatorInfoFederal from './LegislatorInfoFederal'
import LegislatorInfoState from './LegislatorInfoState'

export default {
  name: 'representative-page',
  components: {
    ClipLoader,
    PartyAffiliationMarker,
    SocialMediaIcon,
    vCard,
    PresidentInfo,
    GovernorInfo,
    LegislatorInfoFederal,
    LegislatorInfoState
  },
  data () {
    return {
      loader: {
        color: '#3C4E6F'
      }
    }
  },
  computed: {
    // rep_exists () {
    //   // return !!this.$store.getters.getRepresentativePage
    //   // TO-DO: rewrite to better determine if current rep page exists in store representatives
    //   // existing BUG: when clicking to rep page, then quickly clicking to another page within the 10s timeout, the next
    //   // page will be '/undefined' (use navigation guards?)
    //   let level = this.$store.state.route.params.level
    //   let path = this.$store.state.route.path
    //   console.log('before timeout path: ', path)
    //   if (!this.rep_does_exist && !this.rep_check) {
    //     this.rep_check = true
    //     setTimeout(() => {
    //       console.log('timeout, does exist? ', this.rep_does_exist)
    //       let samePath = path === this.$store.state.route.path
    //       if (!this.rep_does_exist && samePath) {
    //         console.log('timeout path: ', this.$store.state.route.path)
    //         console.log('ERROR: Unable to find this representative for your location. Redirecting back to /' + level)
    //         this.$router.push('/' + level)
    //       }
    //     }, 15000)
    //   }
    //   return true
    // },
    rep () {
      let data = this.$store.getters.getRepresentativePage
      this.rep_does_exist = !!data
      // console.log('rep()', this.rep_does_exist, data)
      return data
    },
    isFederal () {
      if (this.rep) {
        let position = this.rep.position
        return !!(position.indexOf('United States') >= 0 || position.indexOf('US') >= 0)
      }
    },
    isHeadOfGov () {
      return this.rep && this.rep.role && this.rep.role === 'headOfGovernment'
    }
  }
}
</script>
<style lang="scss">
.rep-page {
  .name {
    /*font-size: 18px;*/
    font-size: 22px;
    font-weight: bold;
  }

  .position {
    /*font-size: 16px;*/
    font-size: 18px;
    font-style: italic;
  }

  img {
    margin: 5px 0;
    max-width: 175px;
  }

  a { color: #000; }

  .social-media a,
  .websites a {
    font-size: 24px;
  }

  .no-info {
    margin-top: 30px;
  }

  .v-clip {
    margin-top: 15px;
  }
}
ul.social-media {
  display: inline-block;
  margin: 0;
  padding: 0;
  font-size: 0;
}
ul.social-media li {
  display: inline-block;
  margin: 0 4px;
  font-size: 18px;
}

.phones i {
  vertical-align: middle;
}
</style>
