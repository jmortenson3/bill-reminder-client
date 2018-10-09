<template>
  <div id="app">
    <div v-if="user.token">
      <nav>
        <router-link to="/">
          Log out&nbsp;
          <font-awesome-icon
            icon="sign-out-alt"
            size="lg" />
        </router-link>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      user: 'authentication/getUser'
    })
  },
  mounted() {
  }
}
</script>

<style>
/*
 * darkblue #14213D
 * orange #FCA311
 * grey #E5E5E5
 * white
 * black
**/
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  background-color: #14213D;;
}

nav {
  text-align: right;
  float: right;
  padding-top: 20px;
  padding-right: 50px;
}

a {
  text-decoration: none;
  color: #FCA311;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}

@media (max-device-width: 600px) {
  nav {
    padding-top: 20px;
    padding-right: 10px;
  }
}
</style>
