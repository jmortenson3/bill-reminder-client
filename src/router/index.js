import Vue from 'vue';
import Router from 'vue-router';
import BillList from '@/components/BillList';
import HomePage from '@/components/HomePage';
import AddBill from '@/components/AddBill';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/bills',
      name: 'BillList',
      component: BillList
    },
    {
      path: '/add-bill',
      name: 'AddBill',
      component: AddBill
    }
  ]
});
