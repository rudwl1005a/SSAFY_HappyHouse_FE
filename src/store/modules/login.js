const login = {
    namespaced: true,
    state: {
        isLogin: false,
        userInfo: {},
        token: ''
    },
    mutations: {
        LOGIN(state, payload) {
            console.log(payload);
            state.isLogin = true;
            state.userInfo = payload;
        },
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        LOGOUT(state, payload) {
            state.isLogin = false;
            state.userInfo = {};
        },
        UPDATE_USER(state, payload) {
            state.userInfo = payload;
            console.log(payload);
        },
        DELETE_USER(state, payload) {
            state.isLogin = false;
            state.userInfo = {};
        },
    }
}

export default login;