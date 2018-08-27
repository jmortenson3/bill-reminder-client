<template>
  <div class="form">
    <h1>Add a bill</h1>
    <form method="post" @submit.prevent="submitForm">
      <label for="title">Bill name</label>
      <input type="text" v-model="title" id="title">
      <label for="amount">Amount</label>
      <input type="text" v-model="amount" id="amount">
      <label for="payAtUrl">URL to pay at</label>
      <input type="text" v-model="payAtUrl" id="payAtUrl">
      <label for="dueDateUOM">My bill is due every...</label>
      <select name="dueDateUOM" id="dueDateUOM" v-model="dueEvery">
        <option value="">--Due every...--</option>
        <option v-for="uom in UOMs" v-bind:key="uom" v-bind:value="uom.value">{{ uom.text }}</option>
      </select>
      <div v-if="['week', 'bi-week'].includes(dueEvery)">
        <label for="dueDateFrequency">...on...</label>
        <select name="dueDateFrequency" id="dueDateFrequency" v-model="dueOn">
          <option value="">--select day of week--</option>
          <option v-for="day in weekDays" v-bind:key="day" v-bind:value="day">{{ day }}</option>
        </select>
      </div>
      <div v-if="['month', 'bi-month', 'tri-month', 'bi-anual', 'anual'].includes(dueEvery)">
        <label for="dueDateFrequency">...on the...</label>
        <select name="dueDateFrequency" id="dueDateFrequency" v-model="dueOn">
          <option value="">--select day--</option>
          <option v-for="n in 31" v-bind:key="n" v-bind:value="n">{{ formatDate(n) }}</option>
        </select>
      </div>
      <div v-if="dueOn">
        <label for="nextDueDate">Select your next due date</label>
        <input type="date" id="nextDueDate" v-model="firstDueDate">
      </div>
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
      payAtUrl: '',
      dueEvery: '',
      dueOn: '',
      firstDueDate: '',
      weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      UOMs: [
        { text: 'day', value: 'day' },
        { text: 'week', value: 'week' },
        { text: 'other week', value: 'bi-week' },
        { text: 'month', value: 'month' },
        { text: 'other month', value: 'bi-month' },
        { text: '3 months', value: 'tri-month' },
        { text: '6 months', value: 'bi-anual' },
        { text: 'year', value: 'anual' }
      ]
    }
  },
  methods: {
    submitForm: function() {
      //console.log(this.billTitle + " is due on " + this.dueDate + " for $" + this.amount);
      const body = {
        title: this.title,
        amount: this.amount,
        payAtUrl: this.payAtUrl,
        dueEvery: this.dueEvery,
        dueOn: this.dueOn,
        firstDueDate: this.firstDueDate
      }
      axios
        .post('http://localhost:3001/api/b',
          body
        )
        .then(function(res) { console.log(res)})
        .catch(function(err) { console.log(err)});
    },
    formatDate: function(n) {
      let s = n.toString();
      switch(s.slice(-1)) {
        case '1':
          s += 'st';
          break;
        case '2':
          s += 'nd';
          break;
        case '3':
          s += 'rd';
          break;
        default:
          s += 'th';
      }
      return s;
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
