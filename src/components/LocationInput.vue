<template>
  <div class="locate-inputs">
    <button v-on:click="locate"><i class="fa fa-map-marker"></i></button>
    <span class="search-icon"><i class="fa" v-bind:class="iconType"></i></span>
    <input class="search-input" v-bind:class="{ error: locationInput.locateError }" v-on:keyup.enter="submit" type="text" v-bind:placeholder="locationInput.placeholder" v-model="locationInput.value" />
    <button v-on:click="search"><i class="fa fa-search"></i></button>
  </div>
</template>


<script>
// import { fetchGoogleCivicData, setUserLocation, setUserAddress } from '../store/actions'

export default {
  created: function () {
    this._retrieveLocalStorage()
  },
  methods: {
    _retrieveLocalStorage: function () {
      // get saved address from local storage (prevents extra api call)
      if (typeof window.localStorage !== 'undefined') {
        var storedData = JSON.parse(window.localStorage.getItem('__whoaremyreps__userData'))
        if (storedData && storedData.userAddress) {
          this.locationInput.value = storedData.userAddress
          this.locationInput.searchType = 'locate'

          // load civic data with stored address
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
      if (this.locationInput.locateError) this.locationInput.locateError = false
      var locationInput = this.locationInput
      console.log(pos, pos.coords)
      this.locationData.position = (pos) ? pos.coords : null
      this.locationInput.searchType = 'locate'

      // send user position request to server, server calls google geocoding api and responds w/ address
      // https://maps.googleapis.com/maps/api/geocode/json?latlng= &key=
      var latlng = pos.coords.latitude + ',' + pos.coords.longitude
      var apiCallUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyB-b-2YLj8k2M9sYXIamR6_ut5LdfwRgs4'

      this.$router.push('/')
      this.$http.get(apiCallUrl).then(function (response) {
        // success
        // console.log('success:', response)
        if (response && response.ok) {
          let results = response.body.results[0]
          if (results['formatted_address']) {
            var userAddress = results['formatted_address']
            locationInput.value = userAddress
            this._saveToLocalStorage(userAddress)
            this.$store.dispatch('fetchRepresentativesByAddress', { address: userAddress })
            // this.civicLookup(userAddress)
            // console.log('address: ', results['formatted_address'])
          }
        } else {
          locationInput.value = pos.coords.latitude + ', ' + pos.coords.longitude
        }
      }, function (response) {
        console.log('error:', response)
      })
    },
    submit: function () {
      this.locationInput.searchType = 'search'
    },
    locate: function () {
      navigator.geolocation.getCurrentPosition(this._locateSuccess, this._locateError)
      this.locationInput.placeholder = 'Loading address...'
    },
    search: function () {
    }
  },
  data: function () {
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
    iconType: function () {
      return {
        'fa-search': this.locationInput.searchType === 'search',
        'fa-location-arrow': this.locationInput.searchType === 'locate'
      }
    }
  }
}
</script>

<style lang="scss">
.start {
  .locate-inputs {
    transform: scale(1.25, 1.25);
  }
}

.locate-inputs {
  display: inline-block;

  input,
  button {
    font-size: 1em;
    border-radius: 15px;
    transition: border-color 0.2s ease;
  }

  input:focus,
  button:focus {
    border-color: #AAA;
  }
}

.locate-inputs input {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  vertical-align: bottom;
  padding: 0 15px 0 30px;
  border: 1px solid #AAA;
  outline: none;

  &.error {
    border-color: #ff7b7b;
  }

  &:focus {
    border-color: #666;
  }
}

.search-icon i.fa {
  z-index: 2;
  position: relative;

  &.fa-search {
    padding-left: 14px;
    margin-right: -30px;
  }

  &.fa-location-arrow {
    padding-left: 14px;
    margin-right: -28px;
  }
}

.locate-inputs button {
  height: 30px;
  width: 30px;
  margin-left: 3px;
  border: 1px solid #AAA;
  transition: border-color 0.2s ease;
  background: #e3e3e3;

  i.fa-search {

    vertical-align: top;
    font-size: 15px;
  }

  &:hover {
    border-color: #666;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #CCC;
  }
}

</style>