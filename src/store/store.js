import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        mainDiv: false, // true일때 크고, false일때 작다
        sidebar: false,
        sidebar_arrow: false,
        isLogin: false,
        userInfo: {},

        // board
        boardType: '001',  
        boardList: [],
        boardStep: 'list',
        boardDetail: {
            boardId: 0,
            title: "",
            content: "",
            userName: "",
            regDt: "",
            readCount: 0,
            fileList: [],
            sameUser: false,
        },
        replyNum: 0,

        pagination: {
            paginationDiv: "",

            limit: 10,
            offset: 0,
            searchWord: "",

            // pagination
            listRowCount: 10,
            pageLinkCount: 10,
            currentPageIndex: 1,
    
            totalListItemCount: 0,
        }
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
        CHANGE_BOARD_TYPE(state, payload) {
            console.log(payload);
            state.boardType = payload;
        },
        CHANGE_BOARDLIST(state, payload) {
            console.log(payload);
            state.boardList = payload.list;
        },
        CHANGE_BOARD_STEP(state, payload) {
            state.boardStep = payload;
        },
        CHANGE_BOARD_DETAIL(state, payload) {
            state.boardDetail = payload;
        },
        CHANGE_REPLY_NUM(state, payload) {
            state.replyNum = payload;
        },


        SET_PAGINATION_TOTAL_LIST_ITEM_COUNT(state, count) {
            state.pagination.totalListItemCount = count;
        },
        SET_PGINATION_MOVE_PAGE(state, pageIndex) {
            state.pagination.offset = (pageIndex - 1) * state.pagination.listRowCount;
            state.pagination.currentPageIndex = pageIndex;
        },
        // page setting
        SET_PAGINATION_MOVE_PAGE(state, payload) {
            state.pagination = { payload };
        }
    },
    getters : {
        getBoardType : function(state) {
            return state.boardType;
        },
        getBoardList : function(state) {
            return state.boardList;
        },
        getUserInfo(state) {
            return state.userInfo;
        },
    },
})