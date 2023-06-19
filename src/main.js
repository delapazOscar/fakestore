import { createApp } from 'vue'
import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import router from './router/index.js'
//bootstrap
import './assets/bootstrap.bundle.min.js'
import './assets/bootstrap.min.css'

//Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAb1Um28eeNT4MYVIdNJK3SD56YKOLwtsk",
  authDomain: "fakestoreodlp.firebaseapp.com",
  projectId: "fakestoreodlp",
  storageBucket: "fakestoreodlp.appspot.com",
  messagingSenderId: "835175626845",
  appId: "1:835175626845:web:55f30e8d9eff52c1af75b4",
  measurementId: "G-SJYZFQD1JS"
};

initializeApp(firebaseConfig);

createApp(App)
.use(router)
.mount('#app')
