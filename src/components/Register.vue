<template>
<div class="registerContainer">
  <div class="register">
    <div v-if="status.loginFailed || error" class="errorBox">
      <p>{{ error || status.error.message }}</p>
    </div>
    <h1>Sign up</h1>
    <form class="form" @submit.prevent="register" v-bind:class="{ formBorder: showBorder }">
      <label for="username">Username/email</label>
      <font-awesome-icon icon="envelope" class="icon" />
      <input required v-model="username" type="text" placeholder="Email">
      <label for="password">Password</label>
      <font-awesome-icon icon="lock" class="icon" />
      <input required v-model="password" type="password" placeholder="Password">
      <label for="re-password">Confirm password</label>
      <font-awesome-icon icon="lock" class="icon" />
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
  top: -85px;
  text-align: center;
  position: absolute;
  width: 300px;
  padding: 10px;
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
  border: 1px solid rgba(0,0,0,0);
  padding: 0 35px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

h1 {
  font-size: 2.5rem;
  border-bottom: 1px solid #c2c2c2;
  padding-bottom: 15px;
}

.form button {
  position: relative;
  left: 40px;
  height: 40px;
  width: 78%;
  text-transform: uppercase;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0);
  color: #c2c2c2;
  border: 2px solid #c2c2c2;
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
  color: #fff;
  margin: 0 0 15px 0;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  font-size: 1rem;
  padding: 0 25px;
  display: inline-block;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

::placeholder {
  color: white;
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

.icon {
  position: relative;
  display: inline-block;
  font-size: 36px;
  width: 40px;
  top: 7px;
}

@media only screen and (max-device-width: 500px) {
  .register {
    min-width: none;
    width: 90%;
    left: 0;
    padding: 0 10px;
  }

  .errorBox {
    max-height: 75px;
    width: 90%;
  }
}
</style>