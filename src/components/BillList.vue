<template>
  <div class="bill-list">
    <h1>Bills</h1>
    <div v-if="bills.length">
      <p class="topText">
        Total monthly bill amount:
        <span class="totalBillAmount">${{ parseFloat(this.billTotal).toFixed(2) }}</span>
      </p>
      <p class="topText newBillText" v-on:click="goToBillForm()">New Bill
        <font-awesome-icon icon="hand-point-right" size="lg" />
      </p>
      <table class="table">
        <thead>
          <tr class="table-head">
            <td></td>
            <td v-on:click="clickSort('title')">Title</td>
            <td v-on:click="clickSort('amount')">Amount</td>
            <td v-on:click="clickSort('nextDueDate')">Due Date</td>
            <td v-on:click="clickSort('paid')">Paid</td>
            <td></td>
          </tr>
        </thead>
        <tr v-for="bill in bills" :key="bill._id" :bill="bill" >
          <td class="editBill" v-on:click="editBill(bill)">
            <font-awesome-icon icon="cog" />
          </td>
          <td>{{ bill.title }}</td>
          <td>{{ bill.amount ? '$' + parseFloat(bill.amount).toFixed(2) : null }}</td>
          <td>{{ formatDate(bill.nextDueDate) }}</td>
          <td v-on:click="markAsPaid(bill._id)">
            <div v-if="bill.paid">
              <font-awesome-icon class="paidIcon" icon="check-circle" :style="{ color: 'green' }"/>
            </div>
            <div v-else>
              <font-awesome-icon class="paidIcon" icon="check-circle" :style="{ color: '#bbb' }" />
            </div>
          </td>
          <td class="deleteBill" v-on:click="deleteBill(bill._id)">
            <font-awesome-icon icon="trash-alt" />
          </td>
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
    },
    formatDate: function(date) {
      return date === undefined
        ? ''
        : new Date(date).toLocaleDateString();
    },
    goToBillForm: function() {
      this.$router.push('/add-bill');
    }
  }
}
</script>
<style scoped>
.bill-list {
  width: 75%;
  margin: 0 auto 100px auto;
  color: #171761;
}

.bill-list h1 {
  font-size: 4rem;
  margin-bottom: 5px;
}

.totalBillAmount {
  font-weight: bold;
  font-size: 1.2rem;
}

.table {
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  box-shadow: 1px 2px 8px #666;
}

.table thead tr {
  font-weight: bold;
  text-transform: uppercase;
  background-color: #171761;
  color: white;
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
button {
  background-color: rgba(0,0,0,0);
  border-radius: 2px;
  box-shadow: none;
}

.deleteBill {
  color: red;
}

.editBill {
  color: #555;
}

.deleteBill:hover, .editBill:hover, .paidIcon:hover,
.newBillText:hover {
  cursor: pointer;
}

.paidIcon {
  text-align: center;
}

.topText {
  display: inline-block;
  font-size: 1.2rem;
}

.newBillText {
  float: right;
}
</style>
