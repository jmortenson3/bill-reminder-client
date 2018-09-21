import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import BillList from '@/components/BillList';
import AddBill from '@/components/AddBill';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});
