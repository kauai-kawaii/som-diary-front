import React, {useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const {kakao} = window;
export default function Location() {
    const navigate = useNavigate();
    const [location, setLocation] = useState([]); // 사용자가 클릭한 위치 이름을 저장할 변수

    useEffect(() => {
        let markers = [];

        const mapContainer = document.getElementById('map'),
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567),
                level: 3
            };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        const ps = new kakao.maps.services.Places();

        const infowindow = new kakao.maps.InfoWindow({zIndex:1});

        searchPlaces();

        function searchPlaces() {
            let searchButton = document.getElementById('search-btn')
            searchButton.addEventListener('click',() => {
                let keyword = document.getElementById('search-input').value;

                if (!keyword.replace(/^\s+|\s+$/g, '')) {
                    alert('키워드를 입력해주세요!');
                    return false;
                }

                ps.keywordSearch( keyword, placesSearchCB);
            })
        }

        function placesSearchCB(data, status) {
            if (status === kakao.maps.services.Status.OK) {

                displayPlaces(data);

            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
                return;
            } else if (status === kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
            }
        }

        function displayPlaces(places) {

            let listEl = document.getElementById('location-list'),
                fragment = document.createDocumentFragment(),
                bounds = new kakao.maps.LatLngBounds(),
                listStr = '';

            removeAllChildNods(listEl);
            removeMarker();

            for ( let i=0; i<places.length; i++ ) {

                let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                    marker = addMarker(placePosition, i),
                    itemEl = getListItem(i, places[i]);

                bounds.extend(placePosition);
                (function(marker, title,latitude,longitude) {
                    kakao.maps.event.addListener(marker, 'mouseover', function() {
                        displayInfowindow(marker, title);
                    });

                    kakao.maps.event.addListener(marker, 'mouseout', function() {
                        infowindow.close();
                    });

                    itemEl.onmouseover =  function () {
                        displayInfowindow(marker, title);

                    };

                    itemEl.onmouseout =  function () {
                        infowindow.close();
                    };

                    itemEl.onclick =  function () {
                        const newLocation = {
                            name: title,
                            address:places[i].road_address_name,
                            y: latitude,
                            x: longitude,
                        };

                        setLocation([...location, newLocation]);
                    };

                })(marker, places[i].place_name ,places[i].y, places[i].x,);

                fragment.appendChild(itemEl);
            }

            listEl.appendChild(fragment);
            map.setBounds(bounds);
        }

        function getListItem(index, places) {
            let el = document.createElement('li'),
            itemStr =
                '<div class="info">' +
                '<span id="user-location" class="cursor-pointer text-xs font-bold">' + places.place_name + '</span>' +
                '<br>';

            if (places.road_address_name) {
                        itemStr += '<span class="text-xs">' + places.road_address_name + '</span>' + '<br>'+
                            '<span class="jibun gray text-xs text-gray-500" >' +  places.address_name  + '</span>';
                    } else {
                        itemStr += '<span class="text-xs text-gray-500">' +  places.address_name  + '</span>';
                    }

            itemStr += '<br>'+'<span class="tel text-xs text-blue-700">' + places.phone  + '</span>' + '<hr>'+
                        '</div>';

            el.innerHTML = itemStr;
            el.className = 'item';
            return el;
        }


        function addMarker(position, idx, title) {
            let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
                imageSize = new kakao.maps.Size(36, 37),
                imgOptions =  {
                    spriteSize : new kakao.maps.Size(36, 691),
                    spriteOrigin : new kakao.maps.Point(0, (idx*46)+10),
                    offset: new kakao.maps.Point(13, 37)
                },
                markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                    position: position,
                    image: markerImage
                });

            marker.setMap(map);
            markers.push(marker);

            return marker;
        }

        function removeMarker() {
            for ( let i = 0; i < markers.length; i++ ) {
                markers[i].setMap(null);
            }
            markers = [];
        }

        function displayInfowindow(marker, title) {
            const content = '<div style="padding:2px;z-index:1;font-size:10px;">' + title + '</div>';

            infowindow.setContent(content);
            infowindow.open(map, marker);
        }

        function removeAllChildNods(el) {
            while (el.hasChildNodes()) {
                el.removeChild (el.lastChild);
            }
        }
    }, []);

    return (
        <div className="p-5">
            <div className="mb-2 sm:flex-row">
                <input
                    id="search-input"
                    type="text"
                    placeholder="위치 검색"
                    className="p-1 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto border border-gray-400"
                />
                <input
                    id="search-btn"
                    type="button"
                    value="검색"
                    className="inline-flex items-center rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                    style={{cursor: "pointer"}}
                />
            </div>

            <div class="map_wrap" className="flex flex-col sm:flex-row">
                {/*검색 결과 리스트*/}
                <div id="location-list"
                     className="border border-gray-400 p-2  sm:mb-0 sm:mr-2 w-full sm:w-auto"
                     style={{width: "200px",listStyleType: "none", overflowY: "auto", maxHeight: "400px"}}>
                </div>


                {/*지도 마커 표시*/}
                <div
                    id="map"
                    className="border border-gray-400 p-2 w-full sm:w-auto"
                    style={{height: '400px', width: '500px'}}
                ></div>
            </div>
            <input
                type="button"
                value="확인"
                onClick={() => {
                    if (location) {
                        navigate(`/diary`, { state: { location } });
                    } else {
                        alert('위치를 선택하세요!');
                    }
                }}
                className="mt-2 sm:mt-2 inline-flex items-center rounded-md bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                style={{cursor: "pointer"}}
            />
        </div>
    );
}