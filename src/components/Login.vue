<template>
  <div class="loginContainer">
    <div class="login">
      <div v-if="status.loginFailed" class="errorBox">
        <p>Username or password were not correct</p>
      </div>
      <h1>All your bills<br>in one spot.</h1>
      <form class="form" @submit.prevent="login" v-bind:class="{ formBorder: showBorder }">
        <label for="username">Username/email:</label>
        <div class="inputGroup">
          <font-awesome-icon icon="envelope" class="icon" />
          <input required v-model="username" type="text" placeholder="Email" >
        </div>
        <label for="password">Password</label>
        <div class="inputGroup">
          <font-awesome-icon icon="lock" class="icon" />
          <input required v-model="password" type="password" placeholder="Password">
        </div>
        <div class="inputGroup">
          <button type="submit">Login</button>
        </div>
      </form>
      <p class="signupText">
        Don't have an account?
        <router-link to="/register">Sign up today!</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'login',
  props: ['showBorder'],
  data() {
    return {
      username: '',
      password: '',
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
    login: function() {
      const { username, password } = this;
      this.$store.dispatch('authentication/login', { username, password });
      this.password = '';
    }
  }
}
</script>

<style scoped>
.loginContainer {
  flex: 1;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url('/static/notebook-1280538_1920.jpg') no-repeat center;
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
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

.login {
  color: #c2c2c2;
  margin-top: 10%;
  position: relative;
  width: 31%;
  min-width: 370px;
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

.inputGroup {
  display: flex;
  margin-bottom: 20px;
}

.inputGroup input {
  flex: 1;
  margin-left: 10px;
}

.inputGroup button {
  flex: 1;
  margin-left: 50px;
}

.form button {
  height: 40px;
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

form label {
  display: none;
}

form input {
  color: #fff;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  font-size: 1rem;
  padding: 0 25px;
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

.signupText {
  text-align: center;
}

.signupText a {
  color: yellow;
}

.icon {
  font-size: 36px;
  width: 40px;
}

@media (max-device-width: 600px) {
  .login {
    min-width: 0;
    width: 90%;
    left: 0;
    padding: 0 10px;
    margin: 25% auto;
  }

  .errorBox {
    max-height: 75px;
    width: 90%;
  }
}
</style>