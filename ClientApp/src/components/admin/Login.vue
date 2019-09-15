<template>
    <b-container>
        <b-row>
            <b-col md="4">
                <b-input type="text" v-model="loginData.userName" placeholder="Username here"></b-input>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col md="4">
              <b-input type="password" v-model="loginData.password" placeholder="Password here"></b-input>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col md="6" offset="1">
              <b-button variant="success" :to="{ name: 'Layout'}">Login</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    onLoginClick () {
      console.log('user name is => ' + this.loginData.userName)
      console.log('pasword is => ' + this.loginData.password)
      // this.$router.push({ name: 'Layout' })
    }
  }
}
</script>
