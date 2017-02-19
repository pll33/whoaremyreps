<template>
  <div class="representative-page" style="margin-bottom: 10px">
    <!-- .representative bind additional class for democrat/republican/party affiliation-->
    <!-- <img width="100" v-bind:src="rep.photoUrl" style="float:left;"> -->
    <party-affiliation-marker :party="party"></party-affiliation-marker>
    <span class="position" style="font-size:18px; font-style: italic">{{ rep.position }}<br></span>
    <span class="name" style="font-size: 16px; font-weight: bold">{{ rep.name }} ({{ rep.party }})</span>
    <div class="address">
      {{rep.address[0].line1}}<br>
      <span v-if="rep.address[0].line">{{rep.address[0].line2}}<br></span>
      {{rep.address[0].city}}, {{rep.address[0].state}} {{rep.address[0].zip}}
    </div>
    <div>
      <span class="social-media" v-for="channel in rep.channels">
        <span v-if="channel.type === 'GooglePlus'"><a v-bind:href="'https://plus.google.com/' + channel.id"><i clasfa-google-plus-square"></i></a></span>
        <span v-if="channel.type === 'Facebook'"><a v-bind:href="'https://facebook.com/' + channel.id"><i clasfa-facebook-official"></i></a></span>
        <span v-if="channel.type === 'Twitter'"><a v-bind:href="'https://twitter.com/' + channel.id"><i clasfa-twitter-square"></i></a></span>
        <span v-if="channel.type === 'YouTube'"><a v-bind:href="'https://youtube.com/user/' + channel.id"><i clasfa-youtube-square"></i></a></span>
      </span>
      <span class="websites" v-for="site in rep.urls">
        <span><a v-bind:href="site"><i class="fa fa-external-link-square"></i></a></span>
      </span>
      <div class="phones" v-for="num in rep.phones">
        <span><i class="fa fa-phone"></i>: {{ num }}</span>
      </div>
    </div>
    <button><i class="fa fa-address-card-o"></i> Save contact info</button>
  </div>
</template>


<script>
import PartyAffiliationMarker from '../components/PartyAffiliationMarker'

export default {
  components: {
    PartyAffiliationMarker
  },
  props: ['rep'],
  data: function () {
    return {
      party: ''
    }
  }
}
</script>


<style type="text/css">

</style>