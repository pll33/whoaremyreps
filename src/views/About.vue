<template>
  <div class="container">
    <h2>About</h2>
    <p>WhoAreMyReps is a resource that displays your elected government officials from the federal level down to the state and local levels. Additional information regarding legislative or executive actions can be found on specific pages marked with an info icon <i class="fa fa-info-circle" style="color:#444;"></i>.</p>
    <p>Representative data comes from a number of APIs: Google Civic Information, Sunlight Foundation, OpenStates, and Federal Register.</p>
    <p>To ensure the information presented here remains nonpartisan and objective, this site will never have ads. Ever.</p>
    <p>Questions or concerns? Let us know at <a href="mailto:info@whoaremyreps.com">info@whoaremyreps.com</a><br>If you encounter any mistakes or errors, please contact us at <a href="mailto:errors@whoaremyreps.com">errors@whoaremyreps.com</a></p>
    <p>Links: <router-link to="/legend">Icon info</router-link>, <router-link to="/resources">Resources</router-link></p>
  </div>
</template>
<script>
export default {
  name: 'home'
}
</script>
