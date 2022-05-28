<template>
    <div :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }" style="margin: 20px 20px 20px 0">
        <div class="row">
            <div class="col-12 col-xl-4">
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="card shadow border-0 text-center p-0" style="height: 407px;">
                            <div class="profile-cover rounded-top" :style="inlineStyle"></div>
                            <div class="card-body pb-5">
                                <img src="../assets/img/profile.jpg" class="avatar-xl rounded-circle mx-auto mt-n7 mb-4" alt="Neil Portrait" />
                                <h4 class="h3">{{ $store.state.login.userInfo.userId }}</h4>
                                <h5 class="fw-normal">{{ $store.state.login.userInfo.introduce }}</h5>
                                <button class="btn btn-sm btn-info d-inline-flex align-items-center me-2 animate-up-2" @click="disabled = (disabled + 1) % 2">
                                    <font-awesome-icon icon="fa-solid fa-user-pen" style="margin-right: 5px" />
                                    회원 수정
                                </button>
                                <button class="btn btn-sm btn-danger d-inline-flex align-items-center me-2 animate-up-2" @click="confirmDelete">
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
                        <button class="btn btn-tertiary mt-3 animate-up-2" type="submit" :disabled="disabled == 1" @click="userUpdate" style="display: inline-block; float: right;">Update</button>
                    </form>
                </div>
            </div>
            <div class="card card-body border-0 shadow table-wrapper table-responsive" style="margin: 0 10px 0 10px">
                <h3 style="text-align: center">내가 쓴 게시물</h3>
                <div class="d-flex justify-content-end mb-3 me-4" >
                    <div class="col col-md-6 col-lg-3 col-xl-4">
                        <div class="input-group me-2 me-lg-3">
                            <span class="input-group-text">
                                <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                            <input type="text" class="form-control" placeholder="Search boards" v-model="searchWord" @keyup="searchBoard"/>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center m-3" v-if="boardList.length <= 0"> 내가 쓴 게시물이 없습니다. </div>
                <table class="table table-hover" style="width: 100%; table-layout: fixed" v-if="boardList.length > 0">
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
                        <tr style="cursor: pointer" v-for="(board, index) in boardList" :key="index" @click="boardDetail(board.boardId, board.boardCode)">
                            <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                                <nobr><a href="#" class="fw-bold">{{ board.boardId }}</a></nobr>
                            </td>
                            <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                                <nobr><span class="fw-normal">{{ board.title }}</span></nobr>
                            </td>
                            <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                                <nobr><span class="fw-normal">{{ board.userId }}</span></nobr>
                            </td>
                            <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                                <nobr><span class="fw-normal">{{ board.regDt | yyyyMMdd }}</span></nobr>
                            </td>
                            <td style="width: 100%; overflow: hidden; text-overflow: ellipsis">
                                <nobr><span class="fw-bold">{{ board.readCount }}</span></nobr>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="boardList.length > 0" class="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-md-center" style="padding-bottom: 0px">
                    <pagination v-on:call-parent="movePage"></pagination>
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
import Pagination from  "@/components/Pagination.vue";

export default {
    components: { Pagination },
    data() {
        return {
            userId: '',
            password: '',
            name: '',
            introduce: '',
            gender: '',
            email: '',
            phone: '',

            disabled: 1,

            boardList: [],
            searchWord: '',
        };
    },
    methods: {
        // pagination
        movePage(pageIndex) {
            //console.log("BoardMainVue : movePage : pageIndex : " + pageIndex);

            this.$store.commit("SET_PAGINATION_MOVE_PAGE", pageIndex);

            // this.searchBoard();
            this.searchBoard();
        },
        searchBoard(){
            this.$store.commit("SET_SEARCHWORD", this.searchWord);
            this.myBoardList();
        },
        async myBoardList() {
            let urlParams = "?limit=" + this.$store.state.pagination.listRowCount + "&offset=" + this.$store.state.pagination.offset + "&searchWord=" + this.$store.state.pagination.searchWord;
            
            try {
                let { data } = await http.get("/myboards" + urlParams);
                //console.log(data);

                if (data.result == 1) {
                    this.$store.commit("CHANGE_BOARDLIST", data);
                    this.$store.commit("SET_PAGINATION_TOTAL_LIST_ITEM_COUNT", data.count);

                    //console.log(this.$store.state.boardList);

                    this.boardList = this.$store.state.boardList;
                } else {
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }

                this.$store.state.pagination.searchWord = '';
            } catch (error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } else {
                    console.error(error);
                    this.$alertify.error("글 조회 과정에 문제가 생겼습니다.");
                }
            }
        },
        async userUpdate() {
            let updateObj = {
                userId: this.userId,
                password: this.password,
                name: this.name,
                introduce: this.introduce,
                gender: this.gender,
                email: this.email,
                phone: this.phone,
            };
            //console.log(updateObj);
            try {
                let { data } = await http.put("/users/" + this.userId, updateObj);
                //console.log(data);
                this.$store.commit("login/UPDATE_USER", updateObj);
                this.$alertify.alert("success!", "회원 수정을 완료하였습니다.");
                this.disabled = (this.disabled + 1) % 2;
            } catch (error) {
                console.error(error);
                this.$alertify.error("회원 수정 과정에 문제가 생겼습니다.");
            }
        },
        confirmDelete() {
            var $this = this;
            this.$alertify.confirmWithTitle(
                "탈퇴 확인",
                "정말로 탈퇴하시겠습니까?",
                function () {
                    $this.userDelete();
                },
                function () {
                    console.log("cancel");
                }
            );
        },
        async userDelete() {
            try {
                let { data } = await http.delete("/users/" + this.userId);
                //console.log(data);
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
        async boardDetail(boardId, boardCode) {
            //console.log(boardId + " " + boardCode);
            try {
                let response = await http.get('/boards/' + boardId);
                let { data } = response;
                //console.log(data);

                if (data.result == 'login'){
                    this.$router.push("/login");
                } else {
                    let boardNew = { ...data.dto };

                    this.$store.commit('CHANGE_BOARD_DETAIL', boardNew);
                    //console.log(boardNew);

                    this.$store.commit("CHANGE_BOARD_TYPE", "006");
                    this.$store.commit("CHANGE_BOARD_USER_TYPE", boardCode);

                    this.$router.push("/board");
                }
            } catch(error) {
                if (error.response.status == "500") {
                    this.$alertify.error("로그인 해 주세요.");
                    this.$router.push("/login");
                } 
                console.error(error);
            }
        },
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
        this.introduce = this.$store.state.login.userInfo.introduce;
        this.email = this.$store.state.login.userInfo.email;
        this.gender = this.$store.state.login.userInfo.gender;
        this.phone = this.$store.state.login.userInfo.phone;

        this.myBoardList();
        this.$store.commit("SET_PAGINATION_DEFAULT");
    },
    filters: {
        // filter로 쓸 filter ID 지정
        yyyyMMdd: function (value) {
            // 들어오는 value 값이 공백이면 그냥 공백으로 돌려줌
            if (value == "") return "";

            // 현재 Date 혹은 DateTime 데이터를 javaScript date 타입화
            var js_date = new Date(value);

            // 연도, 월, 일 추출
            var year = js_date.getFullYear();
            var month = js_date.getMonth() + 1;
            var day = js_date.getDate();

            // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
            if (month < 10) {
                month = "0" + month;
            }

            if (day < 10) {
                day = "0" + day;
            }

            // 최종 포맷 (ex - '2021-10-08')
            return year + "-" + month + "-" + day;
        },
    }
};
</script>

<style></style>
