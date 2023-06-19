import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue'
import ProductDetails from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import Succes from '../views/Succes.vue';
import Cancel from '../views/Cancel.vue';

import { getAuth, onAuthStateChanged } from 'firebase/auth';


const isAuthenticated = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(getAuth(), (user) => {
      resolve(!!user);
    });
  });
};

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cart', name: 'Cart', component: Cart},
  { path: '/success', name: 'Succes', component: Succes},
  { path: '/cancel', name: 'Cancel', component: Cancel},
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      isAuthenticated().then((loggedIn) => {
        if (loggedIn) {
          next({ path: '/' });
        } else {
          next();
        }
      });
    },
  },
  { path: '/register', name: 'Register', component: Register,
    beforeEnter: (to, from, next) => {
        isAuthenticated().then((loggedIn) => {
        if (loggedIn) {
            next({ path: '/' });
        } else {
            next();
        }
        });
    },
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
