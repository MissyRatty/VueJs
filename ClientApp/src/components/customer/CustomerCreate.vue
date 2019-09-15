<template>
    <div class="container-fluid">
        <b-card no-body class="mb-1" border-variant="info" href="#">
         <b-card-header header-tag="header" class="p-1">
            <b-row>
                <b-col md="4">
                </b-col>
                <b-col md="4" class="centerText">
                   <strong class="text-success">Creating New Customer</strong>
                </b-col>
                <b-col md="4">
                </b-col>
            </b-row>
         </b-card-header>
          <b-card-body>
            <b-container fluid>
               <div class="form-wrapper">
                   <b-form @submit.prevent="createCustomer">
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
                           <b-button type="submit" variant="success">Save</b-button>
                           <b-button :to="{ name: 'CustomerList' }" variant="danger">Cancel</b-button>
                         </b-col>
                       </b-form-group>
                   </b-form>
               </div>
            </b-container>
            <!-- Adding a pop up (modal) for displaying the status of our POST request to the API to create new customers -->
            <b-modal
                ref="alertModal"
                :title="alertModalTitle"
                :ok-only="true"
                @ok="onAlertModalOkClick">
                <p class="my-4">{{ alertModalContent }}</p>
            </b-modal>
        </b-card-body>
        </b-card>
    </div>
</template>

<script>
// import the customer.service to get access to the createCustomer method in the service for our create custome POST calls.
import CustomerService from '@/api-services/customer.service'

// create variables to store data from our create customer form inputs for customer Name and created date time.
// also need variables to store the pop up window (modal) title and content (body)
// the variable, isSuccessfully will store the status(created new customer OR encountered an error) of our POST (Create New Customer) Request to the Customer Web API.
// these variables (formData object, alertModalTitle, alertModalContent, isSuccessfully) will be used in a two-way data-binding with the CustomerCreate View.
// this will use the 'v-model' directive, this way, a parent component as well as any child components of the parent component, can modify these variables,
// and both components (parent and child/children) will be notified of any modifications of these variables.
export default {
  name: 'CustomerCreate',
  data () {
    return {
      formData: {
        customerName: '',
        customerCreatedDateTime: ''
      },
      alertModalTitle: '',
      alertModalContent: '',
      isSuccessfully: false
    }
  },
  methods: {
    createCustomer () {
      CustomerService.createCustomer(this.formData).then(() => {
        // set modal details and show modal
        this.isSuccessfully = true
        this.alertModalTitle = 'Successfully'
        this.alertModalContent = 'Customer created successfully'
        this.$refs.alertModal.show()

        // clear the formData object content if customer was successfully created
        this.formData = {
          customerName: '',
          customerCreatedDateTime: ''
        }
      }).catch((error) => {
        // set modal details and show modal
        this.isSuccessfully = false
        this.alertModalTitle = 'Error'
        this.alertModalContent = error
        this.$refs.alertModal.show()
      })
    },
    onAlertModalOkClick () {
      if (this.isSuccessfully) {
        // if new customer was created succesfully, then redirect user to the customer list page to view all customers currently in the system.
        this.$router.push({ name: 'CustomerList' })
      }
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
}
</style>
