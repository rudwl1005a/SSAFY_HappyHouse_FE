<template>
  <div class="container mt-3" :class="{'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv}">
		<h2>로그인</h2>
		<br>
		<label for="userId" class="form-label">아이디</label>
		<input type="text" v-model="userId" class="form-control">
	
		<label for="password" class="form-label">비밀번호</label>
		<input type="password" v-model="password" class="form-control">
		<br>
		
		<button @click="userLogin" type="button" class="btn btn-info">로그인</button>
		<router-link to="/register" class="btn btn-info">회원가입</router-link>
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
            userId: '',
            password: '',
        }
    },
    methods: {
        async userLogin() {
            try {
                let response = await http.post('/login', { userId: this.userId, password: this.password });
                let { data } = response;
                
                this.$store.commit('LOGIN', { userId: data.userId, authority: data.authority, name: data.name, password: data.password });
                this.$router.push("/");
            } catch (error) {
                console.error(error);
                if(error.response.state == '404'){
                    this.$alertify.error('이메일 또는 비밀번호를 확인하세요.');
                } else {
                    this.$alertify.error('서버에 오류가 발생했습니다.');
                }
            }

        }
    }
}
</script>

<style>
</style>