<template>
    <div class="card mb-3 me-1">
        <div class="modal-body">
            <nav aria-label="breadcrumb" class="d-none d-md-inline-block ms-4 mt-3 mb-3">
                <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/">
                            <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item"><a @click="backToList">{{ $store.state.boardType == '001' ? '자유게시판' : $store.state.boardType == '002' ? 'QnA' : '공지사항' }}</a></li>
                    <!-- <li class="breadcrumb-item active" aria-current="page">글 상세 ( {{ $store.state.boardDetail.boardId }} )</li> -->
                    <li class="breadcrumb-item active" aria-current="page">{{ $store.state.boardDetail.title }}</li>
                </ol>
            </nav>
            <hr class="mt-1 mb-1 ms-1">
            <table class="table table-hover">
                <tbody>
                    <tr>
                        <td class="col-1">글번호</td>
                        <td class="col-10">{{ $store.state.boardDetail.boardId }}</td>
                    </tr>
                    <tr>
                        <td class="col-1">제목</td>
                        <td class="col-10">{{ $store.state.boardDetail.title }}</td>
                    </tr>
                    <tr style="height: 200px">
                        <td class="col-1">내용</td>
                        <td class="col-10" v-html="$store.state.boardDetail.content" style = "white-space : pre-wrap;"></td>
                    </tr>
                    <tr>
                        <td class="col-1">작성자</td>
                        <td class="col-10">{{ $store.state.boardDetail.userId }}</td>
                    </tr>
                    <tr>
                        <td class="col-1">작성일시</td>
                        <td class="col-10">{{ $store.state.boardDetail.regDt | yyyyMMdd }}</td>
                    </tr>
                    <tr>
                        <td class="col-1">조회수</td>
                        <td class="col-10">{{ $store.state.boardDetail.readCount }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button style="float: right" @click="deleteBoard" v-show="$store.state.boardDetail.userId == $store.state.login.userInfo.userId" 
                    class="btn btn-danger me-3" type="button">
                <font-awesome-icon icon="fa-solid fa-eraser" class="me-1"/> 삭제하기
            </button>
            <button style="float: right;" @click="updateBoard" v-show="$store.state.boardDetail.userId == $store.state.login.userInfo.userId" 
                    class="btn btn-info me-3" type="button">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-1"/> 수정하기
            </button>
        </div>
        <div class="input-group p-3">
            <span class="ms-3 pt-3 pb-3 input-group-text">{{ $store.state.login.userInfo.userId }}</span>
            <!-- <span class="m-3">  </span> -->
            <input @keydown.enter="insertReply" v-model="replyComment" style="margin-right: 0" type="text" class="form-control" placeholder="댓글을 달아주세요.." aria-label="댓글을 달아주세요.." aria-describedby="button-addon2">
            <button @click="insertReply" class="btn btn-tertiary" type="button">등록</button>
        </div>
        <hr class="ms-3 me-3">
        <div class="replyList">
            <div v-for="(reply, index) in replyList" :key="index" class="m-3">
                <span class="ms-3" style="font-size: 18px; color: navy"><strong>{{ reply.userId }}</strong></span>
                <span class="ms-2" style="color: lightgray">( {{ reply.regDt | yyyyMMdd }} )</span>
                <span class="ms-4" style="color: lightgray; font-size: 12px; cursor: pointer" @click="makeRereply(reply.commentId)"> 답글 </span>
                <span class="ms-4" style="color: lightgray; font-size: 12px; cursor: pointer" v-if="reply.userId == $store.state.login.userInfo.userId" @click="deleteReply(reply.commentId)"> 삭제 </span>
                <div class="pt-3 pb-3 ps-5">
                    <span>{{ reply.content }}</span>
                </div>
                <div v-for="(rereply, index2) in rereplyList" :key="index2">
                    <div v-show="rereply.parentId == reply.commentId" class="pt-2 ms-4" style="border-top: 1px solid #ececec; background-color: #f8f8f8;">
                        <font-awesome-icon icon="fa-solid fa-arrow-turn-up" style="transform: rotate(90deg); margin: auto 0" class="ms-3"/>
                        <span class="ms-3" style="font-size: 18px; color: navy"><strong>{{ rereply.userId }}</strong></span>
                        <span class="ms-2" style="color: lightgray">( {{ rereply.regDt | yyyyMMdd }} )</span>
                        <span class="ms-4" style="color: lightgray; font-size: 12px; cursor: pointer" v-if="rereply.userId == $store.state.login.userInfo.userId" @click="deleteRereply(rereply.commentId)"> 삭제 </span>
                        <div class="pt-3 pb-3">
                            <span class="ms-5">{{ rereply.content }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="$store.state.replyNum == reply.commentId" class="m-4">
                    <div class="input-group pt-2" style="border-top: 1px solid #ececec">
                        <font-awesome-icon icon="fa-solid fa-arrow-turn-up" style="transform: rotate(90deg); margin: auto 0" class="ms-3"/>
                        <span class="ms-3 pt-3 pb-3 input-group-text" style="border-radius: 8px 0 0px 8px">{{ $store.state.login.userInfo.userId }}</span>
                        <input @keydown.enter="insertRereply(reply.commentId)" v-model="rereplyComment" style="margin-right: 0" type="text" class="form-control" placeholder="댓글을 달아주세요.." aria-label="댓글을 달아주세요.." aria-describedby="button-addon2">
                        <button @click.stop="insertRereply(reply.commentId)" class="btn btn-tertiary" style="margin-right: 10px" type="button">등록</button>
                    </div>
                </div>
                <hr class="me-1">
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueAlertify from "vue-alertify";

Vue.use(CKEditor).use(VueAlertify);

import http from "@/common/axios.js";

export default {
    data() {
        return {
            replyComment: '',
            rereplyComment: '',
            // replyList: [],
            // rereplyList: [],
        }
    },
    computed: {
        replyList :{
            get() {
                return this.$store.state.boardDetail.commentList;
            },
        },
        rereplyList : {
            get() {
                return this.$store.state.boardDetail.recommentList;
            }
        }
    },
    methods: {
        updateBoard() {
            this.$store.commit("CHANGE_BOARD_STEP", "update");
        },
        async deleteBoard() {
            try {
                let { data } = await http.delete("/boards/" + this.$store.state.boardDetail.boardId);
                console.log(data);

                if (data.result == 1) {
                    this.$store.commit("CHANGE_BOARD_STEP", "list");
                    
                    this.$router.push("/board");

                    this.$alertify.success("글을 삭제하였습니다.");
                } else {
                    this.$alertify.error("글 삭제 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("글 삭제 과정에 문제가 생겼습니다.");
                }
            }
        },
        makeRereply(commentId){
            if (this.$store.state.replyNum == commentId){
                this.$store.commit('CHANGE_REPLY_NUM', 0);
            } else {
                this.$store.commit('CHANGE_REPLY_NUM', commentId);
            }
        },
        async insertReply(){
            let commentObj = {
                boardId: this.$store.state.boardDetail.boardId,
                userId: this.$store.state.login.userInfo.userId,
                content: this.replyComment,
            };

            try {
                let { data } = await http.post("/comments/" + this.$store.state.boardDetail.boardId, commentObj);
                console.log(data);

                if (data == "success") {
                    this.$emit('refreshBoardDetail', this.$store.state.boardDetail.boardId);
                    this.replyComment= '';

                    this.$alertify.success("댓글을 작성하였습니다.");
                } else {
                    this.$alertify.error("댓글 작성 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("댓글 작성 과정에 문제가 생겼습니다.");
                }
            }
        },
        async insertRereply(commentId) {
            let commentObj = {
                boardId: this.$store.state.boardDetail.boardId,
                userId: this.$store.state.login.userInfo.userId,
                parentId: commentId,
                content: this.rereplyComment,
            };

            try {
                let { data } = await http.post("/comments/" + this.$store.state.boardDetail.boardId, commentObj);
                console.log(data);

                if (data == "success") {
                    this.$emit('refreshBoardDetail', this.$store.state.boardDetail.boardId);
                    this.rereplyComment= '';

                    this.$alertify.success("댓글을 작성하였습니다.");
                } else {
                    this.$alertify.error("댓글 작성 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("댓글 작성 과정에 문제가 생겼습니다.");
                }
            }
        },
        async deleteReply(commentId){
            try {
                let { data } = await http.delete("/comments/" + commentId);
                console.log(data);

                if (data == "success") {
                    this.$emit('refreshBoardDetail', this.$store.state.boardDetail.boardId);
                    this.rereplyComment= '';

                    this.$alertify.success("댓글을 삭제하였습니다.");
                } else {
                    this.$alertify.error("댓글 삭제 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("댓글 삭제 과정에 문제가 생겼습니다.");
                }
            }
        },
        async deleteRereply(commentId){
            try {
                let { data } = await http.delete("/comments/re/" + commentId);
                console.log(data);

                if (data == "success") {
                    this.$emit('refreshBoardDetail', this.$store.state.boardDetail.boardId);
                    this.rereplyComment= '';

                    this.$alertify.success("댓글을 삭제하였습니다.");
                } else {
                    this.$alertify.error("댓글 삭제 과정에 문제가 생겼습니다.");
                }
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("댓글 삭제 과정에 문제가 생겼습니다.");
                }
            }
        },
        backToList(){
            this.$store.commit("CHANGE_BOARD_STEP", "list");
        }

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
    mounted() {
        this.$store.commit('CHANGE_REPLY_NUM', 0);
        console.log(this.$store.state.boardDetail);
        this.replyList = this.$store.state.boardDetail.commentList;
        this.rereplyList = this.$store.state.boardDetail.recommentList;
    },

};
</script>

<style scoped>

</style>
