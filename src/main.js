import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import style from 'common/scss/index.scss'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
    loading: require('common/images/default.png')
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
