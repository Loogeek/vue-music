import Vue from 'vue';
import Router from 'vue-router';
import recommend from 'containers/recommend';
import rank from 'containers/rank';
import search from 'containers/search';
import singer from 'containers/singer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    }             
  ]
});
