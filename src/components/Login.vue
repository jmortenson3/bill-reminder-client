<template>
  <div class="login">
    <h3>Login</h3>
    <div v-if="status.loginFailed" class="errorBox">
      <p>Username or password were not correct</p>
    </div>
    <form class="form" @submit.prevent="login">
      <label for="username">Username/email:</label>
      <input required v-model="username" type="text">
      <label for="password">Password</label>
      <input required v-model="password" type="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      status: 'authentication/getLoginStatus'
    })
  },
  mounted() {
    console.log("Boop");
    this.$store.dispatch('authentication/logout');
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch('authentication/login', { username, password });
    }
  }
}
</script>
<style scoped>
.errorBox {
  margin: 25px auto;
  width: 30%;
  padding: 10px 0;
  background-color: rgba(255, 53, 103, 0.4);
  border-radius: 5px;
}

.errorBox p {

}

.form {
  width: 40%;
  margin: 0 auto;
}

.form button {
  margin-top: 40px;
  box-shadow: 2px 2px black;
  height: 50px;
  width: 155px;
  font-weight: bold;
  font-size: 24px;
  background-color: #43f38a;
  border: none;
  padding: 5px 15px;
}
.form button:hover {
  cursor: pointer;
  transform: translateY(1px);
}

form input, form label, form select {
  display: block;
}
form input, form select {
  width: 100%;
  margin: 0 0 15px 0;
  height: 35px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */
  padding: 0 15px;
}
form label {
  text-align: left;
}
</style>