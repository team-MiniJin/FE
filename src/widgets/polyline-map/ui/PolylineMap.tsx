'use client';

import { MyPlanScheduleT } from '@/widgets/my-plan-list/types/myPlans';
import { useEffect, useRef } from 'react';

export default function PolylineMap({
  coordinates,
  schedules,
}: {
  coordinates: [number, number][];
  schedules: MyPlanScheduleT[];
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  let map: any;

  useEffect(() => {
    const mapScript = document.getElementById('kakao-map-script');
    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 2,
          };
          map = new window.kakao.maps.Map(mapContainerRef.current, options);

          // coordinates를 사용하여 폴리라인 추가
          const linePath = coordinates.map(
            (coord) => new window.kakao.maps.LatLng(coord[0], coord[1])
          );

          const polyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5, // 선의 두께
            strokeColor: '#FF0000', // 선의 색깔
            strokeOpacity: 0.7, // 선의 불투명도
            strokeStyle: 'solid', // 선의 스타일
          });
          polyline.setMap(map);

          // 지도의 범위를 폴리라인의 범위에 맞게 설정
          const bounds = new window.kakao.maps.LatLngBounds();
          linePath.forEach((point, idx) => {
            bounds.extend(point);

            // 마커 추가
            const marker = new window.kakao.maps.Marker({
              position: point,
            });
            marker.setMap(map);

            // 인포윈도우 추가
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px; font-size:12px; height:80px;"><div>${schedules[idx].place_name} (${schedules[idx].schedule_date} ${schedules[idx].arrival_time})</div> <div>${schedules[idx].place_addr}</div></div>`,
            });

            // 인포윈도우 표시
            infowindow.open(map, marker);
          });
          map.setBounds(bounds);
        });
      }
    };

    if (mapScript) {
      mapScript.addEventListener('load', onLoadKakaoMap);
      if (window.kakao && window.kakao.maps) {
        onLoadKakaoMap();
      }
    }

    return () => {
      mapScript?.removeEventListener('load', onLoadKakaoMap);
    };
  }, [coordinates]);

  return <div className="h-full w-full" ref={mapContainerRef}></div>;
}
