// In this file, we are going to implement our Axios calls to the backend.
// Best Practice: create separate API service files for every entity in our database or RESTful resource
import Axios from 'axios'

const RESOURCE_NAME = '/customer'

export default {
  getAllCustomers () {
    return Axios.get(RESOURCE_NAME)
  },
  getCustomer (customerId) {
    return Axios.get(`${RESOURCE_NAME}/${customerId}`)
  },
  createCustomer (customerData) {
    return Axios.post(RESOURCE_NAME, customerData)
  },
  updateCustomer (customerId, customerData) {
    return Axios.put(`${RESOURCE_NAME}/${customerId}`, customerData)
  },
  deleteCustomer (customerId) {
    return Axios.delete(`${RESOURCE_NAME}/${customerId}`)
  }
}
