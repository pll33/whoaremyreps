<template>
  <div class="locate-inputs">
    <button v-on:click="locate"><i class="fa fa-map-marker"></i></button>
    <span class="search-icon"><i class="fa" v-bind:class="iconType"></i></span>
    <input class="search-input" v-bind:class="{ error: locationInput.locateError }" v-on:keyup.enter="submit" type="text" v-bind:placeholder="locationInput.placeholder" v-model="locationInput.value" />
    <button v-on:click="submit"><i class="fa fa-search"></i></button>
  </div>
</template>

<script>
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
    _getAbbreviation (addressComponents) {
      let addrComponents = addressComponents.filter(item => item.types.indexOf('administrative_area_level_1') > -1)
      return (addrComponents && addrComponents.length === 1) ? addrComponents[0].short_name : ''
    },
    _retrieveLocalStorage: function () {
      // get saved address from local storage
      let _store = this.$store
      if (typeof window.localStorage !== 'undefined') {
        let storedData = JSON.parse(window.localStorage.getItem('__whoaremyreps__userData'))
        if (storedData && storedData.address) {
          this.locationInput.value = storedData.address
          this.locationInput.searchType = 'stored'

          _store.dispatch('setUserInfo', {
            address: storedData.address,
            location: storedData.geolocation,
            abbreviation: storedData.abbreviation
          })

          _store.dispatch('fetchRepresentativesByAddress', {
            address: storedData.address,
            abbreviation: storedData.abbreviation
          })
        }
      }
    },
    _saveToLocalStorage: function (address, geolocation, abbreviation) {
      if (typeof window.localStorage !== 'undefined') {
        let timestamp = new Date().getTime()
        let dataObj = { address, geolocation, abbreviation, timestamp }
        window.localStorage.setItem('__whoaremyreps__userData', JSON.stringify(dataObj))
      }
    },
    _locateError: function (err) {
      if (err) {
        this.locationInput.locateError = true
        this.locationInput.placeholder = 'Your address'
        console.log('Geolocation error: ' + err)
      }
    },
    _locateSuccess: function (pos) {
      this.locationData.position = (pos) ? pos.coords : null
      this.locationInput.placeholder = 'Your address'
      this.locationInput.locateError = false
      this.locationInput.searchType = 'locate'

      let latlng = pos.coords.latitude + ',' + pos.coords.longitude
      let apiCallUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=AIzaSyB-b-2YLj8k2M9sYXIamR6_ut5LdfwRgs4'

      let _store = this.$store
      this.$http.get(apiCallUrl).then((response) => {
        if (response && response.ok) {
          if (response.body.results.length > 0) {
            let results = response.body.results[0]
            let userAddress = results['formatted_address']
            let abbreviation = this._getAbbreviation(results.address_components)

            this.locationInput.value = userAddress
            this._saveToLocalStorage(userAddress, latlng, abbreviation)
            _store.dispatch('setUserInfo', {
              address: userAddress,
              location: latlng,
              abbreviation
            })
            _store.dispatch('fetchRepresentativesByAddress', {
              address: userAddress,
              abbreviation
            })

            if (_store.state.route.path !== '/all') this.$router.push('/all')
          }
        } else {
          this.locationInput.value = pos.coords.latitude + ', ' + pos.coords.longitude
        }
      }, (error) => {
        console.log('Google Maps API error:', error)
      })
    },
    submit: function () {
      this.locationInput.locateError = false
      this.locationInput.searchType = 'search'

      let inAddress = encodeURIComponent(this.locationInput.value)
      let apiCallUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + inAddress + '&key=AIzaSyB-b-2YLj8k2M9sYXIamR6_ut5LdfwRgs4'
      let _store = this.$store
      this.$http.get(apiCallUrl).then((response) => {
        if (response && response.ok) {
          if (response.body.results.length > 0) {
            let results = response.body.results[0]
            let userAddress = results['formatted_address']
            let latlng = results.geometry.location.lat + ',' + results.geometry.location.lng // not as accurate as brower geolocation
            let abbreviation = this._getAbbreviation(results.address_components)

            this.locationInput.value = userAddress
            this._saveToLocalStorage(userAddress, latlng, abbreviation)
            _store.dispatch('setUserInfo', {
              address: userAddress,
              geolocation: latlng,
              abbreviation
            })
            _store.dispatch('fetchRepresentativesByAddress', {
              address: userAddress,
              abbreviation
            })

            if (_store.state.route.path !== '/all') this.$router.push('/all')
          }
        }
      }, (error) => {
        console.log('Google Maps API error:', error)
      })
    },
    locate: function () {
      navigator.geolocation.getCurrentPosition(this._locateSuccess, this._locateError)
      this.locationInput.locateError = false
      this.locationInput.searchType = 'locate'
      this.locationInput.placeholder = 'Loading address...'
      this.locationInput.value = ''
    }
  }
}
</script>

<style lang="scss">
$input-outline-color: #FFF;
$hover-border-color: #333;

.start {
  .locate-inputs {
    margin-top: 10px;
    transform: scale(1.25, 1.25);
  }
}

.locate-inputs {
  margin-top: 5px;

  input,
  button {
    font-size: 1em;
    border: 1px solid #DDD;
    border-radius: 15px;
    transition: border-color 0.6s ease;
  }

  input:focus,
  button:focus {
    border-color: $hover-border-color;
  }
}

.locate-inputs input {
  min-width: 20vw;
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
    padding-left: 16px;
  }

  &.fa-search {
    margin-right: -30px;
  }

  &.fa-location-arrow {
    margin-right: -28px;
  }

  &.fa-thumb-tack {
    margin-right: -28px;
  }
}

.locate-inputs button {
  height: 30px;
  width: 30px;
  margin-left: 3px;
  background: #FFF;
  transition: border-color 0.3s ease;
  cursor: pointer;

  i.fa-search {
    vertical-align: top;
    font-size: 15px;
  }

  &:hover {
    border-color: $hover-border-color;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background: #AAA;
  }
}
</style>
