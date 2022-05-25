<template>
    <div :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }" style="margin: 20px 20px 20px 0">
        <div class="row">
            <div class="col-12 col-xl-4">
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="card shadow border-0 text-center p-0" style="height: 407px;">
                            <div class="profile-cover rounded-top" :style="inlineStyle"></div>
                            <div class="card-body pb-5">
                                <img src="../assets/img/noProfile.png" class="avatar-xl rounded-circle mx-auto mt-n7 mb-4" alt="Neil Portrait" />
                                <h4 class="h3">{{ $store.state.login.userInfo.name }}</h4>
                                <h5 class="fw-normal">{{ introduce }}</h5>
                                <button class="btn btn-sm btn-info d-inline-flex align-items-center me-2 animate-up-2" @click="disabled = (disabled + 1) % 2">
                                    <font-awesome-icon icon="fa-solid fa-user-pen" style="margin-right: 5px" />
                                    회원 수정
                                </button>
                                <button class="btn btn-sm btn-danger d-inline-flex align-items-center me-2 animate-up-2">
                                    <font-awesome-icon icon="fa-solid fa-user-large-slash" style="margin-right: 5px" />
                                    회원 탈퇴
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-xl-8">
                <div class="card card-body border-0 shadow mb-4" style="height: 407px;">
                    <h2 class="h5 mb-4">User information</h2>
                    <form>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div>
                                    <label for="first_name">Name</label>
                                    <input class="form-control" v-model="name" type="text"  required :disabled="disabled == 1"/>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div>
                                    <label for="last_name">Password</label>
                                    <input class="form-control" v-model="password" type="password" required :disabled="disabled == 1"/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Introduce</label>
                                    <input class="form-control" v-model="introduce" type="text" :disabled="disabled == 1"/>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="gender">Gender</label>
                                <select class="form-select mb-0" v-model="gender" aria-label="Gender select example" :disabled="disabled == 1">
                                    <option value="" disabled>Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control" v-model="email" type="email" :disabled="disabled == 1"/>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <div class="form-group">
                                    <label for="phone">Phone</label>
                                    <input class="form-control" v-model="phone" type="text" :disabled="disabled == 1"/>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-gray-800 mt-3 animate-up-2" type="submit" :disabled="disabled == 1" @click="updateUserInfo" style="display: inline-block; float: right;">Save all</button>
                    </form>
                </div>
            </div>
            <div class="card card-body border-0 shadow table-wrapper table-responsive" style="margin: 0 10px 0 10px">
                <h3 style="text-align: center">내가 쓴 게시물</h3>
                <table class="table table-hover" style="width: 100%; table-layout: fixed">
                    <thead>
                        <tr>
                            <th class="col-1 border-gray-200">#</th>
                            <th class="col-6 border-gray-200">title</th>
                            <th class="col-2 border-gray-200">writer</th>
                            <th class="col-1 border-gray-200">date</th>
                            <th class="col-1 border-gray-200">view</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Item -->
                        <tr v-for="(board, index) in BoardList" :key="index">
                            <td>
                                <a href="#" class="fw-bold">{{ board.boardId }}</a>
                            </td>
                            <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                                <nobr
                                    ><span class="fw-normal">{{ board.title }}</span></nobr
                                >
                            </td>
                            <td>
                                <span class="fw-normal">{{ board.writer }}</span>
                            </td>
                            <td>
                                <span class="fw-normal">{{ board.regDt }}</span>
                            </td>
                            <td>
                                <span class="fw-bold">{{ board.readCount }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-md-center" style="text-align: center; padding-bottom: 0px">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination mb-0">
                            <li class="page-item">
                                <a class="page-link" href="#">Prev</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">4</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">5</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
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
            introduce: 'aasdfdasfsadfasdfsdfsfsadfsda ',
            gender: '',
            email: '',
            phone: '',

            disabled: 1,

            BoardList: [],
        };
    },
    methods: {
        async userUpdate() {
            let updateObj = {
                userId: this.userId,
                password: this.password,
                name: this.name,
            };
            console.log(updateObj);
            try {
                let { data } = await http.put("/users/" + this.userId, updateObj);
                console.log(data);
                this.$store.commit("login/UPDATE_USER", updateObj);
                this.$alertify.alert("success!", "회원 수정을 완료하였습니다.");
            } catch (error) {
                console.error(error);
            }
        },
        async userDelete() {
            try {
                let { data } = await http.delete("/users/" + this.userId);
                console.log(data);
                this.$store.commit("login/DELETE_USER");
                this.$alertify.alert("success!", "회원 탈퇴를 완료하였습니다.");
                this.$router.push("/");
            } catch (error) {
                console.error(error);
            }
        },
        modifyUserInfo() {
            this.validated = false;
        },
        async updateUserInfo(){
            alert(this.name + " " + this.password + " " + this.introduce + " " + this.gender + " " + this.email +  " " + this.phone)
        }
    },
    computed: {
        bgImage() {
            return require("../assets/img/profile-cover.jpg");
        },
        inlineStyle() {
            return {
                backgroundImage: `url(${this.bgImage})`,
            };
        },
    },
    created() {
        this.userId = this.$store.state.login.userInfo.userId;
        this.password = this.$store.state.login.userInfo.password;
        this.name = this.$store.state.login.userInfo.name;
    },
};
</script>

<style></style>
