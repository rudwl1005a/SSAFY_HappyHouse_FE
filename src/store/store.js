import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        mainDiv: false, // true일때 크고, false일때 작다
        sidebar: false,
        sidebar_arrow: false,
        isLogin: false,
        userInfo: [],
    },
    mutations : {
        CHANGE_MAIN(state, payload) {
            state.mainDiv = payload;
        },
        CHANGE_SIDEBAR(state, payload) {
            state.sidebar = payload;
        },
        CHANGE_SIDEBAR_ARROW(state, payload) {
            state.sidebar_arrow = payload;
        },
        LOGIN(state, payload) {
            state.isLogin = true;
            state.userInfo = payload;
        },
        LOGOUT(state, payload) {
            state.isLogin = false;
            state.userInfo = [];
        },
        UPDATE_USER(state, payload) {
            state.userInfo = payload;
            console.log(payload);
        },
        DELETE_USER(state, payload) {
            state.isLogin = false;
            state.userInfo = [];
        }
    }
})