<template>
    <main :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }">
        <!-- Section -->
        <section class="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div class="container">
                <p class="text-center">
                    <router-link to="/" class="d-flex align-items-center justify-content-center">
                        <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                        </svg>
                        Back to homepage
                    </router-link>
                </p>
                <div class="row justify-content-center form-bg-image" :style="inlineStyle">
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <div class="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div class="text-center text-md-center mb-4 mt-md-0">
                                <h1 class="mb-0 h3">Login</h1>
                            </div>
                            <form action="#" class="mt-4">
                                <!-- Form -->
                                <div class="form-group mb-4">
                                    <label for="email">Your ID</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1">
                                            <font-awesome-icon icon="fa-solid fa-user" style="width: 20px; color: black" />
                                        </span>
                                        <input type="text" class="form-control" placeholder="ID" v-model="userId" autofocus required />
                                    </div>
                                </div>
                                <!-- End of Form -->
                                <div class="form-group">
                                    <!-- Form -->
                                    <div class="form-group mb-4">
                                        <label for="password">Your Password</label>
                                        <div class="input-group">
                                            <span class="input-group-text" id="basic-addon2">
                                                <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                            <input type="password" placeholder="Password" class="form-control" v-model="password" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="d-grid">
                                    <button @click="userLogin" type="submit" class="btn btn-gray-800 mt-2">login</button>
                                </div>
                            </form>
                            <div class="mt-3 mb-4 text-center">
                                <span class="fw-normal">or login with</span>
                            </div>
                            <div class="d-flex justify-content-center my-4">
                                <button class="btn btn-icon-only btn-pill btn-warning me-2" aria-label="kakao" title="kakao">
                                    <font-awesome-icon icon="fa-solid fa-comment-dots" style="color: white" />
                                </button>
                                <button class="btn btn-icon-only btn-pill btn-success me-2" aria-label="naver" title="naver">
                                    <font-awesome-icon icon="fa-solid fa-n" style="color: white" />
                                </button>
                            </div>
                            <div class="d-flex justify-content-center align-items-center mt-4">
                                <span class="fw-normal">
                                    Not registered?
                                    <router-link to="/register" class="fw-bold">Create account</router-link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
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
        };
    },
    methods: {
        async userLogin() {
            try {
                setTimeout(100);
                let response = await http.post("/login", { userId: this.userId, password: this.password });
                let { data } = response;
                console.log(data);

                if (data.result == "success"){
                    this.$store.commit("login/SET_TOKEN", response.headers.authorization);
                    // console.log(response.headers.authorization);
                    console.log("token: " + this.$store.state.login.token);
    
                    this.$store.commit("login/LOGIN", { userId: data.userId, userCode: data.userCode, name: data.name, password: data.password });
                    this.$router.push("/");
                }
            } catch (error) {
                console.error(error);
                if (error.response.status == "404") {
                    this.$alertify.error("이메일 또는 비밀번호를 확인하세요.");
                } else {
                    this.$alertify.error("서버에 오류가 발생했습니다.");
                }
            }
        },
        async logout() {
            try {
                let response = await http.post("/logout");
                let { data } = response;
                console.log(data);

                this.$store.commit("login/SET_TOKEN", undefined);
                console.log(this.$store.state.login.token);
                this.$store.commit("login/LOGOUT");
            } catch (error) {
                console.error(error);
                this.$alertify.error("서버에 오류가 발생했습니다.");
            }
        },
        authInst() {
            // eslint-disable-next-line
            console.log(gapi.auth2.getAuthInstance());
        },
    },
    computed: {
        bgImage() {
            return require("../assets/img/illustrations/signin.svg");
        },
        inlineStyle() {
            return {
                backgroundImage: `url(${this.bgImage})`,
            };
        },
    },
    mounted(){
        this.logout();
    }
};
</script>

<style></style>
