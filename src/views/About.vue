<template>
  <div class="container">
    <h2>About</h2>

    <p>WhoAreMyReps.com is a resource that shows your elected officials at all levels of U.S. government.</p>
    <p>Information regarding legislative or executive actions can be found on specific pages marked with an info icon <i class="fa fa-info-circle" style="color:#444;"></i>.</p>
    <p>Representative data comes from a number of APIs: <br><a href="https://developers.google.com/civic-information/" target="_blank" rel="noopener">Google Civic Information</a>, <a href="https://sunlightlabs.github.io/congress/" target="_blank" rel="noopener">Sunlight Congress</a>, <a href="https://propublica.github.io/congress-api-docs/" target="_blank" rel="noopener">ProPublica Congress</a>, <a href="http://docs.openstates.org/en/latest/api/" target="_blank" rel="noopener">OpenStates</a>, and <a href="https://www.federalregister.gov/reader-aids/developer-resources/rest-api" target="_blank" rel="noopener">Federal Register</a>.</p>
    <p>Questions or concerns? Let us know at <a href="mailto:hello@whoaremyreps.com">hello@whoaremyreps.com</a>.</p>
    <p>If you encounter any mistakes or errors, please email <a href="mailto:errors@whoaremyreps.com">errors@whoaremyreps.com</a>.</p>

    <icon-legend></icon-legend>

    <div style="margin-top: 25px;">
      <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwhoaremyreps.com&width=96&layout=button&action=like&size=small&show_faces=false&share=true&height=65&appId" width="96" height="25" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
      <iframe src="https://platform.twitter.com/widgets/tweet_button.html?size=s&url=https%3A%2F%2Fwhoaremyreps.com&hashtags=whoaremyreps%2Cfindmyreps" width="76" height="25" title="Twitter Tweet Button" style="border: 0; overflow: hidden;"></iframe>
    </div>
  </div>
</template>
<script>
import IconLegend from '../views/IconLegend'

export default {
  name: 'home',
  components: { IconLegend }
}
</script>
