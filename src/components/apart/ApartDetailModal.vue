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
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body leftSide" style="height: 500px">
        <h3>{{apartInfo.sidoName}} {{apartInfo.gugunName}} {{apartInfo.dongName}} {{apartInfo.jibun}} , {{apartInfo.buildYear}}년 건축</h3>
          <div class="card border-0 shadow mb-4">
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0 rounded">
                  <thead class="thead-light">
                    <th class="border-0 rounded-start">전용 면적</th>
                    <th class="border-0">거래 날짜</th>
                    <th class="border-0 rounded-end">거래 금액</th>
                  </thead>
                  <tr v-for="(houseDeal, index) in apartInfo.houseDealList" :key="index" style="border-color: inherit; border-style: solid; border-width: 0;">
                      <td >{{houseDeal.area}}m²</td>
                      <td>{{houseDeal.dealYear}}-{{houseDeal.dealMonth}}-{{houseDeal.dealDay}}</td>
                      <td>{{houseDeal.dealAmount}}만원</td>
                  </tr>
                </table>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" > Close</button>
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

tbody, td, tfoot, th, thead, tr {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
}
</style>
