<template>
    <b-card no-body class="mb-1" border-variant="info" href="#">
         <b-card-header header-tag="header" class="p-1">
            <b-row>
                <b-col md="4">
                </b-col>
                <b-col md="4" class="centerText">
                   <strong class="text-success">Editing Customer with ID: {{ this.formData.customerId }}</strong>
                </b-col>
                <b-col md="4">
                </b-col>
            </b-row>
         </b-card-header>
          <b-card-body>
            <b-container fluid>
               <div class="form-wrapper">
                   <b-form @submit.prevent="editCustomer">
                       <b-form-group>
                           <b-col md="5">
                               <b-input placeholder="Please enter new customer name"
                               id="customerName"
                               v-model="formData.customerName"
                               maxlength="50"
                               required />
                           </b-col>
                       </b-form-group>

                       <b-form-group>
                           <b-col md="5">
                               <b-input placeholder="Please pick creation date"
                               id="customerCreatedDateTime"
                               v-model="formData.customerCreatedDateTime"
                               type="date"
                               required />
                           </b-col>
                       </b-form-group>
                       <br>
                       <b-form-group>
                         <b-col md="5" offset="3">
                           <b-button type="submit" variant="success">Update</b-button>
                           <b-button :to="{ name: 'CustomerList' }" variant="danger">Cancel</b-button>
                         </b-col>
                       </b-form-group>
                   </b-form>
               </div>
            </b-container>
            <!-- Adding a pop up (modal) for displaying the status of our POST request to the API to update an existing customer -->
            <b-modal
                ref="alertModal"
                :title="alertModalTitle"
                :ok-only="true"
                @ok="onAlertModalOkClick">
                <p class="my-4">{{ alertModalContent }}</p>
            </b-modal>
        </b-card-body>
        </b-card>
</template>

<script>
import CustomerService from '@/api-services/customer.service'

// before the edit customer form loads, lets get that customer's details from our API and populate the edit form with that customer's details
// we do that in the created () method. (its like on before page load)
export default {
  name: 'CustomerEdit',
  data () {
    return {
      formData: {
        customerId: '',
        customerName: '',
        customerCreatedDateTime: ''
      },
      alertModalTitle: '',
      alertModalContent: '',
      isSuccessfully: false
    }
  },
  created () {
    CustomerService.getCustomer(this.$router.currentRoute.params.id).then((response) => {
      this.formData.customerId = response.data.id
      this.formData.customerName = response.data.customerName
      this.formData.customerCreatedDateTime = response.data.customerCreatedDateTime.split('T')[0]
    })
  },
  methods: {
    editCustomer () {
      CustomerService.updateCustomer(this.$router.currentRoute.params.id, this.formData).then(() => {
        this.isSuccessfully = true
        this.alertModalTitle = 'Successfully'
        this.alertModalContent = 'Customer Successfully updated'
        this.$refs.alertModal.show()
      })
    },
    onAlertModalOkClick () {
      if (this.isSuccessfully) {
        this.$router.push({ name: 'CustomerList' })
      }
    }
  }
}
</script>
