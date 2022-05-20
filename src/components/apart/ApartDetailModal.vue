<template>
  <div
    class="modal fade"
    id="modalApartDetail"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      style="max-width: 100%; width: 60%; display: table"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalApartDetailTitle">
            {{ apartInfo.aptName }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body leftSide" style="height: 500px">
          <div class="row" id="divApartInfo">
              <h3>{{apartInfo.sidoName}} {{apartInfo.gugunName}} {{apartInfo.dongName}} {{apartInfo.jibun}} , {{apartInfo.buildYear}}년 건축</h3>
            <div
              v-for="(houseDeal, index) in apartInfo.houseDealList"
              :key="index"
            >
                {{index+1}} 전용 면적 : {{houseDeal.area}}m², 거래 날짜 :
                {{houseDeal.dealYear}}-{{houseDeal.dealMonth}}-{{houseDeal.dealDay}},
                <strong>거래 금액 : {{houseDeal.dealAmount}}</strong>
            </div>
            <br><br><hr><h3>가까운 지하철</h3>

            <div
              v-for="(subway, index) in apartInfo.subwayList"
              :key="index">
                <div>{{subway.line}} {{subway.station}}역, 거리 : {{subway.distance}}km</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            id="btnUserInterestApart"
          >
            관심 아파트 등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/common/axios.js";
export default {
  props: ["aptCode"],
  data() {
    return {
      apartInfo: {},
    };
  },
  watch: {
    aptCode: async function () {
      console.log(this.aptCode + " modal");
      let url = "/aparts/" + this.aptCode;

      let response = await http.get(url);
      let { data } = response;
      this.apartInfo = data;

      console.log(this.apartInfo.subwayList);
    },
  },
  methods: {},
};
</script>

<style scoped>
.modal-dialog.modal-fullsize { 
	width: 100%; 
	height: 100%; 
	margin: 0; 
	padding: 0; 
}

.modal-content.modal-fullsize {
  height: auto;
  min-height: 100%;
  border-radius: 0; 
}

.leftSide {
	overflow:scroll; 
	-ms-overflow-style: none;
	height: 650px;
}

.leftSide::-webkit-scrollbar {
    display: none;
}

.list-group-item:nth-child(2n) {
	background-color: lightgray;
}

.page-link {
	color: #0dcaf0;
}

.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #0dcaf0;
    border-color: #0dcaf0;
}

.page-link:hover {
    z-index: 2;
    color: white;
    background-color: #0dcaf0;
    border-color: #0dcaf0;
}

.page-link:focus {
    box-shadow: 0 0 0 0.25rem #0dcaf030;
}
</style>
