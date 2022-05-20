<template>
    <div :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }">
        <map-view :apartList="apartList"></map-view>
        <div class="card col-sm-12" style="min-height: 935px; z-index: 1; position: absolute; top: 0; right: 0; z-index: 1; width: 400px">
            <div class="card-body">
                <div class="row">
                    <div class="col form-group form-inline justify-content-center">
                        <div class="row">
                            <select class="col form-select-sm m-2" v-model="sido">
                                <option value="0">시/도</option>
                                <option v-for="(sido, index) in sidoList" :key="index" :value="sido.sidoCode">
                                    {{ sido.sidoName }}
                                </option>
                            </select>
                            <select class="col form-select-sm m-2" v-model="gugun">
                                <option value="0">구/군</option>
                                <option v-for="(gugun, index) in gugunList" :key="index" :value="gugun.gugunCode">
                                    {{ gugun.gugunName }}
                                </option>
                            </select>
                            <select class="col form-select-sm m-2" v-model="dong">
                                <option value="0">읍/면/동</option>
                                <option v-for="(dong, index) in dongList" :key="index" :value="dong.dongCode">
                                    {{ dong.dongName }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col input-group mb-3 pt-1">
                    <input type="text" class="form-control" placeholder="아파트명" @keyup.enter="getSearchResult" v-model="searchWord" />
                    <button class="btn btn-tertiary" type="button" @click="getSearchResult">검색</button>
                </div>

                <!-- 정렬하기와 한 페이지 최대 개수 추가 -->
                <div class="row">
                    <div class="col">
                        <div class="row leftSide">
                            <div class="card">
                                <ul class="list-group list-group-flush" id="searchResult">
                                    <li class="list-group-item" style="cursor: pointer" v-for="(apart, index) in apartList" :key="index" @click="detailApart(apart.aptCode)">
                                        <div class="row"> 
                                            <div class="col-2 mt-1">{{ CURRENT_PAGE_INDEX *  index + 1}}</div>
                                            <div class="col-8">
                                                <strong style="font-size: 20px">{{ apart.aptName }}</strong>
                                            </div>
                                            <div class="col-2 mt-1">
                                                <font-awesome-icon icon="fa-solid fa-heart" style="color:#ca1a41;" v-if="apart.isUserInterest === 1" @click="deleteInterestApart(apart)"/>
                                                <font-awesome-icon icon="fa-regular fa-heart" v-else  @click="insertInterestApart(apart)"/>
                                            </div>
                                        </div>
                                            <!-- <div class="col-2 mt-1" style="color: gray">
                                                {{ apart.buildYear }}
                                            </div>
                                        
                                        <div class="row m-3" style="font-size: 18px">{{ apart.sidoName }} {{ apart.gugunName }} {{ apart.dongName }} {{ apart.jibun }}</div>
                                        <div class="row m-2">최근거래금액 : {{ apart.recentPrice }}만원</div>
                                        <div> <button @click="detailApart(apart.aptCode)"> 더보기 </button> </div> -->
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id="paginationWrapper" class="row mt-3"></div>
                    </div>
                </div>
            </div>
        </div>
        <apart-detail-modal :aptCode="aptCode"></apart-detail-modal>
    </div>
</template>

<script>
import MapView from "../components/apart/MapView.vue";
import ApartDetailModal from "../components/apart/ApartDetailModal.vue";

import { Modal } from "bootstrap";

import http from "@/common/axios.js";
//import util from "@/common/util.js";

//import Pagination from "@/components/Pagination.vue";

// 삭제
//import Vue from "vue";
//import VueAlertify from "vue-alertify";

export default {
    components: { ApartDetailModal, MapView },
    data() {
        return {
            sidoList: [],
            gugunList: [],
            dongList: [],
            searchWord: "",

            //search option parameters
            LIST_ROW_COUNT: 10,
            OFFSET: 0,
            sido: "0",
            gugun: "0",
            dong: "0",

            //pagination value
            PAGE_LINK_COUNT: 10, // pagination link 갯수
            TOTAL_LIST_ITEM_COUNT: 0,
            CURRENT_PAGE_INDEX: 1,

            //apart info
            apartList: [],
            apart: {},

            //detail modal info
            aptCode: "",
            detailModal: null,
        };
    },
    mounted() {
        this.detailModal = new Modal(document.querySelector("#modalApartDetail"));
        this.getSido();
    },
    watch:{
        sido : async function(){
            this.gugunList = []; //[{ gugunCode: "0", gugunName: "선택" }];
            this.dongList = []; //[{ dongCode: "0", dongName: "선택" }];
            this.gugun = "0";
            this.dong = "0";

            if (this.sido == "0") return;
            
            let response = await http.get("/address/gugun/" + this.sido);
            let { data } = response;

            this.gugunList = data;
            this.getSearchResultInit();
        },
        gugun: async function(){
            this.dongList = []; //[{ dongCode: "0", dongName: "선택" }];
            this.dong = "0";

            if (this.gugun == "0") return;

            let response = await http.get("/address/dong/" + this.gugun);
            let { data } = response;

            console.log(data);

            this.dongList = data;
            this.getSearchResultInit();
        },
        dong: async function(){
            if (this.dong == "0") return;
            this.getSearchResultInit();
        },
    },
    computed :{
        userInfo :{
            get(){
                return this.$store.state.userInfo;
            }
        }
    },
    methods: {
        getSido: async function () {
            let response = await http.get("/address/sido");
            let { data } = response;

            this.sidoList = data;
            //console.log(this.sidoList);
        }, //end getSido
        getURL: function () {
            let url =  "";

            //if (trpe = ??)

            url = "/aparts/all?limit=" + this.LIST_ROW_COUNT + "&offset=" + this.OFFSET + "&userId=" + this.userInfo.userId;

            if (this.dong != "0") {
                url += "&dongCode=" + this.dong;
            } else if (this.gugun != "0") {
                url += "&gugunCode=" + this.gugun;
            } else if (this.sido != "0") {
                url += "&sidoCode=" + this.sido;
            }

            if (this.searchWord != "" && this.searchWord != undefined) {
                url += "&aptKeyword=" + this.searchWord;
            }

            console.log("search query : " + url);
            return url;
        }, //end getURL
        getSearchResult: async function () {
            let url = this.getURL();
            let response = await http.get(url);
            let { data } = response;

            // console.log("getSearchResult :" + data);

            this.apartList = data.list;
            console.log(this.apartList)

            this.TOTAL_LIST_ITEM_COUNT = data.count;
            //addPagination();

            //displayMarkers(data.list); // 맵
        }, //end getSearchResult
        getSearchResultInit: async function () {
            this.OFFSET = 0;
            this.CURRENT_PAGE_INDEX = 1;
            this.getSearchResult();
        }, // end getSearchResultInit
        detailApart: async function (aptCode) {
            this.aptCode = aptCode;
            console.log(aptCode);
            this.detailModal.show();
            //displayMarkers(data);
        },
        insertInterestApart : async function (apart) {
            console.log(this.userInfo.userId + " " + apart.aptCode);
            let response = await http.post("/" + this.userInfo.userId + "/interest/aparts", {userId : this.userInfo.userId, aptCode : apart.aptCode});
            let { data } = response;
            console.log("insertInterestApart() :")
            console.log(data);
            //if (data.result == 1)apart.isUserInterest = 1;
            this.getSearchResult();
            //this.sidoList = data;
        },
        deleteInterestApart : async function (apart) {
            let response = await http.delete("/" + this.userInfo.userId + "/interest/aparts/" + apart.aptCode);
            let { data } = response;
            console.log("deleteInterestApart() :")
            console.log(data);
            //if (data.result == 1) apart.isUserInterest = 0;
            this.getSearchResult();
            //this.sidoList = data;
        },
    }, //end methods
};
</script>

<style>
.leftSide {
    overflow: scroll;
    -ms-overflow-style: none;
    height: 735px;
}

.leftSide::-webkit-scrollbar {
    display: none;
}

.list-group-item:nth-child(2n) {
    background-color: lightgray;
}
</style>
