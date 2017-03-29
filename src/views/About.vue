<template>
  <div class="container">
    <h2>About</h2>

    <p>WhoAreMyReps.com is a resource that identifies your U.S. elected government officials at all levels of government.</p>
    <p>Information regarding legislative or executive actions can be found on specific pages marked with an info icon <i class="fa fa-info-circle" style="color:#444;"></i>.</p>
    <p>Representative data comes from a number of APIs: <br><a href="https://developers.google.com/civic-information/" target="_blank" rel="noopener">Google Civic Information</a>, <a href="https://sunlightlabs.github.io/congress/" target="_blank" rel="noopener">Sunlight Congress</a>, <a href="https://propublica.github.io/congress-api-docs/" target="_blank" rel="noopener">ProPublica Congress</a>, <a href="http://docs.openstates.org/en/latest/api/" target="_blank" rel="noopener">OpenStates</a>, and <a href="https://www.federalregister.gov/reader-aids/developer-resources/rest-api" target="_blank" rel="noopener">Federal Register</a>.</p>
    <p>Questions or concerns? Let us know at <a href="mailto:hello@whoaremyreps.com">hello@whoaremyreps.com</a>.</p>
    <p>If you encounter any mistakes or errors, please contact us at <a href="mailto:errors@whoaremyreps.com">errors@whoaremyreps.com</a>.</p>
    <icon-legend></icon-legend>
  </div>
</template>
<script>
import IconLegend from '../views/IconLegend'

export default {
  name: 'home',
  components: { IconLegend }
}
</script>
