<template>
  <div>
    <div class="rep-page" v-if="rep" v-once>
      <div class="rep-name">
        <party-affiliation-marker :party="rep.party"></party-affiliation-marker>
        <span class="name"> {{ rep.name }}<br></span>
        <span class="position">{{ rep.position }}<br></span>
      </div>
      <div class="rep-info">
        <div class="rep-main">
          <span v-if="rep.photoUrl"><img v-bind:src="rep.photoUrl"></span>
          <div class="address" v-if="rep.address">
            <div v-if="rep.address[0].city">
              <span>{{rep.address[0].line1}}<br></span>
              <span v-if="rep.address[0].line2">{{rep.address[0].line2}}<br></span>
              <span>{{rep.address[0].city}}, {{rep.address[0].state}} {{rep.address[0].zip}}</span>
            </div>
            <div v-else>
              <span>{{rep.address[0].line1}}<br></span>
              <span v-if="rep.address[0].line2">{{rep.address[0].line2}}<br></span>
              <span>{{rep.address[0].state}} {{rep.address[0].zip}}</span>
            </div>
          </div>
          <div v-if="rep.channels">
            <ul class="social-media">
              <social-media-icon v-for="channel in rep.channels" :channel="channel"></social-media-icon>
            </ul>
            <span class="websites" v-for="site in rep.urls">
              <a v-bind:href="site" title="Website" target="_blank" rel="noopener"><i class="fa fa-external-link-square"></i></a>
            </span>
          </div>
          <div class="phones" v-for="num in rep.phones">
            <span><i class="fa fa-phone"></i> {{ num }}</span>
          </div>
        </div>
        <div class="rep-detail" v-if="rep.hasInfo">
          <keep-alive>
            <president-info v-if="isHeadOfGov && isFederal" :slug="rep.slug"></president-info>
            <governor-info v-else-if="isHeadOfGov && !isFederal" :slug="rep.slug"></governor-info>
            <legislator-info-federal v-else-if="isFederal"
              :slug="rep.slug" :role="rep.role" :name="rep.name" :party="rep.party" :ocd="rep.ocd_id">
            </legislator-info-federal>
            <legislator-info-state v-else-if="!isFederal"
              :slug="rep.slug" :role="rep.role" :name="rep.name" :party="rep.party"></legislator-info-state>
          </keep-alive>
        </div>
        <div class="no-info" v-if="!rep.address && !rep.channels">No contact information available.</div>
      </div>
    </div>
    <div class="text-center" v-else>
      <h2>Representative Not Found</h2>
      <router-link to="/all">Back to All</router-link>
    </div>
  </div>
</template>
<script>
import PartyAffiliationMarker from '../components/PartyAffiliationMarker'
import SocialMediaIcon from '../components/SocialMediaIcon'
import PresidentInfo from './PresidentInfo'
import GovernorInfo from './GovernorInfo'
import LegislatorInfoFederal from './LegislatorInfoFederal'
import LegislatorInfoState from './LegislatorInfoState'

export default {
  name: 'representative-page',
  components: {
    PartyAffiliationMarker,
    SocialMediaIcon,
    PresidentInfo,
    GovernorInfo,
    LegislatorInfoFederal,
    LegislatorInfoState
  },
  computed: {
    rep () {
      return this.$store.getters.getRepresentativePage
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
  .rep-name {
    text-align: center;
  }

  .name {
    font-size: 22px;
    font-weight: bold;
  }

  .position {
    font-size: 18px;
    font-style: italic;
  }

  .social-media a,
  .websites a {
    font-size: 32px;
    text-decoration: none;
  }

  img {
    margin: 5px 0;
    max-width: 175px;
  }

  a { color: #000; }

  .no-info {
    margin-top: 30px;
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
  margin: 0 2px;
  font-size: 18px;

  &:last-child {
    margin-right: 0;
  }
}

.websites a:hover {
  i.fa-external-link-square { color: #657EAC; }
}

.rep-main {
  text-align: center;
}

.rep-detail {
  width: 80%;
  margin: 0 auto;

  .info-section ul {
    margin: 0.5em 0;
  }

  .info-loading p {
    font-size: 18px;
    text-align: center;
    font-style: italic;
    margin-bottom: 0;
  }

  .info-error {
    text-align: center;
  }

  table {
    th {
      background: #fff;
      border-bottom: 2px solid #777;
    }

    tr:nth-child(odd) {
      background: #eee;
    }

    th, td {
      padding: 4px 8px;
    }
  }

  .tr-more-info {
    background-color: #f7f7f7;
    font-style: italic;
  }

  table.td-left-2 tr {
    th:not(:nth-child(2)),
    td:not(:nth-child(2)) {
      text-align: center;
    }

    th:nth-child(2),
    td:nth-child(2) {
      text-align: left;
    }
  }

  table.td-left-3 {
    th:not(:nth-child(3)),
    td:not(:nth-child(3)) {
      text-align: center;
    }

    th:nth-child(3),
    td:nth-child(3) {
      text-align: left;
    }
  }
}

@media screen and (max-width: 640px) {
  .rep-detail { width: 90%; }

  .info-section h3 {
    margin: 1.25em 0 0.25em;
  }

  .info-section p {
    font-size: 14px;
  }

  .info-section table {
    font-size: 12px;

    .small-text {
      font-size: 11px;
    }
  }

  .executive-info {
    padding-top: 20px;
  }

  table.td-sm-hide-2 {
    th:nth-child(2),
    td:nth-child(2) {
      display: none;
    }
  }

  table.td-sm-hide-4 {
    th:nth-child(4),
    td:nth-child(4) {
      display: none;
    }
  }
}

@media screen and (min-width: 641px) {
  .info-section h3 {
    margin: 1.25em 0 0.5em;
  }

  .info-section table {
    font-size: 14px;

    .small-text {
      font-size: 13px;
    }
  }
}

@media print {
  .rep-main img { display: none; }
  .rep-main .address { margin: 10px 0; }
  .rep-detail { width: 95%; }
  .legislator-info table { page-break-after: always; }
  .rep-detail table { 
    border-collapse: collapse;

    tr {
      border: 1px solid black;
    }
  }
  .rep-detail table a { text-decoration: none }
}
</style>
