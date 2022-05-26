<template>
    <div class="mainTop d-flex flex-column min-vh-100 pe-2" :style="inlineStyle" :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }">
        <div class="row">
            <div class="col-md-12">
                <h2 class="pt-5" style="text-align: center; color: rgb(71 97 161)">HappyHouse</h2>

                <div class="row">
                    <div class="col-md-12">
                        <div class="col card card-body border-0 m-3 mainInfo">
                            <p>{{ datetime }}</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <!-- 공지사항 Statt -->
                        <div class="col card card-body border-0 shadow table-wrapper table-responsive m-3 mainBoard">
                            <h3 style="text-align: center">공지 사항</h3>
                            <table class="table table-hover" style="width: 100%; table-layout: fixed">
                                <thead>
                                    <tr style="color: red">
                                        <th class="col-2 border-gray-200">#</th>
                                        <th class="col-5 border-gray-200">title</th>
                                        <th class="col-2 border-gray-200">writer</th>
                                        <th class="col-3 border-gray-200">date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="cursor: pointer" v-for="(board, index) in noticeList" :key="index" @click="noticeBoardDetail(board.boardId)">
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index < 5">
                                            <nobr><a href="#" class="fw-bold">{{ board.boardId }}</a></nobr>
                                        </td>
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index < 5">
                                            <nobr><span class="fw-normal">{{ board.title }}</span></nobr>
                                        </td>
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index < 5">
                                            <nobr><span class="fw-normal">{{ board.userId }}</span></nobr>
                                        </td>
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index < 5">
                                            <nobr><span class="fw-normal">{{ board.regDt | yyyyMMdd }}</span></nobr>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 공지사항 End -->
                    </div>
                    <div class="col-md-6">
                        <!-- 자유게시판 Start -->
                        <div class="col card card-body border-0 shadow table-wrapper table-responsive m-3 mainBoard">
                            <h3 style="text-align: center">최근 자유게시판</h3>
                            <table class="table table-hover" style="width: 100%; table-layout: fixed">
                                <thead>
                                    <tr style="color: rgb(71 97 161)">
                                        <th class="col-2 border-gray-200">#</th>
                                        <th class="col-5 border-gray-200">title</th>
                                        <th class="col-2 border-gray-200">writer</th>
                                        <th class="col-3 border-gray-200">date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="cursor: pointer" v-for="(board, index2) in freeList" :key="index2" @click="freeBoardDetail(board.boardId)">
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index2 < 5">
                                            <nobr><a href="#" class="fw-bold">{{ board.boardId }}</a></nobr>
                                        </td>
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index2 < 5">
                                            <nobr><span class="fw-normal">{{ board.title }}</span></nobr>
                                        </td>
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index2 < 5">
                                            <nobr><span class="fw-normal">{{ board.userId }}</span></nobr>
                                        </td>
                                        <td style="width: 100%; overflow: hidden; text-overflow: ellipsis" v-if="index2 < 5">
                                            <nobr><span class="fw-normal">{{ board.regDt | yyyyMMdd }}</span></nobr>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 자유게시판 End -->
                    </div>
                </div>
            </div>
        </div>

        <footer class="navbar-fixed-bottom mt-auto">
            <div class="card card-body border-0 shadow mainFooter">
                <span style="display: inline-block"
                    ><font-awesome-icon icon="fa-solid fa-copyright" /> Copyright 2022 HappyHouse (부울경3반 8조 구두성, 민경대) <span class="me-4"></span> FE GitHub :
                    <a href="https://github.com/rudwl1005a/SSAFY_HappyHouse_FE"><font-awesome-icon icon="fa-brands fa-github" style="color: white" /></a> <span class="me-4"></span> BE GitHub :
                    <a href="https://github.com/rudwl1005a/SSAFY_HappyHouse_BE"><font-awesome-icon icon="fa-brands fa-github" style="color: white" /></a>
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";

import dayjs from "dayjs";
Vue.prototype.dayjs = dayjs;

export default {
    data() {
        return {
            noticeList: [],
            freeList: [],
            timer: "",
            datetime: "",
        };
    },
    methods: {
        async noticeBoard() {
            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;

            try {
                let { data } = await http.get("/noticeboards" + urlParams);
                console.log(data);

                if (data.result == 1) {
                    this.noticeList = data.list;
                    // this.$store.commit("CHANGE_BOARDLIST", data);
                } else {
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                console.error(error);
                this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
            }
        },
        async noticeBoardDetail(boardId) {
            console.log(boardId);
            try {
                let response = await http.get("/boards/" + boardId);
                let { data } = response;
                console.log(data);

                if (data.result == "login") {
                    this.$router.push("/login");
                } else {
                    let boardNew = { ...data.dto };

                    this.$store.commit("CHANGE_BOARD_DETAIL", boardNew);
                    console.log(boardNew);

                    // this.$store.commit('CHANGE_BOARD_STEP', "detail");
                    this.$store.commit("CHANGE_BOARD_TYPE", "004");

                    this.$router.push("/board");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                }
                console.error(error);
            }
        },

        async freeBoard() {
            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;

            try {
                let { data } = await http.get("/freeboards" + urlParams);
                console.log(data);

                if (data.result == 1) {
                    this.freeList = data.list;
                    console.warn(this.freeList);
                } else {
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                console.error(error);
                this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
            }
        },
        async freeBoardDetail(boardId) {
            console.log(boardId);
            try {
                let response = await http.get("/boards/" + boardId);
                let { data } = response;
                console.log(data);

                if (data.result == "login") {
                    this.$router.push("/login");
                } else {
                    let boardNew = { ...data.dto };

                    this.$store.commit("CHANGE_BOARD_DETAIL", boardNew);
                    console.log(boardNew);

                    this.$store.commit("CHANGE_BOARD_TYPE", "005");

                    this.$router.push("/board");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                }
                console.error(error);
            }
        },
    },
    mounted() {
        this.timer = setInterval(() => {
            this.datetime = this.dayjs().format("h:mm:ss A");
        }, 1000);
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    created() {
        this.noticeBoard();
        this.freeBoard();
    },
    computed: {
        bgImage() {
            return require("../assets/img/apartmainbg.jpg");
        },
        inlineStyle() {
            return {
                backgroundImage: `url(${this.bgImage})`,
            };
        },
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
};
</script>

<style>
.mainTop {
    /* height: 100vh; */
    background-repeat: no-repeat;
    background-size: cover;
}

.mainInfo {
    background-color: rgba(255, 255, 255, 0);
    height: 35vh;
}

.mainInfo p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 60px;
    text-align: center;

    position: relative;
    top: 12vh;
}

.mainBoard {
    background-color: rgba(255, 255, 255, 0.75);
}

.mainFooter {
    margin-left: -15px;
    margin-right: -10px;
    background-color: rgba(51, 57, 107, 0.75);
    text-align: center;
    color: white;
}
</style>
