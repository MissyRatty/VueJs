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
  name: 'Layout',
  components: {
    Navbar
  }
}
</script>
