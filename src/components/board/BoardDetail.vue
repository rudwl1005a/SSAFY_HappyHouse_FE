<template>
    <div class="card mb-3 me-1">
        <div class="modal-body">
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
            <!-- <button v-show="$store.state.boardDetail.sameUser" @click="changeToUpdate" class="btn btn-info" type="button">글 수정하기</button>
            <button v-show="$store.state.boardDetail.sameUser" @click="changeToDelete" class="btn btn-danger" type="button">글 삭제하기</button> -->
            <button style="float: right" @click="changeToDelete" class="btn btn-danger me-3" type="button">
                <font-awesome-icon icon="fa-solid fa-eraser" class="me-1"/>
                삭제하기
            </button>
            <button style="float: right;" @click="changeToUpdate" class="btn btn-info me-3" type="button">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" class="me-1"/>
                수정하기
            </button>
        </div>
        <div class="input-group p-3">
            <span class="ms-3 pt-3 pb-3 input-group-text">userId</span>
            <!-- <span class="m-3">  </span> -->
            <input @keydown.enter="reply" v-model="replyComment" style="margin-right: 0" type="text" class="form-control" placeholder="댓글을 달아주세요.." aria-label="댓글을 달아주세요.." aria-describedby="button-addon2">
            <button @click="reply" class="btn btn-tertiary" type="button">등록</button>
        </div>
        <hr class="ms-3 me-3">
        <div class="replyList">
            <div v-for="(reply, index) in replyList" :key="index" class="m-3">
                <span class="ms-3" style="font-size: 18px; color: navy"><strong>{{ reply.userId }}</strong></span>
                <span class="ms-2" style="color: lightgray">( {{ reply.regDt }} )</span>
                <span class="ms-4" style="color: lightgray; font-size: 12px; cursor: pointer" @click="makeRereply(reply.comment_id)"> 답글 </span>
                <div class="pt-3 pb-3 ps-5">
                    <span>{{ reply.comment }}</span>
                    <!-- <span class="me-3" style="float: right; text-align: end; font-size: 12px; color: lightgray; cursor: pointer">답글</span> -->
                </div>
                <div v-for="(rereply, index2) in rereplyList" :key="index2">
                    <div v-show="rereply.parent_id == reply.comment_id" class="pt-2 ms-4" style="border-top: 1px solid #ececec; background-color: #f8f8f8;">
                        <font-awesome-icon icon="fa-solid fa-arrow-turn-up" style="transform: rotate(90deg); margin: auto 0" class="ms-3"/>
                        <span class="ms-3" style="font-size: 18px; color: navy"><strong>{{ rereply.userId }}</strong></span>
                        <span class="ms-2" style="color: lightgray">( {{ rereply.regDt }} )</span>
                        <div class="pt-3 pb-3">
                            <span class="ms-5">{{ rereply.comment }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="$store.state.replyNum == reply.comment_id" class="m-4">
                    <div class="input-group pt-2" style="border-top: 1px solid #ececec">
                        <font-awesome-icon icon="fa-solid fa-arrow-turn-up" style="transform: rotate(90deg); margin: auto 0" class="ms-3"/>
                        <span class="ms-3 pt-3 pb-3 input-group-text" style="border-radius: 8px 0 0px 8px">userId</span>
                        <input @keydown.enter="rereply(reply.comment_id)" v-model="rereplyComment" style="margin-right: 0" type="text" class="form-control" placeholder="댓글을 달아주세요.." aria-label="댓글을 달아주세요.." aria-describedby="button-addon2">
                        <button @click.stop="rereply(reply.comment_id)" class="btn btn-tertiary" style="margin-right: 10px" type="button">등록</button>
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
            replyList: [
                {
                    comment_id: 1,
                    userId: "id1",
                    comment: "comment1",
                    regDt: "2022-05-24"
                },
                {
                    comment_id: 2,
                    userId: "id2",
                    comment: "comment2",
                    regDt: "2022-05-24"
                },
                {
                    comment_id: 3,
                    userId: "id3",
                    comment: "comment3",
                    regDt: "2022-05-24"
                },
                {
                    comment_id: 4,
                    userId: "id4",
                    comment: "comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4",
                    regDt: "2022-05-24"
                },
                {
                    comment_id: 5,
                    userId: "id5",
                    comment: "comment5",
                    regDt: "2022-05-24"
                },
            ],
            rereplyList: [
                {
                    comment_id: 6,
                    parent_id: 1,
                    userId: "id6",
                    comment: "comment6",
                    regDt: "2022-05-24"
                },
                {
                    comment_id: 7,
                    parent_id: 1,
                    userId: "id7",
                    comment: "comment7",
                    regDt: "2022-05-24"
                },
                {
                    comment_id: 8,
                    parent_id: 2,
                    userId: "id8",
                    comment: "comment8",
                    regDt: "2022-05-24"
                },
            ],
        }
    },
    methods: {
        changeToUpdate() {
            this.$emit("call-parent-change-to-update");
        },
        changeToDelete() {
            this.$emit("call-parent-change-to-delete");
        },
        makeRereply(commentId){
            if (this.$store.state.replyNum == commentId){
                this.$store.commit('CHANGE_REPLY_NUM', 0);
            } else {
                this.$store.commit('CHANGE_REPLY_NUM', commentId);
            }
        },
        reply(){
            alert("board_id : " + this.$store.state.boardDetail.boardId + " / " + this.replyComment);
        },
        rereply(commentId) {
            alert("comment_id : " + commentId + " / " + this.rereplyComment);
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
    mounted() {
        this.$store.commit('CHANGE_REPLY_NUM', 0);
    }
};
</script>

<style scoped>

</style>
