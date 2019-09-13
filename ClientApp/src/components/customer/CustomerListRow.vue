<template>
    <tr>
        <!-- data from api for a grid row-->
        <td>{{ customer.customerName }}</td>
        <td>{{ customer.customerCreatedDateTime }}</td>

        <!-- action buttons-->
        <td>
            <b-button-group>
                <!-- listen for the click events on any of these buttons -->
                <b-button variant="outline-primary" @click="onViewClick">View</b-button>
                <b-button variant="outline-success" @click="onEditClick">Edit</b-button>
                <b-button variant="outline-danger" @click="onRemoveClick">Remove</b-button>
            </b-button-group>
        </td>
    </tr>
</template>

<script>
export default {
  name: 'CustomerListRow',
  props: [ 'customer' ],
  methods: {
    onViewClick () {
      // we will emit our own (custom) click event names (view, edit, remove)
      // and each method gets passed a customer id parameter
      // this is how to create customer event triggers for customer Vuejs components
      this.$emit('view', this.customer.id)
    },
    onEditClick () {
      this.$emit('edit', this.customer.id)
    },
    onRemoveClick () {
      this.$emit('remove', this.customer.id)
    }
  }
}
</script>

<style scoped>
td, th{
    text-align: center;
}
</style>
