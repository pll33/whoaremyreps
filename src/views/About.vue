<template>
  <div class="container">
    <h2>About</h2>
    <p>WhoAreMyReps.com is a resource that displays the elected government officials who represent you from the federal level down to the state and local levels. Additional information regarding legislative or executive actions can be found on specific pages marked with an info icon <i class="fa fa-info-circle" style="color:#444;"></i>.</p>
    <p>Representative data comes from a number of APIs: <a href="https://developers.google.com/civic-information/" target="_blank" rel="noopener">Google Civic Information</a>, <a href="https://sunlightlabs.github.io/congress/" target="_blank" rel="noopener">Sunlight Congress</a>, <a href="http://docs.openstates.org/en/latest/api/" target="_blank" rel="noopener">OpenStates</a>, and <a href="https://www.federalregister.gov/reader-aids/developer-resources/rest-api" target="_blank" rel="noopener">Federal Register</a>.</p>
    <p>To ensure the information presented here remains nonpartisan and objective, this site will never have ads. Ever.</p>
    <p>Questions or concerns? Let us know at <a href="mailto:info@whoaremyreps.com">info@whoaremyreps.com</a></p>
    <p>If you encounter any mistakes or errors, please contact us at <a href="mailto:errors@whoaremyreps.com">errors@whoaremyreps.com</a></p>
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
