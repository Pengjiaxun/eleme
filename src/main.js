import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/scss/index.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
	{path: '/goods', component: goods},
	{path: '/seller', component: seller},
	{path: '/ratings', component: ratings}
];

const router = new VueRouter({
	routes,
	linkActiveClass: 'active'
});

const app = new Vue({
	router,
	render: h => h(App)
}).$mount('#app');