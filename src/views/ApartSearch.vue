<template>
    <div :class="{ 'change-big': $store.state.mainDiv, 'change-small': !$store.state.mainDiv }">
        <map-view :apartList="apartList" ref="MapView"></map-view>
        <!--시구동 검색 창 시작-->
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
                <!--시구동 검색 창 끝-->
                <!--아파트명 검색 창 시작-->
                <div class="col input-group mb-1 pt-1">
                    <input type="text" class="form-control" placeholder="아파트명" @keyup.enter="getSearchResult" v-model="searchWord" />
                    <button class="btn btn-tertiary" type="button" @click="getSearchResult">검색</button>
                </div>
                <!--아파트명 검색 창 끝-->
                <!--검색 결과 정렬 및 관심지역 토글 창 시작-->
                <div class="row">
                    <div class="col-6  mb-3 pt-1">
                        <select class="col form-select-sm mt-2" v-model="sortType" style="margin-left: -5px;">
                            <option value="0">정렬</option>
                            <option value="1">거래가 많은 순</option>
                            <option value="2">최근 건축 순</option>
                            <option value="3">거래가 높은 순</option>
                            <option value="4">최근거래가 순</option>
                            <option value="5">이름순</option>
                        </select>
                    </div>
                    <div class="col-6  mb-3 pt-3">
                        관심지역만 보기
                        <input type="checkbox" v-model="interestToggle" true-value="true" false-value="false"/>
                    </div>
                </div>
                <!--검색 결과 정렬 및 관심지역 토글 창 끝-->
                <div class="row leftSide">
                    <div class="card p-0">
                        <ul class="list-group list-group-flush" id="searchResult" >
    <li class="list-group-item p-1" style="cursor: pointer" v-for="(apart, index) in apartList" :key="index" @click="detailApart(apart.aptCode)" @click.stop >
                            <!--클릭 이벤트와 마우스 이벤트들이 자식 요소들에게도 이벤트가 발생함.-->
        <div class="card border-0 shadow apartItem" @mouseover="itemMouseOver($event, apart)" @mouseout="itemMouseOut">
            <div class="card-body p-1">
                <div class="row d-block d-xl-flex align-items-center">
                    <div class="col-12 col-xl-3 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                        <div class="icon-shape icon-shape-tertiary rounded me-4 me-sm-0">
                            <font-awesome-icon icon="fa-solid fa-building" />   <!-- 아파트 아이콘  -->
                        </div>
                        <div class="d-sm-none">
                            <h2 class="fw-extrabold text-gray-400 h6"> {{ apart.sidoName }} {{ apart.gugunName }} {{ apart.dongName }} {{ apart.jibun }}</h2>
                            <h3 class="mb-1">{{ apart.aptName }}</h3>
                        </div>
                    </div>
                    <div class="col-11 col-xl-8 px-xl-0">
                        <div class="d-none d-sm-block">
                            <h2 class="h6 text-gray-400 mb-0"> {{ apart.sidoName }} {{ apart.gugunName }} {{ apart.dongName }} {{ apart.jibun }}</h2>
                            <h5 class="fw-extrabold mb-2">{{ apart.aptName }}</h5>
                        </div>
                        <small class="text-gray-500">
                            {{ apart.buildYear }}년 건축, 거래 내역 {{apart.dealCount}}건
                        </small> 
                        <div class="small d-flex mt-1" v-if="apart.dealCount">                               
                            <div>최근 거래 {{apart.recentPrice}}만원, 최고가 {{apart.maxPrice}}만원 <svg class="icon icon-xs text-success" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg><span class="text-success fw-bolder">4%</span></div>
                        </div>
                    </div>
                    <div class="col-1 col-xl-1 px-xl-0">
                        <font-awesome-icon v-bind:icon="heartType[apart.isUserInterest]" 
                            v-bind:style="heartStyle[apart.isUserInterest]"  @click.stop="changeInterestApart(apart)" />
                    </div>
                </div>
            </div>
        </div>
                                
    </li>
                        </ul>
                    </div>
                </div>
                <div id="paginationWrapper" class="row mt-3"></div>
            </div>
        </div>
        <apart-detail-modal :aptCode="aptCode" ></apart-detail-modal>
    </div>
</template>

