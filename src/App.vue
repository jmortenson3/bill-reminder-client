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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

nav {
  text-align: right;
  padding-top: 20px;
  padding-right: 50px;
}

a {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-height: 100%;
  background-color: #c5e5f5;
}

@media only screen and (max-device-width: 500px) {
  nav {
    padding-top: 20px;
    padding-right: 10px;
  }
}
</style>
