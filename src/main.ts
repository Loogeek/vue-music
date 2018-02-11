import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import defaultPng from 'common/images/default.png'

// fastclick.attach(document.body)

Vue.use(VueLazyload, {
    loading: defaultPng
})

/* tslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
