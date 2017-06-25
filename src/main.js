import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import style from 'common/scss/index.scss';

fastclick.attach(document.body);

Vue.use(VueLazyload, {
    loading: require('common/images/default.png')
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
