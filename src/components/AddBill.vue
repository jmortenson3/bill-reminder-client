<template>
  <div class="form">
    <h1>Add a bill</h1>
    <form method="post" @submit.prevent="submitForm">
      <label for="">Bill name</label>
      <input type="text" v-model="title">
      <label for="">Amount</label>
      <input type="text" v-model="amount">
      <label for="">Due date</label>
      <input type="date" v-model="dueDate">
      <button type="submit">Add Bill</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      amount: '',
      dueDate: ''
    }
  },
  methods: {
    submitForm: function() {
      //console.log(this.billTitle + " is due on " + this.dueDate + " for $" + this.amount);
      const body = {
        title: this.title,
        amount: this.amount,
        dueDate: this.dueDate
      }
      axios
        .post('http://localhost:3001/api/b',
          body
        )
        .then(function(res) { console.log(res)})
        .catch(function(err) { console.log(err)});
    }
  }
}
</script>


<style scoped>
.form {
  width: 40%;
  margin: 0 auto;
}

.form button {
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

form input, form label {
  display: block;
}
form input {
  width: 100%;
  margin: 0 0 15px 0;
  height: 35px;
  padding: 0 10px;
}
form label {
  text-align: left;
}
</style>
