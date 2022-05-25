import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import UserInfo from '@/views/UserInfo.vue'
import ApartSearch from '@/views/ApartSearch.vue'
import Board from '@/views/Board.vue'
import Error404 from '@/components/error/404.vue'

import store from "@/store/store.js"

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
            component: ApartSearch,
            beforeEnter: (to, from, next) => {
                if(!store.state.login.isLogin){
                    alert('로그인 해 주세요');
                    next("/login");
                } else {
                    return next();
                }
            }
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
            beforeEnter: (to, from, next) => {
                if(!store.state.login.isLogin){
                    alert('로그인 해 주세요');
                    next("/login");
                } else {
                    return next();
                }
            }
        },
        {
            name: 'Board',
            path: '/board',
            component: Board,
            beforeEnter: (to, from, next) => {
                if(!store.state.login.isLogin){
                    alert('로그인 해 주세요');
                    next("/login");
                } else {
                    return next();
                }
            }
        },
        {
            name: 'Error404',
            path: '/404',
            component: Error404,
        },
        
    ]
});