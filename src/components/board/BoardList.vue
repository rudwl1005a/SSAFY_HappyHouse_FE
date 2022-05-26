<template>
    <div>
        <div class="table-settings mb-4">
            <div class="row align-items-center justify-content-between">
                <div class="col col-md-6 col-lg-3 col-xl-4">
                    <div class="input-group me-2 me-lg-3 fmxw-400">
                        <span class="input-group-text">
                            <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                            </svg>
                        </span>
                        <input type="text" class="form-control" placeholder="Search boards" v-model="searchWord" @keyup="searchBoard"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-body border-0 shadow table-wrapper table-responsive">
            <table class="table table-hover" style="width: 100%; table-layout: fixed">
                <thead>
                    <tr>
                        <th class="col-1 border-gray-200">#</th>
                        <th class="col-6 border-gray-200">title</th>
                        <th class="col-2 border-gray-200">writer</th>
                        <th class="col-2 border-gray-200">date</th>
                        <th class="col-1 border-gray-200">view</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Item -->
                    <tr style="cursor: pointer" v-for="(board, index) in $store.state.boardList" :key="index" @click="boardDetail(board.boardId)">
                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                            <nobr><a href="#" class="fw-bold">{{ board.boardId }}</a></nobr>
                        </td>
                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                            <nobr><span class="fw-normal">{{ board.title }}</span></nobr>
                        </td>
                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                            <nobr><span class="fw-normal">{{ board.userId }}</span></nobr>
                        </td>
                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                            <nobr><span class="fw-normal">{{ board.regDt | yyyyMMdd }}</span></nobr>
                        </td>
                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                            <nobr><span class="fw-bold">{{ board.readCount }}</span></nobr>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
                <pagination v-on:call-parent="movePage"></pagination>
                <button @click="changeWrite" class="btn btn-tertiary" type="button" v-if="$store.state.boardType != '003'">글 쓰기</button>
                <button @click="changeWrite" class="btn btn-tertiary" type="button" v-if="$store.state.boardType == '003' && $store.state.login.userInfo.userCode == '102'">글 쓰기</button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";
import Pagination from  "@/components/Pagination.vue";

export default {
    components: { Pagination },
    data() {
        return {
            searchWord: ''
        }
    },
    methods: {
        // pagination
        movePage(pageIndex) {
            console.log("BoardMainVue : movePage : pageIndex : " + pageIndex);

            this.$store.commit("SET_PAGINATION_MOVE_PAGE", pageIndex);

            this.searchBoard();
        },
        changeWrite() {
            this.$store.commit("CHANGE_BOARD_STEP", "write");
        },
        boardDetail(boardId){
            console.log(boardId);
            this.$emit('boardDetail', boardId);
        },
        searchBoard(){
            if (this.$store.state.boardType == '001'){
                this.$store.commit("SET_SEARCHWORD", this.searchWord);
                this.freeBoard();
            } else if (this.$store.state.boardType == '002'){
                this.$store.commit("SET_SEARCHWORD", this.searchWord);
                this.qnaBoard();
            } else if (this.$store.state.boardType == '003'){
                this.$store.commit("SET_SEARCHWORD", this.searchWord);
                this.noticeBoard();
            }
        },
        async freeBoard() {
            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;
            
            try {
                let { data } = await http.get("/freeboards" + urlParams, { headers: { Authorization: this.$store.state.login.token } });
                console.log(data);

                if (data.result == 1) {
                    this.$store.commit("CHANGE_BOARDLIST", data);
                    this.$store.commit("SET_PAGINATION_TOTAL_LIST_ITEM_COUNT", data.count);
                } else {
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }

                this.$store.state.pagination.searchWord = '';
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
            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;

            try {
                let { data } = await http.get("/qnaboards" + urlParams, { headers: { Authorization: this.$store.state.login.token } });
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
            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;

            try {
                let { data } = await http.get("/noticeboards" + urlParams, { headers: { Authorization: this.$store.state.login.token } });
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
        // mounted() {
        //     this.$store.state.pagination.searchWord = '';
        //     this.searchWord = '';
        // }
    },
    filters: {
        // filter로 쓸 filter ID 지정
        yyyyMMdd: function (value) {
            // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
            if (value == "") return "";

            // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
            var js_date = new Date(value);

            // 연도, 월, 일 추출
            var year = js_date.getFullYear();
            var month = js_date.getMonth() + 1;
            var day = js_date.getDate();

            // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
            if (month < 10) {
                month = "0" + month;
            }

            if (day < 10) {
                day = "0" + day;
            }

            // 최종 포맷 (ex - '2021-10-08')
            return year + "-" + month + "-" + day;
        },
    },
    created() {
        if (this.$store.state.boardType == "001") {
            this.freeBoard();
        } else if (this.$store.state.boardType == "002") {
            this.qnaBoard();
        } else if (this.$store.state.boardType == "003") {
            this.noticeBoard();
        }

        console.log(this.$store.state.login.token);
        this.active = this.$store.state.boardType;
        console.log("active: " + this.active);
    },
};
</script>

<style></style>
