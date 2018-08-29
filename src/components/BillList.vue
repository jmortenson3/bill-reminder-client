<template>
  <div class="bill-list">
    <h1>Bills</h1>
    <div v-if="bills.length">
      <p>Your total monthly bill amount is ${{ this.billTotal }}</p>
      <table class="table">
        <thead>
          <tr>
            <td>Title</td>
            <td>Amount</td>
            <td>Due Date</td>
            <td>Paid</td>
            <td>ID</td>
          </tr>
        </thead>
        <tr v-for="bill in bills" :key="bill._id" :bill="bill" >
          <td>{{ bill.title }}</td>
          <td>{{ bill.amount ? '$' + parseFloat(bill.amount).toFixed(2) : null }}</td>
          <td>{{ bill.firstDueDate }}</td>
          <td v-on:click="markAsPaid(bill._id)"><img class="icon-dollar" widht="25" v-if="bill.paid" src="/static/dollar_green.png"><img v-else width="25" src="/static/dollar_red.png"></td>
          <td>{{ bill._id }}</td>
          <td><button v-on:click="deleteBill(bill._id)">X</button></td>
        </tr>
      </table>
    </div>
    <div v-else>
      <p>No bills to display.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      bills: [],
      billTotal: 0
    }
  },
  mounted() {
    axios
      .get('http://localhost:3001/api/b')
      .then(response => {
        console.log(response);
        this.bills = response.data;
        this.billTotal = this.bills.map(bill => bill.amount).reduce((a, c) => a + c);
      })
      .catch(err => err);
  },
  beforeUpdate() {
    this.billTotal = this.bills.map(bill => bill.amount).reduce((a, c) => a + c);
  },
  methods: {
    deleteBill: function(id) {
      console.log(`Deleting bill with id ${id}`);
      axios
        .delete(`http://localhost:3001/api/b/${id}`)
        .then(res => {
          this.bills = this.bills.filter(bill => bill._id !== id);
          return res;
        })
        .catch(err => err);
    },
    markAsPaid: function(id) {
      let billToUpdate = this.bills.filter(bill => bill._id === id )[0];
      console.log(`Marking bill ${id} as paid: ${!billToUpdate.paid}`);
      const body = {
        paid: !billToUpdate.paid
      }
      axios
        .put(`http://localhost:3001/api/b/${id}`,
          body
        )
        .then(res => {
          console.log(res);
          billToUpdate.paid = !billToUpdate.paid;
          const index = this.bills.map(el => el._id).indexOf(id);
          this.bills[index] = billToUpdate;
          return res;
        })
        .catch(err => err);
    }
  }
}
</script>
<style scoped>
.table {
  margin: 0 auto;
  width: 75%;
}

.table thead tr {
  font-weight: bold;
}

.table tr:nth-child(2n) {
  background-color: #f5f5f5;
}

.icon-dollar {
  width: 25px;
}
</style>
