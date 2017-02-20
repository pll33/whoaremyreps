<template>
  <div class="representative-page" v-once v-if="rep">
    <!-- <img width="100" v-bind:src="rep.photoUrl" style="float:left;"> -->
    <party-affiliation-marker :party="rep.party" :display_bool="false"></party-affiliation-marker>
    <span class="name" style="font-size: 18px; font-weight: bold"> {{ rep.name }}<br></span>
    <span class="position" style="font-size:16px; font-style: italic">{{ rep.position }}<br></span>
    <div class="address">
      <span>{{rep.address[0].line1}}<br></span>
      <span v-if="rep.address[0].line2">{{rep.address[0].line2}}<br></span>
      <span>{{rep.address[0].city}}, {{rep.address[0].state}} {{rep.address[0].zip}}</span>
    </div>
    <div>
      <ul class="social-media">
        <social-media-icon v-for="channel in sm_channels" :channel="channel"></social-media-icon>
      </ul>
      <span class="websites" v-for="site in rep.urls">
        <a v-bind:href="site"><i class="fa fa-external-link-square"></i></a>
      </span>
    </div>
    <div class="phones" v-for="num in rep.phones">
      <span><i class="fa fa-phone"></i>: {{ num }}</span>
    </div>
    <button><i class="fa fa-address-card-o"></i> Save contact info</button>
  </div>
</template>

<script>
// TO-DO left/right arrow button-down goes to previous/next representatives
import PartyAffiliationMarker from '../components/PartyAffiliationMarker'
import SocialMediaIcon from '../components/SocialMediaIcon'

export default {
  name: 'representative-page',
  components: {
    PartyAffiliationMarker, SocialMediaIcon
  },
  computed: {
    rep () {
      return this.$store.getters.getRepresentativePage()
    },
    sm_channels () { /* rearrange social media icons */
      let channels = this.$store.getters.getRepresentativeSocialMedia()
      if (channels && channels[0].type === 'GooglePlus') {
        return channels.concat(channels.splice(0, 1))
      } else {
        return channels
      }
    },
    vcard () {
    }
  }
}
</script>

<style lang="scss">
.representative-page {
  margin: 25px 0;

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
</style>