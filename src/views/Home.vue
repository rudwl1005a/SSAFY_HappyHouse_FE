<template>
    <div class="container mt-3" :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }">
        <h1>HappyHouse</h1>
        <br />
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="requireImg1" class="d-block w-100" alt="..." style="width: 500px; height: 600px" />
                </div>
                <div class="carousel-item">
                    <img :src="requireImg2" class="d-block w-100" alt="..." style="width: 500px; height: 600px" />
                </div>
                <div class="carousel-item">
                    <img :src="requireImg3" class="d-block w-100" alt="..." style="width: 500px; height: 600px" />
                </div>
            </div>
        </div>
        <br />
        <h3 style="text-align: center">공지 사항</h3>
        <table class="table" style="text-align: center">
            <thead>
                <tr style="color: red">
                    <th scope="col" class="col-1">#</th>
                    <th scope="col" class="col-5">내용</th>
                    <th scope="col" class="col-2">작성자</th>
                    <th scope="col" class="col-1">날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(notice, index) in noticeList" :key="index">
                    <th scope="col" class="col-1">{{ index + 1 }}</th>
                    <th scope="col" class="col-5">{{ notice.contents }}</th>
                    <th scope="col" class="col-2">{{ notice.writer }}</th>
                    <th scope="col" class="col-1">{{ notice.date }}</th>
                </tr>
            </tbody>
        </table>

        <div id="noticeWrite"></div>
        <br />
        <br />
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
            noticeList: [],
        };
    },
    methods: {
        async makeNoticeList() {
            try {
                let { data } = await http.get("/notices");
                this.noticeList = data;
            } catch (error) {
                console.error(error);
                this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
            }
        },
    },
    created() {
        // this.makeNoticeList();
    },
    computed: {
        requireImg1() {
            return require("../assets/img/house1.jpg");
        },
        requireImg2() {
            return require("../assets/img/house2.png");
        },
        requireImg3() {
            return require("../assets/img/house3.jpg");
        },
    },
};
</script>

<style>
</style>
