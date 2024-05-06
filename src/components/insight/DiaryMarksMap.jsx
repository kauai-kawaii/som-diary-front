import React, { useEffect, useRef } from "react";

function MarkOnKakaoMap({ diaryEntries }) {
  const mapContainer = useRef(null); // Ref for the map container DOM element

  const { kakao } = window;
  useEffect(() => {
    // Ensure Kakao Maps script is loaded
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => initializeMap();
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=b02f9275ed9ae37f968e86f22c98030a&autoload=false";
      document.head.appendChild(script);
      return () => document.head.removeChild(script);
    }
  }, [diaryEntries]); // Dependency array to reload map when entries change

  function initializeMap() {
    window.kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(33.450701, 126.570667); // Default center or dynamic based on entries
      const mapOption = {
        center: center,
        level: 3, // Initial map zoom level
      };
      const map = new kakao.maps.Map(mapContainer.current, mapOption);

      // Add markers for each diary entry
      diaryEntries.forEach((entry) => {
        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; // Photo URL from diary entry
        // const imageSrc = entry.diaryPhoto; // Photo URL from diary entry
        const imageSize = new kakao.maps.Size(40, 45); // Adjust size as needed
        const imageOption = { offset: new kakao.maps.Point(27, 69) };
        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        const markerPosition = new kakao.maps.LatLng(
          parseFloat(entry.diaryLatitude),
          parseFloat(entry.diaryLongitude)
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
      });
    });
  }

  return (
    <>
      <div ref={mapContainer} style={{ width: "40em", height: "20em" }}></div>
    </>
  );
}

export default MarkOnKakaoMap;
