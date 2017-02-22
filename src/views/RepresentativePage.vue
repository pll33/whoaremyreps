<template>
  <div class="representative-page">
    <div v-if="rep" v-once>
      <party-affiliation-marker :party="rep.party" :display_bool="false"></party-affiliation-marker>
      <span class="name" style="font-size: 18px; font-weight: bold"> {{ rep.name }}<br></span>
      <span class="position" style="font-size:16px; font-style: italic">{{ rep.position }}<br></span>
      <img v-bind:src="rep.photoUrl">
      <div class="address">
        <span>{{rep.address[0].line1}}<br></span>
        <span v-if="rep.address[0].line2">{{rep.address[0].line2}}<br></span>
        <span>{{rep.address[0].city}}, {{rep.address[0].state}} {{rep.address[0].zip}}</span>
      </div>
      <div>
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
      <button><i class="fa fa-address-card-o"></i> Save contact info to phone</button>
      <button><i class="fa fa-pencil-square-o"></i> Email contact info</button>
      <div v-if="">
      </div>
    </div>
    <div v-else>
      <clip-loader v-if="rep_exists" :loading="loading" :color="loader.color" :size="loader.size"></clip-loader>
    </div>
  </div>
</template>

<script>
// TO-DO: left/right arrow button-down goes to previous/next representatives
// TO-DO: if "United States Senate" or contains "United States House of Representatives", pull up list of congressional bills
// if "PA State Senate" or "PA State House"
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import PartyAffiliationMarker from '../components/PartyAffiliationMarker'
import SocialMediaIcon from '../components/SocialMediaIcon'
import vCard from '../components/vCard'

export default {
  name: 'representative-page',
  components: {
    ClipLoader, PartyAffiliationMarker, SocialMediaIcon, vCard
  },
  data: function () {
    return {
      rep_check: false,
      loader: {
        color: '#2C3E50'
      }
    }
  },
  computed: {
    rep_exists () {
      let level = this.$store.state.route.params.level
      let path = this.$store.state.route.path
      if (!this.rep && !this.rep_check) {
        this.rep_check = true
        setTimeout(() => {
          let rep = this.$store.getters.getRepresentativePage
          let samePath = path === this.$store.state.route.path
          if (!rep && samePath) {
            console.log('ERROR: Unable to find this representative for your location. Redirecting back to /' + level)
            this.$router.push('/' + level)
          }
        }, 10000)
      }
      return true
    },
    rep () {
      return this.$store.getters.getRepresentativePage
    },
    vcard () {
    }
  }
}
</script>

<style lang="scss">
.representative-page {
  img {
    margin: 5px 0;
    max-width: 175px;
  }

  .address { 
    font-size: 14px;
  }

  .social-media a,
  .websites a {
    font-size: 24px;
    color: #000;
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