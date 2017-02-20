<template>
  <li><a v-bind:href="sm_href" v-bind:title="channel.type"><i v-bind:class="sm_class"></i></a></li>
</template>
<script>
export default {
  name: 'social-media-icon',
  props: ['channel'],
  data: function () {
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
        'Facebook': 'fa fa-facebook-official',
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
