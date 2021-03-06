<template>
  <div class="bill-list">
    <h1>Bills</h1>
    <div>
      <p v-if="bills.length" class="topText">
        Total monthly bill amount:
        <span class="totalBillAmount">
          ${{ this.billTotal }}
        </span>
      </p>
      <p class="topText newBillText" v-on:click="goToBillForm()">New Bill
        <font-awesome-icon icon="hand-point-right" class="newBillIcon" size="lg" />
      </p>
      <table v-if="bills.length" class="table">
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
          <td class="iconRow">
            <font-awesome-icon
              v-on:click="editBill(bill)"
              class="editBill"
              icon="cog" />
            <font-awesome-icon
              v-if="$resize && $mq.below(600)"
              v-on:click="markAsDelete(bill._id)"
              class="deleteBill"
              icon="trash-alt" />
          </td>
          <td data-label="TITLE">{{ bill.title }}</td>
          <td data-label="AMOUNT">
            {{ bill.amount ? '$' + parseFloat(bill.amount).toFixed(2) : '-' }}
          </td>
          <td data-label="NEXT DUE DATE">{{ formatDate(bill.nextDueDate) }}</td>
          <td data-label="PAID">
            <font-awesome-icon
              v-if="bill.paid"
              v-on:click="markAsPaid(bill._id)"
              class="paidIcon"
              icon="check-circle"
              :style="{ color: '#26a67a' }" />
            <font-awesome-icon
              v-else
              v-on:click="markAsPaid(bill._id)"
              class="paidIcon"
              icon="check-circle"
              :style="{ color: '#bbb' }" />
          </td>
          <td v-if="$resize && $mq.above(601)">
            <font-awesome-icon
              class="deleteBill"
              v-on:click="markAsDelete(bill._id)"
              icon="trash-alt" />
          </td>
        </tr>
      </table>
    </div>
    <div v-if="!bills.length">
      <p>No bills to display.</p>
    </div>
    <toast v-if='shouldShowToast'
      :id="billToDeleteId"
      :toast-text='`Deleted bill "${billToDeleteName}".`'
      btn-text='Undo'
      :btn-function="undoDelete" />
  </div>
</template>

<script>
import axios from 'axios';
import { billService } from '../services/bill';
import Toast from './Toast';

export default {

  data () {
    return {
      bills: [],
      ascending: true,
      billTotal: 0,
      billToDeleteId: '',
      billToDeleteName: '',
      shouldShowToast: false,
      deleteTimer: null,
    }
  },
  components: {
    Toast
  },
  mounted() {
    this.refreshBillList();
  },
  beforeUpdate() {
    this.billTotal = this.bills.length > 0
      ? this.bills.map(bill => bill.amount).reduce((a, c) => a + c)
      : 0;
  },
  methods: {
    refreshBillList() {
      billService.getBills()
        .then(response => {
          this.bills = response.data
            ? response.data.filter(bill => !bill.doDelete)
            : response.data;
          this.billTotal = this.bills.length > 0
            ? this.bills.map(bill => bill.amount).reduce((a, c) => a + c)
            : 0;
          console.log("New bill list:");
          this.bills.forEach(bill => {
            console.log(JSON.stringify(bill));
          })
        })
        .catch(err => console.log(err).data);
    },
    markAsDelete: function(id) {
      console.log(`Marking this bill to be deleted. id: ${id}`.data);
      billService.updateBill(id, { doDelete: true})
        .then(res => {
          this.billToDeleteId = id;
          this.billToDeleteName = this.bills.filter(bill => bill._id === id)[0].title;
          this.bills = this.bills.filter(bill => bill._id !== id);
          this.showToast();
          return res;
        })
        .catch(err => err);
    },
    undoDelete: function(id) {
      billService.updateBill(id, { doDelete: false })
        .then(res => {
          this.refreshBillList();
          setTimeout(() => {
            this.shouldShowToast = false;
            clearTimeout(this.deleteTimer);
          }, 300);
          return res;
        })
        .catch(err => err);
    },
    editBill: function(bill) {
      this.$router.push({ name: 'edit-bill', params: { bill } });
    },
    markAsPaid: function(id) {
      let billToUpdate = this.bills.filter(bill => bill._id === id )[0];
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
        ? '-'
        : new Date(date).toLocaleDateString();
    },
    goToBillForm: function() {
      this.$router.push('/add-bill');
    },
    showToast: function() {
      this.shouldShowToast = true;
      this.deleteTimer = setTimeout(() => {
        this.shouldShowToast = false;
      }, 10000);
    },
  },
}
</script>
<style scoped>
.bill-list {
  flex: 1;
  width: 75%;
  margin: 0 auto 100px auto;
  color: white;
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
  color: #14213D;
  background-color: white;
  box-shadow: 1px 2px 8px #666;
}

.table thead tr {
  font-weight: bold;
  text-transform: uppercase;
  background-color: #E5E5E5;
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
  color: white;
  background-color: #14213D;
  padding: 5px 20px;
  border-radius: 10px;
}

.newBillIcon {
  color: #FCA311;
}

@media (max-width: 600px) {
  .bill-list {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 25px;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
  }

  .table {
    border-collapse: collapse;
    width: 100%;
    background-color: white;
    box-shadow: 1px 2px 8px #666;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
  }

  .table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .table tr {
    border-bottom: 1px solid #ddd;
    display: block;
    margin-bottom: 25px;
  }

  .table td {
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: right;
  }

  .table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  .iconRow::before {
    display: none;
  }

  .iconRow > svg {
    text-align: left;
  }

  .editBill {
    float: left;
  }

}
</style>
