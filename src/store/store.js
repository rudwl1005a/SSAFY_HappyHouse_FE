import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import login from "@/store/modules/login.js";

export default new Vuex.Store({
  modules: {
    login,
  },
  plugins: [createPersistedState({
    paths: ["login"],
    storage: sessionStorage,
  })],
  state: {
    mainDiv: false, // true일때 크고, false일때 작다
    sidebar: false,
    sidebar_arrow: false,

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
      sameUser: false,
      commentList: [],
      recommentList: [],
    },
    replyNum: 0, // 대댓글 토글을 위한 변수
    boardUserType: '',

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
    },

  },
  mutations: {
    CHANGE_MAIN(state, payload) {
      state.mainDiv = payload;
    },
    CHANGE_SIDEBAR(state, payload) {
      state.sidebar = payload;
    },
    CHANGE_SIDEBAR_ARROW(state, payload) {
      state.sidebar_arrow = payload;
    },
    CHANGE_BOARD_TYPE(state, payload) {
      //console.log(payload);
      state.boardType = payload;
    },
    CHANGE_BOARDLIST(state, payload) {
      //console.log(payload);
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
    CHANGE_BOARD_DEFAULT(state, payload) {
      state.boardStep = 'list';
      state.boardType = '001';
    },
    CHANGE_BOARD_USER_TYPE(state, payload) {
      state.boardUserType = payload;
    },
    CHANGE_BOARD_REPLY(state, payload) {
      state.boardDetail.commentList = payload;
    },
    CHANGE_BOARD_REREPLY(state, payload) {
      state.boardDetail.recommentList = payload;
    },
    //////////////////////// pagination ////////////////////////////////
    SET_PAGINATION_TOTAL_LIST_ITEM_COUNT(state, count) {
      state.pagination.totalListItemCount = count;
    },
    SET_PAGINATION_MOVE_PAGE(state, pageIndex) {
      state.pagination.offset = (pageIndex - 1) * state.pagination.listRowCount;
      state.pagination.currentPageIndex = pageIndex;
    },
    SET_PAGINATION_DEFAULT(state, payload){
      state.pagination.limit = 10;
      state.pagination.offset = 0;
      state.pagination.currentPageIndex = 1;
    },
    // // page setting
    // SET_PAGINATION_MOVE_PAGE(state, payload) {
    //   state.pagination = { payload };
    // },
    SET_SEARCHWORD(state, searchWord) {
      state.pagination.searchWord = searchWord;
    }
    ///////////////////////////////////////////////
    
  },
  getters: {
    getBoardType: function (state) {
      return state.boardType;
    },
    getBoardList: function (state) {
      return state.boardList;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    /////////////////  pagination  /////////////////////
    getPageCount: function (state) {
      return Math.ceil(
        state.pagination.totalListItemCount / state.pagination.listRowCount
      );
    },
    getStartPageIndex: function (state) {
      if (state.pagination.currentPageIndex % state.pagination.pageLinkCount == 0) {
        //10, 20...맨마지막
        return (
          (state.pagination.currentPageIndex / state.pagination.pageLinkCount - 1) * state.pagination.pageLinkCount + 1 );
      } else {
        return (
          Math.floor(state.pagination.currentPageIndex / state.pagination.pageLinkCount) * state.pagination.pageLinkCount + 1 );
      }
    },
    getEndPageIndex: function (state, getters) {
      let ret = 0;
      if (state.pagination.currentPageIndex % state.pagination.pageLinkCount == 0) {
        //10, 20...맨마지막
        ret = (state.pagination.currentPageIndex / state.pagination.pageLinkCount - 1) * state.pagination.pageLinkCount + state.pagination.pageLinkCount;
      } else {
        ret = Math.floor(state.pagination.currentPageIndex / state.pagination.pageLinkCount) * state.pagination.pageLinkCount + state.pagination.pageLinkCount;
      }
      // 위 오류나는 코드를 아래와 같이 비교해서 처리
      return ret > getters.getPageCount ? getters.getPageCount : ret;
    },
    getPrev: function (state) {
      if (state.pagination.currentPageIndex <= state.pagination.pageLinkCount) {
        return false;
      } else {
        return true;
      }
    },
    getNext: function (state, getters) {
      if ( Math.floor(getters.getPageCount / state.pagination.pageLinkCount) * state.pagination.pageLinkCount <  state.pagination.currentPageIndex ) {
        return false;
      } else {
        return true;
      }
    },
  },
})
