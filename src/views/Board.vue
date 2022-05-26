<template>
    <div :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }" style="margin: 80px 10px 0 0">
        <nav>
            <div class="nav nav-tabs mb-4" id="nav-tab" role="tablist">
                <a @click="freeBoard" class="nav-item nav-link" :class="{ 'active' : active == '001'}" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" style="margin-right: 10px">자유게시판</a>
                <a @click="qnaBoard" class="nav-item nav-link" :class="{ 'active' : active == '002'}" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" style="margin-right: 10px">Q&A</a>
                <a @click="noticeBoard" class="nav-item nav-link" :class="{ 'active' : active == '003'}" id="nav-contact-tab" data-bs-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">공지사항</a>
            </div>
        </nav>
        <board-list v-if="$store.state.boardStep == 'list'"
                    @boardDetail="boardDetail">
        </board-list>
        <board-write v-if="$store.state.boardStep == 'write'"
                    @freeBoard="freeBoard" @qnaBoard="qnaBoard" @noticeBoard="noticeBoard">
        </board-write>
        <board-detail v-if="$store.state.boardStep == 'detail'"
                    @refreshBoardDetail="boardDetail"></board-detail>
        <board-update v-if="$store.state.boardStep == 'update'"
                    @freeBoard="freeBoard" @qnaBoard="qnaBoard" @noticeBoard="noticeBoard">
        </board-update>
    </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";

export default {
    components: { BoardList, BoardWrite, BoardDetail, BoardUpdate },
    data() {
        return {
            active: '',
        };
    },
    methods: {
        async freeBoard() {
            this.$store.commit("CHANGE_BOARD_TYPE", "001");
            this.$store.commit("CHANGE_BOARD_STEP", "list");
            this.$store.commit("SET_PAGINATION_DEFAULT");

            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;

            try {
                let { data } = await http.get("/freeboards" + urlParams);
                console.log(data);

                if (data.result == 1) {
                    this.$store.commit("CHANGE_BOARDLIST", data);
                    this.$store.commit("SET_PAGINATION_TOTAL_LIST_ITEM_COUNT", data.count);
                } else {
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            }
        },
        async qnaBoard() {
            this.$store.commit("CHANGE_BOARD_TYPE", "002");
            this.$store.commit("CHANGE_BOARD_STEP", "list");
            this.$store.commit("SET_PAGINATION_DEFAULT");

            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;

            try {
                let { data } = await http.get("/qnaboards" + urlParams);
                console.log(data);

                if (data.result == 1) {
                    this.$store.commit("CHANGE_BOARDLIST", data);
                    this.$store.commit("SET_PAGINATION_TOTAL_LIST_ITEM_COUNT", data.count);
                } else {
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            }
        },
        async noticeBoard() {
            this.$store.commit("CHANGE_BOARD_TYPE", "003");
            this.$store.commit("CHANGE_BOARD_STEP", "list");
            this.$store.commit("SET_PAGINATION_DEFAULT");

            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;

            try {
                let { data } = await http.get("/noticeboards" + urlParams);
                console.log(data);

                if (data.result == 1) {
                    this.$store.commit("CHANGE_BOARDLIST", data);
                    this.$store.commit("SET_PAGINATION_TOTAL_LIST_ITEM_COUNT", data.count);
                } else {
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                // if (error.response.status == "500") {
                //     this.$alertify.error("로그인 해 주세요.");
                //     this.$router.push("/login");
                // } else {
                    console.error(error);
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                // }
            }
        },
        async boardDetail(boardId) {
            console.log(boardId);
            try {
                let response = await http.get('/boards/' + boardId);
                let { data } = response;
                console.log(data);

                if (data.result == 'login'){
                    this.$router.push("/login");
                } else {
                    let boardNew = { ...data.dto };
                    this.$store.commit('CHANGE_BOARD_DETAIL', boardNew);
                    console.log(boardNew);
                    
                    this.$store.commit("CHANGE_BOARD_REPLY", data.commentList);
                    this.$store.commit("CHANGE_BOARD_REREPLY", data.recommentList);

                    console.warn("lists:")
                    console.log(this.$store.state.boardDetail.commentList);
                    console.log(this.$store.state.boardDetail.recommentList);

                    this.$store.commit('CHANGE_BOARD_STEP', "detail");
                }
            } catch(error) {
                console.error(error);
            }
        },
    },
    created() {

        if (this.$store.state.boardType == "001") {
            this.freeBoard();
        } else if (this.$store.state.boardType == "002") {
            this.qnaBoard();
        } else if (this.$store.state.boardType == "003") {
            this.noticeBoard();
        } else if (this.$store.state.boardType == "004") {
            this.$store.commit('CHANGE_BOARD_TYPE', "003");
            this.$store.commit('CHANGE_BOARD_STEP', "detail");
        } else if (this.$store.state.boardType == "005") {
            this.$store.commit('CHANGE_BOARD_TYPE', "001");
            this.$store.commit('CHANGE_BOARD_STEP', "detail");
        } else if (this.$store.state.boardType == "006") {

            if (this.$store.state.boardUserType == "001") {
                this.$store.commit('CHANGE_BOARD_TYPE', "001");
                this.$store.commit('CHANGE_BOARD_STEP', "detail");
            } else if(this.$store.state.boardUserType == "002") {
                this.$store.commit('CHANGE_BOARD_TYPE', "002");
                this.$store.commit('CHANGE_BOARD_STEP', "detail");
            } else if(this.$store.state.boardUserType == "003") {
                this.$store.commit('CHANGE_BOARD_TYPE', "003");
                this.$store.commit('CHANGE_BOARD_STEP', "detail");
            }

        }

        console.log(this.$store.state.login.token);
        this.active = this.$store.state.boardType;
        console.log("active: " + this.active);
    },
};
</script>

<style></style>
