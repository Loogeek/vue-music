import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'containers/recommend'
const rank = () => import('containers/rank')
const search = () => import('containers/search')
const singer = () => import('containers/singer')
const singerDetail = () => import('containers/singer-detail')
const recommendDetail = () => import('containers/recommend-detail')
const rankDetail = () => import('containers/rank-detail')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: recommend,
            children: [
                {
                    path: ':id',
                    component: recommendDetail
                }
            ]
        },
        {
            path: '/rank',
            name: 'rank',
            component: rank,
            children: [
                {
                    path: ':id',
                    component: rankDetail
                }
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/singer',
            name: 'singer',
            component: singer,
            children: [
                {
                    path: ':id',
                    component: singerDetail
                }
            ]
        }
    ]
})
