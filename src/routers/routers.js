import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import UserInfo from '@/components/UserInfo.vue'
import ApartSearch from '@/components/ApartSearch.vue'
import Error404 from '@/components/error/404.vue'
import Board from '@/components/Board.vue'

// NavigationDuplicated 에러 해결
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            name: 'Login',
            path: '/login',
            component: Login
        },
        {
            name: 'ApartSearch',
            path: '/apartsearch',
            component: ApartSearch
        },
        {
            name: 'Register',
            path: '/register',
            component: Register
        },
        {
            name: 'UserInfo',
            path: '/userinfo',
            component: UserInfo,
        },
        {
            name: 'Board',
            path: '/board',
            component: Board,
        },
        {
            name: 'Error404',
            path: '/404',
            component: Error404,
        },

    ]
});