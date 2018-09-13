<template>
  <div>
    <h1>HomePage.vue</h1>
    <login></login>
  </div>


</template>

<script>
const Login = require('./Login');
Vue.component('login', {
  data: function () {
    return {
      count: 0
    }
  },
  template: Login
})
</script>