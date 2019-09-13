<template>
    <div>
        <b-card no-body class="mb-1" border-variant="info" href="#" v-b-toggle.gridCustomerDetails>
         <b-card-header header-tag="header" class="p-1">
            <b-row>
                <b-col md="4">
                </b-col>
                <b-col md="4" class="centerText">
                    View Customer <strong class="text-success">({{ customer.id }})</strong> with Account Details
                </b-col>
                <b-col md="4">
                </b-col>
            </b-row>
         </b-card-header>
        <b-collapse id="gridCustomerDetails" visible>
          <b-card-body>
            <div>
                <b-row>
                    <b-col md="2">
                      <strong>Customer name:</strong>
                    </b-col>
                    <b-col md="2">{{ customer.customerName }}</b-col>
                </b-row>
                <b-row>
                    <b-col md="2">
                      <strong>Date of Creation:</strong>
                    </b-col>
                    <b-col md="2">{{ customer.customerCreatedDateTime }}</b-col>
                </b-row>
                <b-row
                    v-if="customer.accounts && customer.accounts.length <= 1">
                     <b-col md="2">
                      <strong>Type of Customer:</strong>
                    </b-col>
                     <b-col md="2">
                      <span class="text-success">Beginner user</span>
                    </b-col>
                </b-row>
                <b-row
                    v-else>
                     <b-col md="2">
                      <strong>Type of Customer:</strong>
                    </b-col>
                     <b-col md="2">
                      <span class="text-info">Advanced user</span>
                    </b-col>
                </b-row>
                <br/>
                 <!-- put table here -->
                <b-row>
                    <b-col md="12">
                        <div class="table-responsive">
                             <table class="table table-striped table-bordered table-hover">
                                <thead>
                                     <tr>
                                        <th>Customer Number</th>
                                        <th>Account Number</th>
                                        <th>Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                      v-for="account in customer.accounts"
                                      :key="account.id">
                                      <td>{{ account.customerId }}</td>
                                      <td>{{ account.accountNumber }}</td>
                                      <td>{{ account.accountCreatedDateTime }}</td>
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
import CustomerService from '@/api-services/customer.service'

export default {
  name: 'CustomerDetails',
  data () {
    return {
      customer: {}
    }
  },
  created () {
    CustomerService.getCustomerWithAccountDetails(this.$router.currentRoute.params.id).then((response) => {
      this.customer = response.data
    })
  }
}
</script>

<style scoped>
.centerText, td, th{
    text-align: center;
}
</style>
