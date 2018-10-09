<template>
  <div class="loginContainer">
    <div class="login">
      <div v-if="status.loginFailed" class="errorBox">
        <p>Username or password were not correct</p>
      </div>
      <div class="title">
        <h1>Log in to Budger</h1>
      </div>
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
  background-color: #14213D;
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
  color: #14213D;
  margin: 90px auto auto auto;
  position: relative;
  width: 28%;
  min-width: 370px;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 0 35px;
  background-color: white;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

.title {
  color: #14213D;
  margin-bottom: 45px;
}

.title h1 {
  font-size: 2.5rem;
  margin-bottom: 0px;
}

.title small {
  font-size: 1.4rem;
}

.inputGroup {
  display: flex;
  margin-bottom: 35px;
}

.inputGroup input {
  flex: 1;
  margin-left: 5px;
}

.inputGroup button {
  flex: 1;
  margin-left: 10px;
  height: 40px;
  text-transform: uppercase;
  font-size: 1rem;
  background-color: #26a67a;
  color: white;
  border: none;
  padding: 5px 15px;
}

.form button:hover {
  cursor: pointer;
  background-color: #2dc08d;
}

form label {
  display: none;
}

form input {
  height: 40px;
  background-color: #E5E5E5;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  padding: 0 25px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
}

form label {
  text-align: left;
}

.signupText {
  text-align: center;
  color: #aaa;
}

.signupText a {
  color: red;
  font-weight: bold;
}

.icon {
  color: #c4c2c2;
  font-size: 24px;
  margin-top: 7px;
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