<template>
  <div class="row">
    <div class="col" id="map" style="height: 935px">
    <div class="nav-wrapper position-relative showCategory" v-show="showCategoryToggle"> 
        <ul class="nav nav-pills rounded nav-fill flex-column flex-md-row">
            <li class="nav-item">
                <a class="nav-link mb-sm-3 mb-md-0 active" data-bs-toggle="tab" @click="category='음식'"> 
                    <font-awesome-icon icon="fa-solid fa-utensils fa-2xl" style="color:coral"/> 음식점 </a>
            </li>
            <li class="nav-item">
                <a class="nav-link mb-sm-3 mb-md-0" data-bs-toggle="tab" @click="category='학문/교육'">
                    <font-awesome-icon icon="fa-solid fa-graduation-cap fa-2xl" style="color:dodgerblue"/> 교육 </a>
            </li>
            <li class="nav-item">
                <a class="nav-link mb-sm-3 mb-md-0" data-bs-toggle="tab" @click="category='지하철'">
                    <font-awesome-icon icon="fa-solid fa-train-subway fa-2xl" style="color:green"/> 지하철</a>
            </li>
            <li class="nav-item">
                <a class="nav-link mb-sm-3 mb-md-0" data-bs-toggle="tab" @click="category='소매'">
                    <font-awesome-icon icon="fa-solid fa-cart-shopping fa-2xl" style="color:mediumturquoise"/> 소매</a>
            </li>
            <li class="nav-item">
                <a class="nav-link mb-sm-3 mb-md-0" data-bs-toggle="tab" @click="category='관광/여가/오락'">
                    <font-awesome-icon icon="fa-solid fa-gamepad fa-10x" style="color:red"/> 오락</a>
            </li>
            <li class="nav-item">
                <a class="nav-link mb-sm-3 mb-md-0" data-bs-toggle="tab" @click="category='생활서비스'">
                    <font-awesome-icon icon="fa-solid fa-tags fa-10x" style="color:black"/> 기타</a>
            </li>
        </ul>
        
            
            
            
            
    </div>
        

    </div>
  </div>
</template>
<!--
    맵에서 할 일
    1. info 창주기
    2. 주변상권 보여주기
    3. 주변상권 토글
    4. 모든 리스트 종료 구현

-->
<script>
import http from "@/common/axios.js";
import svgIcon from "@/assets/js/svg.js"

