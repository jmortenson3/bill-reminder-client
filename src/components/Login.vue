<template>
  <div>
    <form class="form">
      <h3>Login</h3>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style scoped>
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