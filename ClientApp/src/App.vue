<!-- This is an entry point component, it’s the main UI component in which all the other components will render -->
<!-- Every Vue component may contain a template, a script, and a style section.
1. The template is a visible content of the component
2. The script is a logic of the component
3. Style, you guessed it, is a style for a template -->
<template>
 <b-container>
  <b-row>
    <b-col>
      <navbar/>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <router-view/>
    </b-col>
  </b-row>
 </b-container>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<!-- use scoped styling to prevent styling leaking into other elements. -->
<style>

</style>
