<template>
<div class="registerContainer">
  <div class="register">
    <div v-if="status.loginFailed || error" class="errorBox">
      <p>{{ error || status.error.message }}</p>
    </div>
    <h1>Sign up</h1>
    <form class="form" @submit.prevent="register" v-bind:class="{ formBorder: showBorder }">
      <label for="username">Username/email</label>
      <input required v-model="username" type="text" placeholder="Email">
      <label for="password">Password</label>
      <input required v-model="password" type="password" placeholder="Password">
      <label for="re-password">Confirm password</label>
      <input required v-model="rePassword" type="password" placeholder="Confirm password">
      <button type="submit">Sign up</button>
    </form>
    <p class="loginText">
      Already have an account?
      <router-link to="/">Log in!</router-link>
    </p>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'register',
  props: ['showBorder'],
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      status: 'authentication/getLoginStatus'
    })
  },
  mounted() {
    this.$store.dispatch('authentication/logout');
  },
  methods: {
    register: function() {
      const { username, password, rePassword } = this;
      if (password != rePassword) {
        this.error = 'Passwords did not match.';
      } else {
        this.$store.dispatch('authentication/register', { username, password });
      }
      this.password = '';
      this.rePassword = '';
    }
  }
}
</script>
<style scoped>
.registerContainer {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url('/static/notebook-1280538_1920.jpg') no-repeat center;
  height: 100%;
  min-height: 100%;
}
.errorBox {
  margin: 25px auto;
  width: 30%;
  padding: 10px 0;
  background-color: rgba(255, 53, 103, 0.4);
  border-radius: 5px;
}

.errorBox p {

}

.register {
  color: #c2c2c2;
  top: 15%;
  position: relative;
  width: 25%;
  min-width: 300px;
  left: 10%;
}

h1 {
  font-size: 2.5rem;
  border-bottom: 1px solid #c2c2c2;
  padding-bottom: 15px;
}

.form button {
  margin-top: 30px;
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 1rem;
  /* background-color: rgba(0, 0, 0, 0); */
  background-color: rgb(3, 155, 91);
  color: #c2c2c2;
  border: 1px solid #c2c2c2;
  border-radius: 25px;
  padding: 5px 15px;
}

.form button:hover {
  cursor: pointer;
  transform: translateY(1px);
}

form input, form label, form select {
  display: block;
}

form label {
  display: none;
}

form input, form select {
  color: white;
  width: 100%;
  margin: 0 0 15px 0;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 25px;
  border: none;
  /* border-bottom: 3px solid #c2c2c2; */
  font-size: 1rem;
  padding: 0 25px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

form label {
  text-align: left;
}

.loginText {
  text-align: center;
}

.loginText a {
  color: yellow;
}
</style>