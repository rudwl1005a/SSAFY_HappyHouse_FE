<template>
    <div class="row">
        <div class="col" id="map" style="height: 935px"></div>
        
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
export default {
    props: ["apartList"],
    data() {
        return {
            map: null,
            customOverlay: null,  
            geocoder: null,

            markers: [],
            mapContainer: null,
            mapOption: null,

            apartItemCircle : null,

            departmentList: [],
            apartItemInfo : null,


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
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" + process.env.VUE_APP_KAKAO_MAP_API_KEY;
        document.head.appendChild(script);
    },
    watch: {
        apartList: function () {
            if(this.apartList.length == 0) {
                this.noSearchResult();
                return;
            };
            // console.log("watch : apartList");
            // console.log(this.apartList);
            this.removeMarker();
            if(this.apartList == null) return;
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
        noSearchResult : function(){
            if(this.map == null) return;
            this.removeMarker();
            let bounds = new kakao.maps.LatLngBounds();
            let placePosition = new kakao.maps.LatLng(37.566826, 126.9786567);
            bounds.extend(placePosition);
            this.map.setBounds(bounds);
        },
        displayMarkers: function () {
            const places = Array.from(this.apartList);
            let bounds = new kakao.maps.LatLngBounds();

            // 지도에 표시되고 있는 마커를 제거합니다
            
            let $this = this;
            for (var i = 0; i < places.length; i++) {
                let placePosition = new kakao.maps.LatLng(places[i].lat, places[i].lng);
                let marker = this.addMarker(placePosition, places[i]);

                // console.log(places[i].lat, places[i].lng);
                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(placePosition);

                (function (marker, title, code, place) {
                    window.kakao.maps.event.addListener(marker, "mouseover", function () {
                        $this.drawCircle(place)
                    });
                    window.kakao.maps.event.addListener(marker, "mouseout", function () {
                        $this.removeCircle();
                    });
                    window.kakao.maps.event.addListener(marker, "click", function () {
                        $this.focusApatItem(place)
                    });

                    // itemEl.onmouseover = function () {
                    //     $this.displayInfowindow(marker, title);
                    // };

                    // itemEl.onmouseout = function () {
                    //     $this.customOverlay.setMap(null);
                    // };
                })(marker, places[i].aptName, places[i].aptCode, places[i]);
                //fragment.appendChild(itemEl);
            }
            // 마커를 생성하고 지도에 표시합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            this.map.setBounds(bounds);
        }, //end displayMarkers
        addMarker: function (position, place) {
            // 이미지 바꿔야함
            var imageSrc = "https://cdn1.iconfinder.com/data/icons/user-interface-2-flat/24/point_place_location_map_marker_pin_interface_-512.png";
            
            if(place.isUserInterest == 1){
                imageSrc = "https://cdn1.iconfinder.com/data/icons/map-navigation-flat/64/pin_map_location_place_interface-512.png"; // 마커 이미지 url, 스프라이트 이미지를 씁니다
            }
            
            ; // 마커 이미지 url, 스프라이트 이미지를 씁니다
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
        
        removeAllChildNods: function (el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        },
        // 원 그리기
        drawCircle: function (apart){
            this.apartItemCirclecircle = new kakao.maps.Circle({
                    center : new kakao.maps.LatLng(apart.lat, apart.lng),  // 원의 중심좌표 입니다 
                    radius: 500, // 미터 단위의 원의 반지름입니다 
                    strokeWeight: 1, // 선의 두께입니다 
                    strokeColor: '#75B8FA', // 선의 색깔입니다
                    strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'line', // 선의 스타일 입니다
                    fillColor: '#CFE7FF', // 채우기 색깔입니다
                    fillOpacity: 0.5  // 채우기 불투명도 입니다   
                }); 
                this.apartItemCirclecircle.setMap(this.map);
        },
        removeCircle: function(){
            this.apartItemCirclecircle.setMap(null);
        },
        focusApatItem: function(apart){
            console.log("해당 마커에 포커싱하기");
            let placePosition = new kakao.maps.LatLng(apart.lat, apart.lng);
            let bounds = new kakao.maps.LatLngBounds();
            bounds.extend(placePosition);
            this.map.setBounds(bounds);
        },

    },
};
</script>

<style>
#map {
    width: 100%;
    height: 500px;
}

.overlaybox {
    position: relative;
    width: 360px;
    height: 350px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png") no-repeat;
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
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png") no-repeat right 120px center;
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
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/triangle.png") no-repeat;
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
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/updown.png") no-repeat;
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
</style>
