<template>
    <div class="card">
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ms-4 mt-3">
            <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent mb-0">
                <li class="breadcrumb-item">
                    <router-link to="/">
                        <svg class="icon icon-xxs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </router-link>
                </li>
                <li class="breadcrumb-item"><a @click="backToList">{{ $store.state.boardType == '001' ? '자유게시판' : $store.state.boardType == '002' ? 'QnA' : '공지사항' }}</a></li>
                <li class="breadcrumb-item active" aria-current="page">글 수정</li>
            </ol>
        </nav>
        <div class="m-3">
            <input v-model="title" type="text" class="form-control" placeholder="제목"/>
        </div>
        <div class="m-3">
            <div id="divEditorInsert"></div>
        </div>
        <div>
            <button @click="cancel" class="btn btn-tertiary m-3" type="button" style="float: right">취소</button>
            <button @click="updateValidate" class="btn btn-tertiary mt-3 ml-3 mr-3" type="button" style="float: right">수정</button>
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
            title: "",
            CKEditor: "",
        };
    },
    methods: {
        cancel() {
            this.$store.state.boardStep = "list";
        },
        updateValidate() {
            if (this.title != "" && this.title.length != 0){
                if(this.CKEditor.getData().length != 0){
                    this.boardUpdate();
                } else {
                    this.$alertify.error("내용을 작성해 주세요");
                }
            } else {
                this.$alertify.error("제목을 작성해 주세요");
            }
        },
        async boardUpdate() {
            let wirteObj = { 
                boardId: this.$store.state.boardDetail.boardId,
                userId: this.$store.state.login.userInfo.userId, 
                boardCode: this.$store.state.boardType, 
                title: this.title,
                content: this.CKEditor.getData() 
            };

            console.log(wirteObj);

            try {
                let { data } = await http.put("/boards/" + this.$store.state.boardDetail.boardId, wirteObj);

                console.log(data);
                this.$alertify.success("글이 수정되었습니다.");

                // list 갱신
                if (this.$store.state.boardType == "001") {
                    this.$emit('freeBoard');
                } else if (this.$store.state.boardType == "002") {
                    this.$emit('qnaBoard');
                } else if (this.$store.state.boardType == "003") {
                    this.$emit('noticeBoard');
                }

                this.$store.state.boardStep = "list";
            } catch (error) {
                console.log(error);
            }
            
        },
        backToList() {
            this.$store.commit('CHANGE_BOARD_STEP', 'list');
        }
    },
    async mounted() {
        try {
            this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorInsert"));
            this.title = this.$store.state.boardDetail.title;
            this.CKEditor.setData(this.$store.state.boardDetail.content);
        } catch (error) {
            console.error(error);
        }
        
    },
};
</script>

<style scoped>
.card >>> .ck-editor__editable {
    min-height: 45vh !important;
}
</style>
