<template>
    <div class="container mt-3" :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }">
        <h2>회원 정보</h2>
        <br />
        <label for="userId" class="form-label">아이디</label>
        <input type="text" v-model="userId" class="form-control" readonly />

        <label for="password" class="form-label">비밀번호</label>
        <input type="password" v-model="password" class="form-control" />

        <label for="name" class="form-label">이름</label>
        <input type="text" v-model="name" class="form-control" />
        <br />

        <button @click="userUpdate" type="button" class="btn btn-info">수정</button>
        <button @click="userDelete" type="button" class="btn btn-info">삭제</button>
    </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";

export default {
    data() {
        return {
            userId: "",
            password: "",
            name: "",
        };
    },
    methods: {
        async userUpdate() {
            let updateObj = {
                userId: this.userId,
                password: this.password,
                name: this.name,
            };

            try {
                let { data } = await http.put("/users/" + this.userId, updateObj);
                console.log(data);

                this.$store.commit("UPDATE_USER", updateObj);

                this.$alertify.alert("success!", "회원 수정을 완료하였습니다.");
            } catch (error) {
                console.error(error);
            }
        },
        async userDelete() {
            try {
                let { data } = await http.delete("/users/" + this.userId);
                console.log(data);

                this.$store.commit("DELETE_USER");

                this.$alertify.alert("success!", "회원 탈퇴를 완료하였습니다.");
                this.$router.push("/");
            } catch (error) {
                console.error(error);
            }
        },
    },
    created() {
        this.userId = this.$store.state.userInfo.userId;
        this.password = this.$store.state.userInfo.password;
        this.name = this.$store.state.userInfo.name;
    },
};
</script>

<style>
</style>
