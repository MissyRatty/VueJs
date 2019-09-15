<template>
<div role="tablist">
    <b-card no-body class="mb-1" role="tab" border-variant="info" href="#">
        <b-card-header header-tag="header" class="p-1">
            <b-row>
                <b-col md="4">
                </b-col>
                <b-col md="4" class="centerText">
                    <b-button variant="outline-success">
                       <router-link :to="{ name: 'CustomerCreate' }"> Add New Customer </router-link>
                   </b-button>
                </b-col>
                <b-col md="4">
                </b-col>
            </b-row>
        </b-card-header>
            <b-card-body>
                   <!-- put table here -->
                <div>
                    <b-row>
                        <b-col md="12">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover">
                                   <thead>
                                       <tr>
                                           <th>Customer</th>
                                           <th>Date Created</th>
                                           <th>Actions</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <!-- let's make a new component which will render a data of single customer inside <tr> tag for the CustomerList's table -->
                                       <!-- do this because it’s a good practice to have smaller components that we can reuse in other components -->
                                       <!-- listen to events with @nameOfEvent and that event can reside in the native HTML tags as well as in the custom components. -->
                                       <!--  to listen on native JavaScript events on custom components, we need to use the .native modifier,
                                        to tell Vue.js to listen on native events and not on custom events. -->
                                        <!-- now, we can listen to our custom events (view, edit and remove which we created on the child component (customer-list-row)) -->
                                       <customer-list-row
                                          v-for="customer in customers"
                                          :key="customer.id"
                                          :customer="customer"
                                          @view="viewCustomer"
                                          @edit="editCustomer"
                                          @remove="removeCustomer"
                                          @click.native="onCustomerRowClicked(customer.id)"/>
                                   </tbody>
                                </table>
                            </div>
                        </b-col>
                    </b-row>
                    <!-- adding two pop ups (modals), one to show delete confirmation message for user to click ok or cancel to a delete request -->
                    <!-- 2nd modal will display whatever response we get back from the Web API on the staus of the delete request,
                    i.e: completed with no errors, or couldn't complete cause an error or some errors happened -->
                    <!-- using refs for the modals, will be a form of identification just as how we do document.getElementById in vanilla JS,
                    we can use ref values to get any custom Vuejs Component -->
                    <b-modal centered
                        ref="removeConfirmModal"
                        title="Confirm Delete"
                        @ok="onRemoveConfirm"
                        @hide="onRemoveModalHide">
                        <p class="my-4">Are you sure you want to delete this customer ?</p>
                    </b-modal>

                    <b-modal centered
                        ref="alertModal"
                        :title="alertModalTitle"
                        :ok-only="true">
                          <p class="my-4"> {{ alertModalContent }}</p>
                        </b-modal>
                </div>
            </b-card-body>
    </b-card>
</div>

</template>

<script>
// lets import the customr.service js files in this customer list view.
import CustomerService from '@/api-services/customer.service'

// import the child view (customerlistrow) into this parent view (customerlist)
import CustomerListRow from '@/components/customer/CustomerListRow'

export default {
  name: 'CustomerList',
  // inform Vue.js that we want to use the OwnerListRow inside of this CustomerList Component
  // we do that by specifying a components name inside the components JSON Object
  // we can specify our custom html element tag name ('custom-list-row')
  // if you don't specify one, Vuejs would create one for you using the name of the child component
  components: {
    'customer-list-row': CustomerListRow
  },
  data () {
    return {
      customers: [],
      selectedCustomerId: null,
      alertModalTitle: '',
      alertModalContent: ''
    }
  },
  // created() function is a part of the Vue.js component lifecycle.
  // It is going to be executed once the component is instantiated and all the data is set but the component’s mounting stage is still not started.
  // We are using that hook just to verify if our CustomerService is working
  // so basically, this created event is triggered before the page is rendered or loaded in the browser
  created () {
    this.fetchCustomers()
  },
  methods: {
    // We can access the route (url) parameters in our components through the this.$router.currentRoute.params object
    onCustomerRowClicked (customerId) {
      console.log('customerId is => ' + customerId)
    },
    fetchCustomers () {
      CustomerService.getAllCustomers().then((response) => {
        this.customers = response.data
      }).catch((error) => {
        console.log(error.response.data)
      })
    },
    viewCustomer (customerId) {
      this.$router.push({ name: 'CustomerDetails', params: { id: customerId } })
      console.log('View CustomerId is => ' + customerId)
    },
    editCustomer (customerId) {
      this.$router.push({ name: 'CustomerEdit', params: { id: customerId } })
      console.log('Edit customerId is => ' + customerId)
    },
    removeCustomer (customerId) {
      this.selectedCustomerId = customerId
      this.$refs.removeConfirmModal.show()
      console.log('Remove customerId is => ' + customerId)
    },
    onRemoveConfirm () {
      CustomerService.deleteCustomer(this.selectedCustomerId).then(() => {
        // when delete is successful, set the modal title and content with good stuff :)
        this.alertModalTitle = 'Successfully'
        this.alertModalContent = 'Succcesfully deleted customer'
        this.$refs.alertModal.show()
        // refresh customer data by fetching from Web API again so data is up to date.
        this.fetchCustomers()
      }).catch((error) => {
        this.alertModalTitle = 'Error'
        this.alertModalContent = error.response.data
        this.$refs.alertModal.show()
      })
    },
    onRemoveModalHide () {
      this.selectedCustomerId = null
    }
  }
}
</script>

<style scoped>
.centerText, td, th{
    text-align: center;
}
</style>
