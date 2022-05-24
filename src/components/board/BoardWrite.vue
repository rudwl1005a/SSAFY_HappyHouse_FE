<template>
    <div class="card">
        <div class="m-3">
            <input v-model="title" type="text" class="form-control" placeholder="제목"/>
        </div>
        <div class="m-3">
            <div id="divEditorInsert"></div>
        </div>
        <div>
            <button @click="cancel" class="btn btn-tertiary m-3" type="button" style="float: right">취소</button>
            <button @click="insertValidate" class="btn btn-tertiary mt-3 ml-3 mr-3" type="button" style="float: right">등록</button>
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
        insertValidate() {
            if (this.title != "" && this.title.length != 0){
                if(this.CKEditor.getData().length != 0){
                    this.boardInsert();
                } else {
                    this.$alertify.error("내용을 작성해 주세요");
                }
            } else {
                this.$alertify.error("제목을 작성해 주세요");
            }
        },
        async boardInsert() {
            try {
                let { data } = await http.post("/boards", { userId: "123", boardCode: this.$store.state.boardType, title: this.title, content: this.CKEditor.getData() });

                console.log(data);
                this.$alertify.success("글이 등록되었습니다.");

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
    },
    async mounted() {
        try {
            this.CKEditor = await ClassicEditor.create(document.querySelector("#divEditorInsert"));
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style scoped>
.card >>> .ck-editor__editable {
    min-height: 50vh !important;
}
</style>
