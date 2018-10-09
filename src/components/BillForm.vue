<template>
  <div class="form">
    <!-- add or edit bill -->
    <h1 v-if="bill">Edit a bill</h1>
    <h1 v-else>Add a bill</h1>
    <p class="goBackText" v-on:click="goToBillList()">
      <font-awesome-icon icon="hand-point-left" class="goBackIcon" size="lg"/>
      Go back
    </p>
    <form method="post" @submit.prevent="submitForm">
      <label for="title">Bill name</label>
      <input type="text" v-model="title" required id="title">
      <label for="amount">Amount</label>
      <input type="number" step=".01" v-model="amount" id="amount">
      <label for="payAtUrl">URL to pay at</label>
      <input type="text" v-model="payAtUrl" id="payAtUrl">
      <label for="dueDateUOM">My bill is due every...</label>
      <select name="dueDateUOM" id="dueDateUOM" v-model="dueEvery">
        <option value="">--Due every...--</option>
        <option v-for="uom in UOMs" v-bind:key="uom.value" v-bind:value="uom.value">
          {{ uom.text }}
        </option>
      </select>
      <div>
        <label for="nextDueDate">Select your next due date</label>
        <input type="date" id="nextDueDate" v-model="firstDueDate">
      </div>
      <button type="submit">Add Bill</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { billService } from '../services/bill';

export default {
  props: ['bill'],
  data() {
    console.log(JSON.stringify(this.bill));
    return {
      title: this.bill ? this.bill.title : '',
      amount: this.bill ? this.bill.amount : '',
      payAtUrl: this.bill ? this.bill.payAtUrl : '',
      dueEvery: this.bill ? this.bill.dueEvery : '',
      firstDueDate: this.bill ? this.bill.firstDueDate : '',
      UOMs: [
        { text: 'day', value: 'day' },
        { text: 'week', value: 'week' },
        { text: 'other week', value: 'bi-week' },
        { text: 'month', value: 'month' },
        { text: 'other month', value: 'bi-month' },
        { text: '3 months', value: 'tri-month' },
        { text: '6 months', value: 'bi-year' },
        { text: 'year', value: 'year' }
      ]
    }
  },
  methods: {
    submitForm: function() {
      const body = {
        title: this.title,
        amount: this.amount,
        payAtUrl: this.payAtUrl,
        dueEvery: this.dueEvery,
        firstDueDate: this.firstDueDate
      }
      if (this.bill) {
        // update bill
        billService.updateBill(this.bill._id, body)
          .then(res => {
            this.goToBillList();
          })
          .catch(err => {
            this.goToBillList();
          });
      } else {
        billService.createBill(body)
          .then(res => {
            this.goToBillList();
          })
          .catch(err => {
            this.goToBillList();
          });
      }
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
    },
    goToBillList: function() {
      this.$router.push('/bills');
    }
  }
}
</script>

<style scoped>
.form {
  width: 40%;
  margin: 0 auto;
  color: white;
}

.form p, .form h1 {
  display: inline-block;
}

.form h1 {
  font-size: 3rem;
  float: right;
  margin: 0;
}

.form button {
  color: white;
  margin-top: 40px;
  height: 50px;
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  background-color: #26a67a;
  border: none;
  padding: 5px 15px;
}

.form button:hover {
  cursor: pointer;
  background-color: #2dc08d;
}

form {
  position: relative;
  top: 25px;
}

form input, form label, form select {
  display: block;
  width: 100%;
}

form input, form select {
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

.goBackText {
  position: relative;
  top: 10px;
}

.goBackText:hover {
  cursor: pointer;
}

.goBackIcon {
  color: #FCA311;
}

@media (max-width: 600px) {
  .form {
    width: 90%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
  }
}
</style>