export default {
  props: ["apartList"],
  data() {
    return {
      map: null,
      geocoder: null,

      markers: [],
      mapContainer: null,
      mapOption: null,

      apartItemCircle: null,
      apartItemInfo: null,
      customOverlay: null,
      departmentList: [],

      //toggle flags
      showCategoryToggle : false,
      category : "음식",

      focusPlace : null,
      shopList: [],
      shopOverlays : [],
      

      iconColor : {
          "음식" : "coral",
          "학문/교육":"dodgerblue",
          "지하철" : "green",
          "소매" : "mediumturquoise",
          "관광/여가/오락" : "red",
          "생활서비스" : "black"
      },
      shopIcon:{
        "음식" : svgIcon.foodSvg,
        "학문/교육" : svgIcon.studySvg,
        "소매" : svgIcon.someSvg,
        "관광/여가/오락" : svgIcon.enterSvg,
        "생활서비스" : svgIcon.etcSvg,
      }
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      console.log("initMap");
      return;
    }
    console.log(process.env.VUE_APP_KAKAO_MAP_API_KEY);
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(this.initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
      process.env.VUE_APP_KAKAO_MAP_API_KEY;
    document.head.appendChild(script);
  },
  watch: {
    apartList: function () {
      if (this.apartList.length == 0) {
        this.noSearchResult();
        return;
      }
      // console.log("watch : apartList");
      // console.log(this.apartList);
      this.removeMarker();
      if (this.apartList == null) return;
      this.displayMarkers();
    },
    category : function(){
        console.log(this.category);
        this.getShopList();
    }
  },
  methods: {
    initMap: function () {
      this.mapContainer = document.getElementById("map");

      this.mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      this.map = new kakao.maps.Map(this.mapContainer, this.mapOption);
      // init map
    },
    noSearchResult: function () {
      if (this.map == null) return;
      this.removeMarker();
      let bounds = new kakao.maps.LatLngBounds();
      let placePosition = new kakao.maps.LatLng(37.566826, 126.9786567);
      bounds.extend(placePosition);
      this.map.setBounds(bounds);

      //서울 시청 찍어주는 것 대신에 baseAddress에서 위도경도 받아서 찍어주기
      // 백단에서도 추가해야함
    },
    displayMarkers: function () {
      const places = Array.from(this.apartList);
      let bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다

      let $this = this;
      for (var i = 0; i < places.length; i++) {
        let placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
        let marker = this.addMarker(placePosition, places[i]);
        //let itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        // console.log(places[i].lat, places[i].lng);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        (function (marker, title, code, place) {
          window.kakao.maps.event.addListener(marker, "mouseover", function () {
            $this.drawCircle(place);
          });
          window.kakao.maps.event.addListener(marker, "mouseout", function () {
            $this.removeCircle();
          });
          window.kakao.maps.event.addListener(marker, "click", function () {
            $this.focusApatItem(place);
            $this.getShopList();
            $this.showCategoryToggle = true;
            if($this.customOverlay != null){
                $this.customOverlay.setMap(null);
                $this.removeCategoryList();
            }

            $this.displayInfowindow(marker, title, place);
          });
          window.kakao.maps.event.addListener($this.map, "click", function () {
            if($this.customOverlay != null){
                $this.showCategoryToggle = false;
                $this.customOverlay.setMap(null);
                $this.removeCategoryList();
            }
          });
          ////////////////////////////////////////////////////////////////////////////////
        })(marker, places[i].aptName, places[i].aptCode, places[i]);
        //fragment.appendChild(itemEl);
      }
      // 마커를 생성하고 지도에 표시합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.map.setBounds(bounds);
    }, //end displayMarkers
    addMarker: function (position, place) {
      var imageSrc =
        "https://cdn1.iconfinder.com/data/icons/user-interface-2-flat/24/point_place_location_map_marker_pin_interface_-512.png";

      if (place.isUserInterest == 1) {
        imageSrc =
          "https://cdn1.iconfinder.com/data/icons/map-navigation-flat/64/pin_map_location_place_interface-512.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
      } // 마커 이미지 url, 스프라이트 이미지를 씁니다

      var imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    removeMarker: function () {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    // 원 그리기
    drawCircle: function (place) {
      this.apartItemCirclecircle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(place.lat, place.lng), // 원의 중심좌표 입니다
        radius: 500, // 미터 단위의 원의 반지름입니다
        strokeWeight: 1, // 선의 두께입니다
        strokeColor: "#75B8FA", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "line", // 선의 스타일 입니다
        fillColor: "#CFE7FF", // 채우기 색깔입니다
        fillOpacity: 0.5, // 채우기 불투명도 입니다
      });
      this.apartItemCirclecircle.setMap(this.map);
    },
    removeCircle: function () {
      this.apartItemCirclecircle.setMap(null);
    },
    //클릭한 아파트에 포커싱하기
    focusApatItem: function (place) {
      console.log("해당 마커에 포커싱하기");
      let placePosition = new kakao.maps.LatLng(place.lat, place.lng);
      let bounds = new kakao.maps.LatLngBounds();
      bounds.extend(placePosition);
      this.map.setBounds(bounds);

      this.focusPlace = place;
    },
    //아파트 클릭시 정보 출력
    displayInfowindow: function (marker, title, place) {
        var content = `
                '<div class="overlay_info">
                    <a href="#" target="_blank">`+ svgIcon.buildingSvg +`<strong>${title}</strong></a>
                    <ul>
                        <li class="up">
                            <span class="title">주소</span>
                            <span class="count">${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
                        </li>
                        <li>
                            <span class="title">건축년도</span>
                            <span class="count">${place.buildYear}</span>
                        </li>
                        <li>
                            <span class="title">건축년도</span>
                            <span class="count">${place.buildYear}</span>
                        </li>
                    </ul>
                        <bottun > 주변상권 보기 </bottun>
                    </div>
                </div>
            `;//클릭 이벤트 넣기
        var position = new kakao.maps.LatLng(
            place.lat,
            place.lng
        );
        this.customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            //xAnchor: 0.3,
            yAnchor: 1,
        });
        this.customOverlay.setMap(this.map);
        
    },
    /////////////////////////////////////////////////////////////////////////
    getShopList: async function(){
        try{
            let params = {
                category : this.category,
                lat : this.focusPlace.lat,
                lng : this.focusPlace.lng,
            }
            let response = await http.get("/aparts/shops", { params });
            let { data } = response;
            console.log(data);

            if(data.result == 1){
                this.removeCategoryList();
                this.shopList = data.list;
                this.shopList.forEach(shop =>{
                    this.addShopInfo(shop);
                })
            }
            
        }catch(e){
            console.error(e)
        }
    },
    removeCategoryList: function () {
      this.shopOverlays.forEach(el => {
          el.setMap(null);
      })
    },//end removeCategoryList
    //
    getIcon : function(category) {
        if(category == "음식") return svgIcon.foodSvg
        if(category == "학문/교육") return svgIcon.studySvg
        //if(category == "") return svgIcon.subwaySvg
        if(category == "소매") return svgIcon.someSvg
        if(category == "관광/여가/오락") return svgIcon.enterSvg
        if(category == "생활서비스") return svgIcon.etcSvg
    },
    addShopInfo : function(shop){
        let icon = this.getIcon(shop.commercialName);
        let color = "";
        var content = `
                <div class="overlay-shop-info" style="border: 1px solid ${ this.iconColor[shop.commercialName] };">
                    <div class="shop-info-icon-div" style="background-color: ${ this.iconColor[shop.commercialName] };">
                    ${ this.shopIcon[shop.commercialName] }
                    
                    </div>
                    <div class="shop-info-content"> 
                        <div class="shop-info-title"> <a><stong> ${shop.name} ${shop.branchName} </stong></a>
                        </div>
                        <div class="shop-info-sub">${shop.classification}
                        </div>
                    </div>
                </div>`;
        var position = new kakao.maps.LatLng(
            shop.lat,
            shop.lng
        );
        let customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            xAnchor: 0.1,
            yAnchor: 1.3,
        });
        customOverlay.setMap(this.map);
        console.log(customOverlay.event);
        this.shopOverlays.push(customOverlay);

        
    }
  },
};
</script>

