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
                                <h1 class="mb-0 h3">Create Account</h1>
                            </div>
                                <!-- Form -->
                                <div class="form-group mb-3">
                                    <label for="email">Your ID</label>
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1">
                                            <font-awesome-icon icon="fa-solid fa-user" style="width: 20px" />
                                        </span>
                                        <input type="text" class="form-control" placeholder="ID" v-model="userId" autofocus required />
                                    </div>
                                </div>
                                <!-- End of Form -->
                                <div class="form-group">
                                    <!-- Form -->
                                    <div class="form-group mb-3">
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
                                    <!-- End of Form -->
                                    <!-- Form -->
                                    <div class="form-group mb-3">
                                        <label for="confirm_password">Confirm Password</label>
                                        <div class="input-group">
                                            <span class="input-group-text" id="basic-addon2">
                                                <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                            <input type="password" placeholder="Confirm Password" class="form-control" v-model="confirm_password" required />
                                        </div>
                                    </div>
                                    <!-- End of Form -->
                                    <!-- Form -->
                                    <div class="form-group mb-3">
                                        <label for="email">Your Name</label>
                                        <div class="input-group">
                                            <span class="input-group-text" id="basic-addon1">
                                                <font-awesome-icon icon="fa-solid fa-signature" style="width: 20px" />
                                            </span>
                                            <input type="text" class="form-control" placeholder="name" v-model="name" required />
                                        </div>
                                    </div>
                                    <!-- End of Form -->
                                </div>
                                <div class="d-grid">
                                    <button class="btn btn-gray-800 mt-3" @click="regist">Sign up</button>
                                </div>
                            <div class="mt-3 mb-4 text-center">
                                <span class="fw-normal">or login with</span>
                            </div>
                            <div class="d-flex justify-content-center my-4">
                                <a href="#" class="btn btn-icon-only btn-pill btn-warning me-2" aria-label="kakao" title="kakao">
                                    <font-awesome-icon icon="fa-solid fa-comment-dots" style="color: white" />
                                </a>
                                <a href="#" class="btn btn-icon-only btn-pill btn-success me-2" aria-label="naver" title="naver">
                                    <font-awesome-icon icon="fa-solid fa-n" style="color: white" />
                                </a>
                            </div>
                            <div class="d-flex justify-content-center align-items-center mt-4">
                                <span class="fw-normal">
                                    Already have an account?
                                    <router-link to="/login" class="fw-bold">Login here</router-link>
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
            userId: '',
            password: '',
            confirm_password: '',
            name: '',
        };
    },
    methods: {
        regist() {
            if(this.password != this.confirm_password) {
                this.$alertify.alert("fail", "비밀번호가 서로 다릅니다.");
            } else {
                if (this.validate()) {
                    this.register();
                } else {
                    this.$alertify.alert("fail", "회원가입에 실패하였습니다. 모든 항목을 적어 주세요.");
                }
            }
        },
        validate() {
            let valid = true;

            if (this.userId == null || this.userId == "") {
                valid = false;
            }
            if (this.password == null || this.password == "") {
                valid = false;
            }
            if (this.name == null || this.name == "") {
                this.valid = false;
            }
            if (this.confirm_password == null || this.confirm_password == "") {
                this.valid = false;
            }

            return valid;
        },
        async register() {
            let registerObj = {
                userId: this.userId,
                password: this.password,
                name: this.name,
            };

            console.log(registerObj);

            try {
                let { data } = await http.post("/users", registerObj);
                console.log(data);
                if (data.result == "success") {
                    this.$alertify.alert("Welcome!", "회원가입을 축하합니다. 로그인 페이지로 이동합니다.");
                    this.$router.push("/login");
                } else if (data.result == "fail") {
                    this.$alertify.alert("Error", "서버 오류!!");
                }
            } catch (error) {
                console.error(error);
            }
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
};
</script>

<style></style>
