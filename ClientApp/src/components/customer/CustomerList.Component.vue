<template>
<div role="tablist">
    <b-card no-body class="mb-1" role="tab" border-variant="info" href="#" v-b-toggle.grid>
        <b-card-header header-tag="header" class="p-1">
            <b-row>
                <b-col md="4">
                </b-col>
                <b-col md="4" class="centerText">
                    <b-button variant="outline-success">
                       Add New Customer
                   </b-button>
                </b-col>
                <b-col md="4">
                </b-col>
            </b-row>
        </b-card-header>

        <b-collapse id="grid" visible role="tabpanel">
            <b-card-body>
                   <!-- put table here -->
                <div>
                    <b-row>
                        <b-col md="12">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover">
                                   <thead>
                                       <tr>
                                           <th>Full Name</th>
                                           <th>Created At</th>
                                           <th>Actions</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr
                                         v-for="customer in customers"
                                         :key="customer.id">
                                         <td>{{ customer.customerName }}</td>
                                         <td>{{ customer.customerCreatedDateTime }}</td>
                                         <td>
                                            <b-button-group>
                                                <b-button variant="outline-primary">View</b-button>
                                                <b-button variant="outline-success">Edit</b-button>
                                                <b-button variant="outline-danger">Remove</b-button>
                                            </b-button-group>
                                         </td>
                                       </tr>
                                   </tbody>
                                </table>
                            </div>
                        </b-col>
                    </b-row>
                </div>
            </b-card-body>
        </b-collapse>
    </b-card>
</div>

</template>

<script>
// Just to test that Axios calls work, lets import the customr.service js files in this Home view.
import CustomerService from '@/api-services/customer.service'

export default {
  name: 'CustomerList',
  data () {
    return {
      customers: []
    }
  },
  // created() function is a part of the Vue.js component lifecycle.
  // It is going to be executed once the component is instantiated and all the data is set but the component’s mounting stage is still not started.
  // We are using that hook just to verify if our CustomerService is working
  // so basically, this created event is triggered before the page is rendered or loaded in the browser
  created () {
    CustomerService.getAllCustomers().then((response) => {
      this.customers = response.data
    }).catch((error) => {
      console.log(error.response.data)
    })
  }
}
</script>

<style scoped>
.centerText, td, th{
    text-align: center;
}
</style>
