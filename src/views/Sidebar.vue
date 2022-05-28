<template>
    <div>
        <div class="icon-bar">
            <router-link to="/" style="margin-top: 61px">
                <div v-if="$store.state.sidebar">
                    <font-awesome-icon icon="fa-solid fa-house" />
                    <div class="routerLinkTitle">HOME</div>
                </div>
                <div v-if="!$store.state.sidebar" title="home">
                    <font-awesome-icon icon="fa-solid fa-house" />
                </div>
            </router-link>
            <router-link to="/apartsearch">
                <div v-if="$store.state.sidebar">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    <div class="routerLinkTitle">아파트 검색</div>
                </div>
                <div v-if="!$store.state.sidebar" title="아파트 검색">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </div>
            </router-link>
            <router-link to="/board">
                <div v-if="$store.state.sidebar">
                    <font-awesome-icon icon="fa-solid fa-clipboard" />
                    <div class="routerLinkTitle">게시판</div>
                </div>
                <div v-if="!$store.state.sidebar" title="게시판">
                    <font-awesome-icon icon="fa-solid fa-clipboard" />
                </div>
            </router-link>
            <router-link to="/login" v-if="!$store.state.login.isLogin">
                <div v-if="$store.state.sidebar">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
                    <div class="routerLinkTitle">로그인</div>
                </div>
                <div v-if="!$store.state.sidebar" title="로그인">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" />
                </div>
            </router-link>
            <router-link to="/register" v-if="!$store.state.login.isLogin">
                <div v-if="$store.state.sidebar">
                    <font-awesome-icon icon="fa-solid fa-user-plus" />
                    <div class="routerLinkTitle">회원가입</div>
                </div>
                <div v-if="!$store.state.sidebar" title="회원가입">
                    <font-awesome-icon icon="fa-solid fa-user-plus" />
                </div>
            </router-link>
            <router-link to="/userinfo" v-if="$store.state.login.isLogin">
                <div v-if="$store.state.sidebar">
                    <font-awesome-icon icon="fa-solid fa-user" />
                    <div class="routerLinkTitle">마이페이지</div>
                </div>
                <div v-if="!$store.state.sidebar" title="사용자 정보">
                    <font-awesome-icon icon="fa-solid fa-user" />
                </div>
            </router-link>
            <a @click="logout" v-if="$store.state.login.isLogin" style="color: white">
                <div v-if="$store.state.sidebar">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
                    <div class="routerLinkTitle">로그아웃</div>
                </div>
                <div v-if="!$store.state.sidebar" title="로그아웃">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
                </div>
            </a>
            <a @click="toggleSidebar" id="toggleIcon">
                <font-awesome-icon v-if="$store.state.sidebar_arrow"  icon="fa-solid fa-angles-left" />
                <font-awesome-icon v-if="!$store.state.sidebar_arrow"  icon="fa-solid fa-angles-right" />
            </a>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

import http from "@/common/axios.js";

export default {
    methods: {
        toggleSidebar() {
            let size = document.querySelector(".icon-bar").offsetWidth;
            if (size == 90) {
                document.querySelector(".icon-bar").style.width = 300 + "px";
                document.querySelector("#toggleIcon").style.left = 230 + "px";
                this.$store.commit("CHANGE_MAIN", true);
                this.$store.commit("CHANGE_SIDEBAR_ARROW", true);
                setTimeout(() => this.$store.commit("CHANGE_SIDEBAR", true), 300);
            } else {
                document.querySelector(".icon-bar").style.width = 90 + "px";
                document.querySelector("#toggleIcon").style.left = 18 + "px";
                this.$store.commit("CHANGE_MAIN", false);
                this.$store.commit("CHANGE_SIDEBAR", false);
                this.$store.commit("CHANGE_SIDEBAR_ARROW", false);
            }
        },
        async logout() {
            try {
                let response = await http.post("/logout");
                let { data } = response;
                //console.log(data);

                this.$store.commit("login/SET_TOKEN", undefined);
                //console.log(this.$store.state.login.token);
                this.$store.commit("login/LOGOUT");
                this.$router.push("/");
            } catch (error) {
                console.error(error);
                this.$alertify.error("서버에 오류가 발생했습니다.");
            }
        },
        changeMenu(menu){
            //console.log(menu);
            this.$store.commit("CHANGE_MENU", menu);
        },
    },
};
</script>

<style>
.icon-bar {
    height: 100%;
    width: 90px;
    background-color: #1f273a;
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    /*z-index: 1;*/ /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 0;
    z-index: 1;
    transition-duration: 0.5s;
}

.icon-bar a {
    display: block;
    text-align: center;
    padding: 16px;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;
    text-decoration-line: none;
}

.icon-bar #toggleIcon {
    position: absolute;
    top: 0;
    left: 18px;
    text-align: center;
    padding: 16px;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition-duration: 0.5s;
}

.icon-bar #toggleIcon:hover {
    background-color: #1f273a;
}

.icon-bar .routerLinkTitle {
    display: inline-block;
    width: 200px;
    text-align: center;
}

.icon-bar a:hover {
    background-color: #4c616d;
    color: skyblue;
}

.icon-bar .router-link-exact-active {
    border-left: 3px solid skyblue;
}
</style>