<!--
    할 일
    1. apart item 클릭이벤트 버그 고치기
    2. apart item 마우스 오버 고치기
    3. apart item 디자인 수정
    4. apart item 컴포넌트로 변환

    5. 검색 결과가 없을 때 디폴트 맵 설정

    6. 맵이랑 사이드 검색창이랑 크기 조절? 검색 결과에따라 포커싱 맞추면 제대로 안 맞춰짐
-->

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

            //search option parameters
            LIST_ROW_COUNT: 10,
            OFFSET: 0,
            sido: "0",
            gugun: "0",
            dong: "0",
            searchWord: "",
            sortType:"0",
            interestToggle: false,

            //pagination value
            PAGE_LINK_COUNT: 10, // pagination link 갯수
            TOTAL_LIST_ITEM_COUNT: 0,
            CURRENT_PAGE_INDEX: 1,

            //apart info
            apartList: [],
            apart: {},          
            apartItem : null,   //map에서 보여줄 아파트 위치정보

            //detail modal info
            aptCode: "",
            detailModal: null,


            //
            heartType:[ "fa-regular fa-heart", "fa-solid fa-heart"],
            heartStyle:[ {}, {color:"#ca1a41"}],

        };
    },
    mounted() {
        this.detailModal = new Modal(document.querySelector("#modalApartDetail"));
        this.getSido();
        this.getSearchResultInit();
    },
    watch:{
        sido : async function(){
            this.gugunList = []; //[{ gugunCode: "0", gugunName: "선택" }];
            this.dongList = []; //[{ dongCode: "0", dongName: "선택" }];
            this.gugun = "0";
            this.dong = "0";

            if (this.sido != "0") {
                let response = await http.get("/address/gugun/" + this.sido);
                let { data } = response;

                this.gugunList = data;
            }
            
            
            this.getSearchResultInit();
        },
        gugun: async function(){
            this.dongList = []; //[{ dongCode: "0", dongName: "선택" }];
            this.dong = "0";

            if (this.gugun != "0"){
                let response = await http.get("/address/dong/" + this.gugun);
                let { data } = response;

                console.log(data);

                this.dongList = data;
            }
            this.getSearchResultInit();
        },
        dong: async function(){
            if (this.dong == "0") return;
            this.getSearchResultInit();
        },
        interestToggle : function(){
            
            this.getSearchResultInit();
        },
        sortType : function(){
            this.getSearchResult();
        }
    },
    computed :{
        userInfo :{
            get(){
                return this.$store.state.userInfo;
            }
        },
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
            this.OFFSET = (this.CURRENT_PAGE_INDEX - 1) * this.LIST_ROW_COUNT;
            if (this.interestToggle == "true"){
                url = "/"+ this.userInfo.userId + "/interest/aparts?limit=" + this.LIST_ROW_COUNT + "&offset=" + this.OFFSET;
            }
            else{
                url = "/aparts/all?limit=" + this.LIST_ROW_COUNT + "&offset=" + this.OFFSET + "&userId=" + this.userInfo.userId;
            }
            url+="&sortType="+ this.sortType;

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
        getSearchResultInit: function () {
            this.OFFSET = 0;
            this.CURRENT_PAGE_INDEX = 1;
            this.sortType = "0";
            this.getSearchResult();
        }, // end getSearchResultInit
        detailApart: async function (aptCode) {
            this.aptCode = aptCode;
            console.log(aptCode);
            this.detailModal.show();
            //displayMarkers(data);
        },
        // 관심 아파트 토글
        changeInterestApart : async function (apart) {
            let response = null;
            if(apart.isUserInterest == 1){
                response = await http.delete("/" + this.userInfo.userId + "/interest/aparts/" + apart.aptCode);
            }
            else{
                response = await http.post("/" + this.userInfo.userId + "/interest/aparts", {userId : this.userInfo.userId, aptCode : apart.aptCode});
            }
            
            let { data } = response;

            if (data == 1) {
                apart.isUserInterest = (apart.isUserInterest+1) % 2;
                if(this.interestToggle){
                    this.getSearchResult();
                }
            }
            //this.getSearchResult();
            //this.sidoList = data;
        },
        //검색 결과 리스트 이벤트 등록
        itemMouseOver : function(event, apart){
            //event.target.style.background = "gray";
            //console.log(apart)
            this.apartItem = apart
        },
        itemMouseOut : function(event){
            //event.target.style.background = "white";
            this.apartItem = null;
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

.apartItem:hover{
    background: lightgrey;
}
/* .list-group-item:nth-child(2n) {
    background-color: lightgray;
} */
</style>
