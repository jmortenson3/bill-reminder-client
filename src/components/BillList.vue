<template>
  <div class="bill-list">
    <h1>Bills</h1>
    <div v-if="bills.length">
      <p>
        Your total monthly bill amount is
        ${{ parseFloat(this.billTotal).toFixed(2) }}
      </p>
      <table class="table">
        <thead>
          <tr class="table table-head">
            <td v-on:click="clickSort('title')">Title</td>
            <td v-on:click="clickSort('amount')">Amount</td>
            <td v-on:click="clickSort('nextDueDate')">Due Date</td>
            <td v-on:click="clickSort('paid')">Paid</td>
            <td>Delete</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tr v-for="bill in bills" :key="bill._id" :bill="bill" >
          <td>{{ bill.title }}</td>
          <td>{{ bill.amount ? '$' + parseFloat(bill.amount).toFixed(2) : null }}</td>
          <td>{{ bill.nextDueDate }}</td>
          <td v-on:click="markAsPaid(bill._id)">
            <div v-if="bill.paid">
              Paid
              <img class="icon-dollar" widht="25" src="/static/dollar_green.png">
            </div>
            <div v-else>Not paid <img width="25" src="/static/dollar_red.png"></div>
          </td>
          <td><button v-on:click="deleteBill(bill._id)">X</button></td>
          <td><button v-on:click="editBill(bill)">Edit</button></td>
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
import { billService } from '../services/bill';

export default {
  data () {
    return {
      bills: [],
      ascending: true,
      billTotal: 0
    }
  },
  mounted() {
    billService.getBills()
      .then(response => {
        this.bills = response.data;
        this.billTotal = this.bills.length > 0
                ? this.bills.map(bill => bill.amount).reduce((a, c) => a + c)
                : 0;
      })
      .catch(err => console.log(err).data);
  },
  beforeUpdate() {
    this.billTotal = this.bills.length > 0
            ? this.bills.map(bill => bill.amount).reduce((a, c) => a + c)
            : 0;
  },
  methods: {
    deleteBill: function(id) {
      console.log(`Deleting bill with id ${id}`.data);
      billService.deleteBill(id)
        .then(res => {
          this.bills = this.bills.filter(bill => bill._id !== id);
          return res;
        })
        .catch(err => err);
    },
    editBill: function(bill) {
      this.$router.push({ name: 'edit-bill', params: { bill } });
    },
    markAsPaid: function(id) {
      let billToUpdate = this.bills.filter(bill => bill._id === id )[0];
      console.log(`Marking bill ${id} as paid: ${!billToUpdate.paid}`.data);
      const body = {
        paid: !billToUpdate.paid
      }
      billService.updateBill(id, body)
        .then(res => {
          billToUpdate.paid = !billToUpdate.paid;
          const index = this.bills.map(el => el._id).indexOf(id);
          this.bills[index] = billToUpdate;
          return res;
        })
        .catch(err => err);
    },
    clickSort: function(field) {
      const that = this;
      this.bills.sort(function(a, b) {
        a[field] = a[field] || false;
        b[field] = b[field] || false;
        const x = ['string', 'boolean'].includes(typeof a[field])
                ? a[field].toString().toLowerCase()
                : a[field];
        const y = ['string', 'boolean'].includes(typeof b[field])
                ? b[field].toString().toLowerCase()
                : b[field];
        if (x < y) {
          return that.ascending ? -1: 1;
        }
        if (x > y) {
          return that.ascending ? 1 : -1;
        }
        return 0;
      });
      this.ascending = !this.ascending;
    }
  }
}
</script>
<style scoped>
.table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 75%;
  background-color: white;
  box-shadow: 1px 2px 8px #666;
}

.table thead tr {
  font-weight: bold;
  text-transform: uppercase;
}

.table thead tr:hover {
  cursor: pointer;
}

.table tr, .table thead {
  border-bottom: 1px solid #c2c2c2;
}

.table tr:last-child {
  border: none;
}

.table td {
  padding: 10px;
}

.icon-dollar {
  width: 25px;
}

button:hover {
  cursor: pointer;
}

button {
  background-color: rgba(0,0,0,0);
  border-radius: 2px;
  box-shadow: none;
}
</style>
