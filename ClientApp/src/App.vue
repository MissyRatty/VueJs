<!-- This is an entry point component, it’s the main UI component in which all the other components will render -->
<!-- Every Vue component may contain a template, a script, and a style section.
1. The template is a visible content of the component
2. The script is a logic of the component
3. Style, you guessed it, is a style for a template -->
<template>
 <b-container>
    <layout/>
 </b-container>
</template>

<script>
import Layout from '@/Layout'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<!-- use scoped styling to prevent styling leaking into other elements. -->
<style>

</style>
