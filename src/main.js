import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Venues from './Venues.vue';
import Users from './Users.vue';
import userProfile from './userProfile.vue'
import Register from './Register.vue';
import VenuesAdmin from './VenueAd.vue';
import VenuesEdit from './VenueEdit.vue';
import VenuesList from './VenuesList.vue';

// import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, axios);

import Review from './Review.vue';
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import  VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import VueResource from 'vue-resource';
Vue.use(VueResource);
// Vue.http.options.emulateJSON = true;

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



const routes = [
  {
    path: "/",
    name : "home",
    component: Home
  },

  {
    path : "/users/:userId",
    name : "user",
    component : Users
  },

  {
    path : '/users',
    name : "users",
    component : Users
  },

  {
    path : '/users/profile',
    name : "userProfile",
    component : require('./userProfile.vue').default
  },
  {
    path : '/venues',
    name : "venues",
    component : Venues
  },

  {
    path : '/venue/review',
    name : "review",
    component : Review
  },

  {
    path : '/venues/admin',
    name : "venuesAdmin",
    component : VenuesAdmin
  },

  {
    path : '/venues/edit',
    name : "venuesEdit",
    component : VenuesEdit
  },

  {
    path : '/venues/listAd',
    name : "venuesList",
    component : VenuesList
  },

  {
    path : "/venues/:venueId",
    name : "venue",
    component : Venues
  },

  {
    path : '/register',
    name : "register",
    component : Register
  }

];

const router = new VueRouter ({
  routes : routes,
  mode : 'history'
});



new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
