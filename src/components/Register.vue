<template>
<div class="registerContainer">
  <div class="register">
    <div class="title">
      <h1>Budger</h1>
      <small>See all your bills in one spot.</small>
    </div>
    <p v-if="status.loginFailed || error" class="error">
      {{ this.error }}
    </p>
    <form class="form" @submit.prevent="register" v-bind:class="{ formBorder: showBorder }">
      <label for="username">Username/email</label>
      <div class="inputGroup">
        <font-awesome-icon icon="envelope" class="icon" />
        <input required v-model="username" type="text" placeholder="Email">
      </div>
      <label for="password">Password</label>
      <div class="inputGroup">
        <font-awesome-icon icon="lock" class="icon" />
        <input required v-model="password" type="password" placeholder="Password">
      </div>
      <label for="re-password">Confirm password</label>
      <div class="inputGroup">
        <font-awesome-icon icon="lock" class="icon" />
        <input required v-model="rePassword" type="password" placeholder="Confirm password">
      </div>
      <div class="inputGroup">
        <button type="submit">Sign up</button>
      </div>
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
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'register',
  props: ['showBorder'],
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
      error: '',
      submitStatus: null,
    }
  },
  computed: {
    ...mapGetters({
      status: 'authentication/getLoginStatus'
    })
  },
  validations: {
    username: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(255),
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(255),
    },
    rePassword: {
      required,
      sameAsPassword: sameAs('password'),
    }
  },
  mounted() {
    this.$store.dispatch('authentication/logout');
  },
  methods: {
    register: function() {
      const { username, password } = this;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch('authentication/register', { username, password });
        this.password = '';
        this.rePassword = '';
      } else {
        // switch case for setting this.error
        this.error = 'Passwords did not match.';
      }
    },
  },
}
</script>
<style scoped>
.registerContainer {
  flex: 1;
  background-color: #14213D;
  min-height: 100%;
}
.error {
  color: rgba(255, 53, 103);
}

.register {
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
  margin-bottom: 25px;
  color: #14213D;
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

.icon {
  color: #c4c2c2;
  font-size: 24px;
  margin-top: 7px;
  width: 40px;
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

.loginText {
  text-align: center;
  color: #aaa;
}

.loginText a {
  /* color: #FCA311; */
  color: red;
  font-weight: bold;
}

@media (max-width: 600px) {
  .register {
    min-width: 0;
    width: 90%;
    left: 0;
    padding: 0 10px;
    margin: 25% auto;
  }
}
</style>