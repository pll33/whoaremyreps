<template>
  <div class="locate-inputs">
    <button v-on:click="locate"><i class="fa fa-map-marker"></i></button>
    <span class="search-icon"><i class="fa" v-bind:class="iconType"></i></span>
    <input class="search-input" v-bind:class="{ error: locationInput.locateError }" v-on:keyup.enter="submit" type="text" v-bind:placeholder="locationInput.placeholder" v-model="locationInput.value" />
    <button v-on:click="submit"><i class="fa fa-search"></i></button>
  </div>
</template>


<script>
// import { fetchGoogleCivicData, setUserLocation, setUserAddress } from '../store/actions'

export default {
  created () {
    this._retrieveLocalStorage()
  },
  data () {
    return {
      locationInput: {
        placeholder: 'Your address',
        locateError: false,
        searchType: 'search',
        value: ''
      },
      locationData: {}
    }
  },
  computed: {
    iconType () {
      let searchType = this.locationInput.searchType
      switch (searchType) {
        case 'search':
          return 'fa-search'
        case 'locate':
          return 'fa-location-arrow'
        case 'stored':
          return 'fa-thumb-tack'
      }
    }
  },
  methods: {
    _retrieveLocalStorage: function () {
      // get saved address from local storage (avoid extra GMAPS api call)
      if (typeof window.localStorage !== 'undefined') {
        var storedData = JSON.parse(window.localStorage.getItem('__whoaremyreps__userData'))
        if (storedData && storedData.userAddress) {
          this.locationInput.value = storedData.userAddress
          this.locationInput.searchType = 'stored'

          // load civic data with stored address
          this.$store.dispatch('setUserAddress', { address: storedData.userAddress })
          this.$store.dispatch('fetchRepresentativesByAddress', { address: storedData.userAddress })
        }
      }
    },
    _saveToLocalStorage: function (item) {
      if (typeof window.localStorage !== 'undefined') {
        var timestamp = new Date().getTime()
        var dataObj = { userAddress: item, timestamp }
        window.localStorage.setItem('__whoaremyreps__userData', JSON.stringify(dataObj))
      }
    },
    _locateError: function (err) {
      if (err) {
        this.locationInput.locateError = true
        this.locationInput.placeholder = 'Your address'
      }
    },
    _locateSuccess: function (pos) {
      console.log(pos, pos.coords)
      this.locationData.position = (pos) ? pos.coords : null
      this.locationInput.locateError = false
      this.locationInput.searchType = 'locate'

      // send user position request to server, server calls google geocoding api and responds w/ address
      // https://maps.googleapis.com/maps/api/geocode/json?latlng= &key=
      var latlng = pos.coords.latitude + ',' + pos.coords.longitude
      var apiCallUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyB-b-2YLj8k2M9sYXIamR6_ut5LdfwRgs4'

      this.$http.get(apiCallUrl).then(function (response) {
        if (response && response.ok) {
          let results = response.body.results[0]
          if (results['formatted_address']) {
            var userAddress = results['formatted_address']
            this.locationInput.value = userAddress
            this._saveToLocalStorage(userAddress)
            this.$store.dispatch('setUserLocation', { location: results })
            this.$store.dispatch('setUserAddress', { address: userAddress })
            this.$store.dispatch('fetchRepresentativesByAddress', { address: userAddress })
          }
        } else {
          this.locationInput.value = pos.coords.latitude + ', ' + pos.coords.longitude
        }
      }, function (response) {
        console.log('GMAPS error:', response)
      })
    },
    submit: function () {
      let inputAddress = this.locationInput.value
      this.locationInput.locateError = false
      this.locationInput.searchType = 'search'
      this._saveToLocalStorage(inputAddress)
      this.$store.dispatch('setUserAddress', { address: inputAddress })
      this.$store.dispatch('fetchRepresentativesByAddress', { address: inputAddress })
    },
    locate: function () {
      navigator.geolocation.getCurrentPosition(this._locateSuccess, this._locateError)
      this.locationInput.placeholder = 'Loading address...'
      this.locationInput.value = ''
    }
  }
}
</script>

<style lang="scss">
$input-outline-color: #FFF;

.start {
  .locate-inputs {
    margin-top: 10px;
    transform: scale(1.25, 1.25);
  }
}

.locate-inputs {
  display: inline-block;
  margin-top: 5px;

  input,
  button {
    font-size: 1em;
    border: 1px solid #FFF;
    border-radius: 15px;
    transition: border-color 0.6s ease;
  }

  input:focus,
  button:focus {
    border-color: #333;
  }
}

.locate-inputs input {
  height: 30px;
  box-sizing: border-box;
  vertical-align: bottom;
  padding: 0 15px 0 30px;
  outline: none;

  &.error {
    border-color: #ff7c75;
  }
}

.locate-inputs .search-icon i.fa {
  z-index: 2;
  position: relative;
  color: black;

  &.fa {
    line-height: 30px;
  }

  &.fa-search {
    padding-left: 14px;
    margin-right: -30px;
  }

  &.fa-location-arrow {
    padding-left: 14px;
    margin-right: -28px;
  }

  &.fa-thumb-tack {
    padding-left: 14px;
    margin-right: -28px;
  }
}

.locate-inputs button {
  height: 30px;
  width: 30px;
  margin-left: 3px;
  transition: border-color 0.2s ease;
  background: #FFF;

  i.fa-search {
    vertical-align: top;
    font-size: 15px;
  }

  &:hover {
    border-color: #000;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #DDD;
  }
}
</style>
