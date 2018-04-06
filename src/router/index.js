import Vue from 'vue'
import Router from 'vue-router'
import recommend from 'pages/recommend'
const rank = () => import('pages/rank')
const search = () => import('pages/search')
const singer = () => import('pages/singer')
const singerDetail = () => import('pages/singer-detail')
const recommendDetail = () => import('pages/recommend-detail')
const rankDetail = () => import('pages/rank-detail')
const userCenter = () => import('pages/user-center')

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
        },
        {
            path: '/user',
            name: 'user',
            component: userCenter
        }
    ]
})
