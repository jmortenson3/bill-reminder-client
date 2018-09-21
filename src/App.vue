<template>
  <div id="app">
    <nav>
      <div v-if="user.token">
        <router-link to="/login">Logout</router-link>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
