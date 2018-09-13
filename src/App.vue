<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/bills">List View</router-link>
      <router-link to="/add-bill">Add Bill</router-link>
    </nav>
    <router-view/>
    <login>
  </div>
</template>

<script>
import Login from './components/Login';
export default {
  name: 'App',
  components: {
    'login': Login
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
