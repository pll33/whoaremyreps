<template>
  <div class="locate-inputs">
    <button v-on:click="locate" type="button"><i class="fa fa-map-marker"></i></button>
    <span class="search-icon"><i class="fa" v-bind:class="iconClass"></i></span>
    <input class="search-input" v-bind:class="{ error: locationInput.locateError }" v-on:keyup.enter="submit" type="text" v-bind:placeholder="locationInput.placeholder" v-model="locationInput.value" />
    <button v-on:click="submit" type="submit"><i class="fa fa-search"></i></button>
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
        placeholder: 'Your address (USA only)',
        locateError: false,
        icon: 'search',
        value: ''
      },
      locationData: {
        abbreviation: '',
        address: '',
        geo: ''
      }
    }
  },
  computed: {
    iconClass () {
      let icon = this.locationInput.icon
      switch (icon) {
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
    _retrieveLocalStorage () {
      // get saved address from local storage
      if (typeof window.localStorage !== 'undefined') {
        let storedData = JSON.parse(window.localStorage.getItem('__whoaremyreps__userData'))
        if (storedData && storedData.address) {
          this.locationInput.value = storedData.address
          this.locationInput.icon = 'stored'

          let encodedAddress = encodeURIComponent(storedData.address)
          this.$http.get('/api/reps?address=' + encodedAddress)
            .then((response) => {
              if (response && response.ok) {
                this.locationData = response.body.location
                this.$store.dispatch('setData', response.body.data)
              }
            }, (error) => {
              console.log('Error looking up address from localStorage (' + storedData.address + ') - ', error.body.message)
              this._setInputError(error.body.message)
            })
        }
      }
    },
    _saveToLocalStorage (address) {
      if (typeof window.localStorage !== 'undefined') {
        let timestamp = new Date().getTime()
        let dataObj = { address, timestamp }
        window.localStorage.setItem('__whoaremyreps__userData', JSON.stringify(dataObj))
      }
    },
    _locateError (err) {
      if (err) {
        this.locationInput.locateError = true
        this.locationInput.placeholder = 'Geolocation error. Please enter your address. (USA only)'
        console.log('Geolocation error: ', JSON.stringify(err))
      }
    },
    _locateSuccess (position) {
      this._resetInputError()
      this.locationInput.icon = 'locate'

      let latlng = position.coords.latitude + ',' + position.coords.longitude
      let encodedGeo = encodeURIComponent(latlng)
      this.locationData.geo = latlng

      this.$http.get('/api/reps?geo=' + encodedGeo)
        .then((response) => {
          if (response && response.ok) {
            let location = response.body.location
            this.locationInput.value = location.address
            this.locationData = location
            this._saveToLocalStorage(location.address)
            this.$store.dispatch('setData', response.body.data)

            if (this.$store.state.route.path !== '/all') this.$router.push('/all')
          }
        }, (error) => {
          console.log('Error looking up geolocation (' + latlng + ') - ', error.body.message)
          this._setInputError(error.body.message)
        })
    },
    _setInputError (errorMessage) {
      this.locationInput.locateError = true
      this.locationInput.placeholder = 'Error: ' + errorMessage
      this.locationInput.value = ''
    },
    _resetInputError () {
      this.locationInput.locateError = false
      this.locationInput.placeholder = 'Your address (USA only)'
    },
    submit () {
      this._resetInputError()
      this.locationInput.icon = 'search'

      let address = this.locationInput.value
      let encodedAddress = encodeURIComponent(address)

      this.$http.get('/api/reps?address=' + encodedAddress)
        .then((response) => {
          if (response && response.ok) {
            let location = response.body.location
            this.locationInput.value = location.address
            this.locationData = location
            this._saveToLocalStorage(location.address)
            this.$store.dispatch('setData', response.body.data)

            if (this.$store.state.route.path !== '/all') this.$router.push('/all')
          }
        }, (error) => {
          console.log('Error looking up address (' + address + ') - ', error.body.message)
          this._setInputError(error.body.message)
        })
    },
    locate () {
      navigator.geolocation.getCurrentPosition(this._locateSuccess, this._locateError)
      this.locationInput.locateError = false
      this.locationInput.placeholder = 'Loading address...'
      this.locationInput.icon = 'locate'
      this.locationInput.value = ''
    }
  }
}
</script>

<style lang="scss">
$input-outline-color: #FFF;
$hover-border-color: #333;
$error-border-color: #ef8b80;

.start .locate-inputs {
    margin-top: 10px;
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
  min-width: 25vw;
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
    padding-left: 14px;
  }

  &.fa-search,
  &.fa-location-arrow,
  &.fa-thumb-tack {
    margin-right: -31px;
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

@media screen and (min-width: 641px) {
  .start .locate-inputs {
    transform: scale(1.25, 1.25);
  }
}
</style>
