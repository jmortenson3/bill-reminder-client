<template>
  <div id="app">
    <nav>
      <div v-if="user.token">
        <router-link to="/">Log out</router-link>
        <router-link to="/bills">List View</router-link>
        <router-link to="/add-bill">Add Bill</router-link>
      </div>
    </nav>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
