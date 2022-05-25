<template>
    
<div class="card border-0 shadow apartItem" @mouseover="itemMouseOver(apart)" @mouseout="itemMouseOut()" @click="focusApatItem(apart)">
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
            <div class="col-12 col-xl-8 px-xl-0">
                <div class="d-none d-sm-block">
                    <h2 class="h6 text-gray-400 mb-0"> {{ apart.sidoName }} {{ apart.gugunName }} {{ apart.dongName }} {{ apart.jibun }}</h2>
                    <h5 class="fw-extrabold mb-2">{{ apart.aptName }}</h5>
                </div>
                <small class="text-gray-500">
                    {{ apart.buildYear }}년 건축, <span class="detailApartItem" @click.stop="detailApart(apart.aptCode)">거래 내역 {{apart.dealCount}}건</span>
                </small> 
                <div class="small d-flex mt-1" v-if="apart.dealCount">                               
                    <div>최근 거래 {{apart.recentPrice}}만원, 최고가 {{apart.maxPrice}}만원 <svg class="icon icon-xs text-success" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg><span class="text-success fw-bolder">4%</span></div>
                </div>
            </div>
            <div>
                <font-awesome-icon class="heartIcon" v-bind:icon="heartType[apart.isUserInterest]" 
                    v-bind:style="heartStyle[apart.isUserInterest]"  @click.stop="changeInterestApart(apart)" />
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
    
    data(){
        return{

        }
    },
    methods:{
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
        itemMouseOver : function(apart){
            this.$refs.MapView.drawCircle(apart);
        },
        itemMouseOut : function(){
            this.$refs.MapView.removeCircle();
        },
        focusApatItem : function(apart){
            this.$refs.MapView.focusApatItem(apart);
        },
    }
}
</script>