<style >
#map {
  width: 100%;
  height: 500px;
}
.overlaybox div, ul {
    overflow: hidden;
    margin: 0;
    padding: 0;
}
.overlaybox li {
    list-style: none;
}
.overlay_info {
  border-radius: 6px;
  margin-bottom: 12px;
  float: left;
  position: relative;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  background-color: #fff;
  min-width: 210px;
}
.overlay_info:hover {
  z-index: 2;
}
.overlay_info:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.overlay_info a {
  display: block;
  background: #31316A;
  background: #31316A
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
  text-decoration: none;
  color: #fff;
  padding: 12px 36px 12px 14px;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
}

.overlay_info .desc {
  padding: 14px;
  position: relative;
  min-width: 200px;
  height: 100px;
}
.overlay_info img {
  vertical-align: top;
}
.overlay_info .address {
  font-size: 12px;
  color: #333;
  position: absolute;
  left: 80px;
  right: 14px;
  top: 24px;
  white-space: normal;
}
.overlay_info:after {
  content: "";
  position: absolute;
  margin-left: -11px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png)
    no-repeat 0 bottom;
}
.overlay_info li .title {
    font-size: 13px;
    padding: 5px;
}

.overlay_info li .count {
    position: absolute;
    margin-top: 5px;
    right: 15px;
    font-size: 11px;
}
/*                       카테고리                        */
.showCategory{
    position: absolute;
    top:1%;
    left:5%;

    width: 800px;
    height: 100px;

    z-index: 4;
}
.nav-item {
    padding: 0px;
    max-width: 120px;
    
}

.nav-pills .nav-link, .nav-pills .show {
    transition: all 0.2s ease;
    background-color: #f8f8f8;
}
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #1F2937;
    background-color: lightgray;
    border-color: #1F2937;
}
/*            상권정보                             */
.overlay-shop-info{
    width: 200px;
    border-radius: 20px;
    display:inline-block;
    background-color: #f8f8f8;
    height: 35px;
}
/* .overlay-shop-info:after {
  content: '';
	position: absolute;
	bottom: 0;
	left: 10%;
	width: 0;
	height: 0;
	border: 8px solid transparent;
	border-top-color: black;
	border-bottom: 0;
	margin-left: -8px;
	margin-bottom: -6px;
} */
.overlay-shop-info :hover {
    z-index: 2;
    border-color: black;
    background-color: black;
}

.overlay-shop-info:after {
    content: '';
    position: absolute;
    border-top: 10px solid #f8f8f8;;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: -3px;
    left: 10%;
}
.overlay-shop-info:before {
    content: '';
    position: absolute;
    border-top: 10px solid black;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: -4px;
    left: 10%;
}
.shop-info-icon-div{
    width: 28px;
    height: 28px;
    margin: 3px;
    float: left;
    text-align: center;
    border-radius: 50%;
}
.overlay-shop-info-icon{
    color: white;
    vertical-align: middle;
    font-size:20px;
}   
.shop-info-content{ 
    float: left;
    
}
.shop-info-title{
    font-size: 13px;
    font-weight: bold;
}
.shop-info-sub{
    font-size: 8px;
    color: darkgrey;
}
</style>
