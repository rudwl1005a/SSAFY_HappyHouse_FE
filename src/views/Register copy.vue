<template>
  <div class="container mt-3" :class="{'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv}">
		<h2>회원가입</h2>
		<br>
		
		<label for="userId" class="form-label">아이디</label>
		<input type="text" v-model="userId" class="form-control" aria-describedby="IdHelpBlock">
		<!-- <div id="IdHelpBlock" class="form-text"></div> -->
	
		<label for="password" class="form-label">비밀번호</label>
		<input type="password" v-model="password" class="form-control" aria-describedby="passwordHelpBlock">
		<!-- <div id="passwordHelpBlock" class="form-text"></div> -->
	
		<label for="name" class="form-label">이름</label>
		<input type="text" v-model="name" class="form-control">
		<br>
		
		<button @click="regist()" type="button" class="btn btn-info">회원 가입</button>
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
            name: '',
        }
    },
    methods: {
        regist() {
            if(this.validate()){
				this.register();
			} else {
				this.$alertify.alert('fail', '회원가입에 실패하였습니다. 모든 항목을 적어 주세요.');
			}
        },
        validate(){
            let valid = true;
            
            if(this.userId == null || this.userId == ""){
                valid = false;	
            }
            if(this.password == null || this.password == ""){
                valid = false;
            }
            if(this.name == null || this.name == ""){
                this.valid = false;
            }
            
            return valid;
        },
        async register(){
            let registerObj = {
                userId: this.userId,
                password: this.password,
                name: this.name
            };

            console.log(registerObj);
            
            try {
                let { data } = await http.post("/users", registerObj);
                console.log(data);
                if( data.result == "success" ){
                    this.$alertify.alert('Welcome!', '회원가입을 축하합니다. 로그인 페이지로 이동합니다.');
                    this.$router.push("/login");
                } else if( data.result == "fail" ){
                    this.$alertify.alert('Error', '서버 오류!!');
                }
            } catch(error){
                console.error(error);
            }
        }
    }
}
</script>

<style>
</style>