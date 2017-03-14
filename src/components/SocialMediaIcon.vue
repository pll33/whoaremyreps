<template>
  <li><a v-bind:href="sm_href" v-bind:title="channel.type"><i v-bind:class="sm_class"></i></a></li>
</template>

<script>
export default {
  name: 'social-media-icon',
  props: ['channel'],
  data () {
    return {
      base_href: {
        'GooglePlus': 'https://plus.google.com/',
        'Facebook': 'https://facebook.com/',
        'Twitter': 'https://twitter.com/',
        'YouTube': 'https://youtube.com/user/',
        'Instagram': 'https://instagram.com/'
      },
      classes: {
        'GooglePlus': 'fa fa-google-plus-square',
        'Facebook': 'fa fa-facebook-square',
        'Twitter': 'fa fa-twitter-square',
        'YouTube': 'fa fa-youtube-square',
        'Instagram': 'fa fa-instagram'
      }
    }
  },
  computed: {
    sm_href () {
      return this.base_href[this.channel.type] + this.channel.id
    },
    sm_class () {
      return this.classes[this.channel.type]
    }
  }
}
</script>

<style lang="scss">
.social-media a:hover {
  i.fa-google-plus-square { color: #DD4B39; }
  i.fa-facebook-square { color: #3B5998; }
  i.fa-twitter-square { color: #55ACEE; }
  i.fa-youtube-square { color: #BB0000; }
  i.fa-instagram { color: #8A3AB9; }
}
</style>
