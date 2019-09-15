<template>
<div class="homeJumbotron">
  <b-jumbotron container-fluid:true>
       <template v-slot:lead>
           This is a simple proof-of-concept for doing CRUD with Vue js.
       </template>
       <hr class="my-4"/>
       <p>The next stage is linking a login screen to this. Tried it but getting "routing" errors.</p>
    </b-jumbotron>
</div>

</template>

<script>
// Just to test that Axios calls work, lets import the customr.service js files in this Home view.
import CustomerService from '@/api-services/customer.service'

export default {
  name: 'Home',
  // created() function is a part of the Vue.js component lifecycle.
  // It is going to be executed once the component is instantiated and all the data is set but the component’s mounting stage is still not started.
  // We are using that hook just to verify if our CustomerService is working
  // so basically, this created event is triggered before the page is rendered or loaded in the browser
  created () {
    CustomerService.getAllCustomers().then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
}
</script>

<style scoped>
.homeJumbotron{
  position: relative;
  top: 15px;
  text-shadow: 1px 1px 1px gray;
}
</style>
