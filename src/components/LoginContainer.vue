<template>
<div>
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
.btn-toggle:hover {
  cursor: pointer;
}

.btn-toggle {
  width: 20%;
  height: 50px;
  background: none;
  border: none;
  font-size: 1.45rem;
  border-radius: 15px 15px 0 0;
}

.signup-toggle {
  background-color: crimson;
  color: white;
}

.login-toggle {
  background-color: blueviolet;
  color: white;
}
</style>