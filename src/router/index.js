import Vue from 'vue';
import Router from 'vue-router';
import LoginContainer from '@/components/LoginContainer';
import BillList from '@/components/BillList';
import BillForm from '@/components/BillForm';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginContainer',
      component: LoginContainer
    },
    {
      path: '/bills',
      name: 'BillList',
      component: BillList
    },
    {
      path: '/add-bill',
      name: 'AddBill',
      component: BillForm
    },
    {
      path: '/edit-bill',
      name: 'edit-bill',
      component: BillForm,
      props: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/');
  }
  next();
});
