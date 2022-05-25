<template>
  <div id="map"></div>
</template>

<script>
export default {
  props: ["apartList"],
  data() {
    return {
      root: "",
      map: null,
      ps: null,
      infowindow: null,
      customOverlay: null,
      geocoder: null,

      markers: [],
      mapContainer: null,
      mapOption: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      console.log("initMap")
      return;
    }
    
    const script = document.createElement("script");
    script.onload = () => kakao.maps.load(this.initMap);
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
      process.env.VUE_APP_KAKAO_MAP_API_KEY;
    document.head.appendChild(script);
    
  },
  watch: {
    apartList: function () {
        console.log("watch : apartList")
        console.log(this.apartList)
        
      this.displayMarkers();
    },
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
    displayMarkers: function () {
      const places = Array.from(this.apartList);
      let fragment = document.createDocumentFragment();
      let bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();
      let $this = this;
      for (var i = 0; i < places.length; i++) {
        let placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
        let marker = this.addMarker(placePosition, i);
        let itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        console.log(places[i].lat, places[i].lng);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title, code, place) {
          window.kakao.maps.event.addListener(marker, "click", function () {
            $this.displayInfowindow(marker, title, place);
          });

          window.kakao.maps.event.addListener($this.map, "click", function () {
            console.log($this.customOverlay);
            $this.customOverlay.setMap(null);
          });

          itemEl.onmouseover = function () {
            $this.displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            $this.customOverlay.setMap(null);
          };
        })(marker, places[i].aptName, places[i].aptCode, places[i]);

        fragment.appendChild(itemEl);
      }
      // 마커를 생성하고 지도에 표시합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      this.map.setBounds(bounds);
    }, //end displayMarkers
    addMarker: function (position, idx, title) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
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
    getListItem : function(index, place) {
	var el = document.createElement("li");
	var itemStr = `
		<span class="markerbg marker_${index + 1}></span>
		<div class="info"><h5>${place.aptName}</h5> <button>관심등록</button>
		<span>${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
	`;
	el.innerHTML = itemStr;
	el.className = "item";

	return el;
},
//
    displayInfowindow: function (marker, title, place) {
      var content = `
          <div class="overlaybox">
            <div class="boxtitle">${title}</div>
            <div class="first"><img src="${this.root}/img/apt.png" style="width:247px; height:136px;" alt=""></div>
            <ul>
              <li class="up">
                <span class="title">건축년도</span>
                <span class="count">${place.buildYear}</span>
              </li>
              <li>
                <span class="title">주소</span>
                <span class="count">${place.sidoName} ${place.gugunName} ${place.dongName} ${place.jibun}</span>
              </li>
              <li>
                <span class="title">최신거래금액</span>
                <span class="count">${place.recentPrice}</span>
              </li>
              <li>
                <span class="last" id="recenthistor" data-toggle="modal" data-target="#myModal">아파트정보 update</span>
              </li>
            </ul>
          </div>
        `;
      var position = new kakao.maps.LatLng(
        marker.getPosition().getLat() + 0.00033,
        marker.getPosition().getLng() - 0.00003
      );
      this.customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });
      this.customOverlay.setMap(this.map);
    },
    removeAllChildNods: function (el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },
  },
};
</script>

<style >
#map {
  width: 100%;
  height: 500px;
}

.overlaybox {
  position: relative;
  width: 360px;
  height: 350px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png') no-repeat;
  padding: 15px 10px;
}
.overlaybox div,
ul {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.overlaybox li {
  list-style: none;
}
.overlaybox .boxtitle {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png') no-repeat right 120px
    center;
  margin-bottom: 8px;
}
.overlaybox .first {
  position: relative;
  width: 247px;
  height: 136px;
  margin-bottom: 8px;
}
.first .text {
  color: #fff;
  font-weight: bold;
}
.first .triangle {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  left: 0;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/triangle.png') no-repeat;
  padding: 6px;
  font-size: 18px;
}
.first .movietitle {
  position: absolute;
  width: 100%;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 7px 15px;
  font-size: 14px;
}
.overlaybox ul {
  width: 247px;
}
.overlaybox li {
  position: relative;
  margin-bottom: 2px;
  background: #2b2d36;
  padding: 5px 10px;
  color: #aaabaf;
  line-height: 1;
}
.overlaybox li span {
  display: inline-block;
}
.overlaybox li .number {
  font-size: 16px;
  font-weight: bold;
}
.overlaybox li .title {
  font-size: 13px;
  
}
.overlaybox li .last {
  font-size: 12px;
  margin-right: 15px;
}
.overlaybox ul .arrow {
  position: absolute;
  margin-top: 8px;
  right: 25px;
  width: 5px;
  height: 3px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/updown.png') no-repeat;
}
.overlaybox li .up {
  background-position: 0 -40px;
}
.overlaybox li .down {
  background-position: 0 -60px;
}
.overlaybox li .count {
  position: absolute;
  margin-top: 5px;
  right: 15px;
  font-size: 10px;
}
.overlaybox li:hover {
  color: #fff;
  background: #d24545;
}
.overlaybox li:hover .up {
  background-position: 0 0px;
}
.overlaybox li:hover .down {
  background-position: 0 -20px;
}
</style >