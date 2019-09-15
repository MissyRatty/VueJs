// Import vue and use it to notify Vue to use Router, this is imported from vue-router
// The @ symbol is a Webpack alias for the root of the project.
import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/Layout'
import Home from '@/components/Home'
import CustomerList from '@/components/customer/CustomerList.Component'
import CustomerCreate from '@/components/customer/CustomerCreate'
import CustomerEdit from '@/components/customer/CustomerEdit'
import CustomerDetails from '@/components/customer/CustomerDetails'
import NotFound from '@/components/error-pages/NotFound'

Vue.use(Router)

// Here we write routes and connect them to our UI components
// Instantiate a new Router and add list of routes.
// These components will be loaded in the <router-view /> section in App.vue
export default new Router({
  // change the routing mode from the hash mode to the history mode, this makes the url prettier without the use of hashes ('#)
  // History mode relies on the browser’s API history.pushState and it gives us the ability to navigate without # in the URL
  // Vue.js router will use hash mode as the fallback if the browser doesn’t support history.pushState
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/customer/list',
      name: 'CustomerList',
      component: CustomerList
    },
    {
      path: '/customer/create',
      name: 'CustomerCreate',
      component: CustomerCreate
    },
    {
      path: '/customer/edit/:id',
      name: 'CustomerEdit',
      component: CustomerEdit
    },
    {
      path: '/customer/:id',
      name: 'CustomerDetails',
      component: CustomerDetails
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
