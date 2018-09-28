<template>
<div class="loginContainer">
  <button
    v-on:click="showSignup"
    class="btn-toggle signup-toggle">
    Sign up
  </button>
  <button
    v-on:click="showLogin"
    class="btn-toggle login-toggle">
    Log in
  </button>
  <login v-if="login" showBorder="login"></login>
  <register v-else showBorder="!login"></register>
  <p>Hello?</p>
</div>
</template>

<script>
import Login from './Login';
import Register from './Register';

export default {
  name: 'login-container',
  data: function() {
    return {
      login: false
    };
  },
  components: {
    Login,
    Register
  },
  methods: {
    showSignup: function() {
      this.login = false;
    },
    showLogin: function() {
      this.login = true;
    }
  }
}
</script>
<style scoped>
.loginContainer {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url('/static/notebook-1280538_1920.jpg') no-repeat center;
  height: 100%;
  min-height: 100%;
}
</style>