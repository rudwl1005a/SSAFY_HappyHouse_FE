import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mainDiv: false, // true일때 크고, false일때 작다
    sidebar: false,
    sidebar_arrow: false,
    isLogin: false,
    userInfo: { userId: "123" },

    pagination: {
      // pagination
      paginationDiv: "", // id 로 해줘야함

      limit: 10,
      offset: 0,
      searchWord: "",

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
    },
    //////////////////////// pagination ////////////////////////////////
    SET_PAGINATION_TOTAL_LIST_ITEM_COUNT(state, count) {
      state.pagination.totalListItemCount = count;
    },
    SET_PAGINATION_MOVE_PAGE(state, payload) {
      state.pagination = { payload };
    },
  },
  getters: {
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
          (state.pagination.currentPageIndex / state.pagination.pageLinkCount - 1) *
            state.pagination.pageLinkCount +
          1
        );
      } else {
        return (
          Math.floor(state.pagination.currentPageIndex / state.pagination.pageLinkCount) *
            state.pagination.pageLinkCount +
          1
        );
      }
    },
    getEndPageIndex: function (state, getters) {
      let ret = 0;
      if (state.pagination.currentPageIndex % state.pagination.pageLinkCount == 0) {
        //10, 20...맨마지막
        ret =
          (state.pagination.currentPageIndex / state.pagination.pageLinkCount - 1) *
            state.pagination.pageLinkCount +
          state.pagination.pageLinkCount;
      } else {
        ret =
          Math.floor(state.pagination.currentPageIndex / state.pagination.pageLinkCount) *
            state.pagination.pageLinkCount +
          state.pagination.pageLinkCount;
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
      if (
        Math.floor(getters.getPageCount / state.pagination.pageLinkCount) *
          state.pagination.pageLinkCount <
        state.pagination.currentPageIndex
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
});
