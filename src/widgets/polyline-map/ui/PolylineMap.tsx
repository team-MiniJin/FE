'use client';

import { MyPlanScheduleT } from '@/widgets/my-plan-list/types/my-plan-type';
import { useEffect, useRef } from 'react';
import COLORS from '../constants/colors';

export default function PolylineMap({
  schedules,
}: {
  schedules: MyPlanScheduleT[];
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  let map: any;

  useEffect(() => {
    if (!document.getElementById('kakao-map-script')) {
      const mapScript = document.createElement('script');
      mapScript.id = 'kakao-map-script';
      mapScript.async = true;
      mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer,drawing&autoload=false`;
      document.head.appendChild(mapScript);
    }
  }, []);

  useEffect(() => {
    const mapScript = document.getElementById('kakao-map-script');
    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(37.5667, 126.9783),
            level: 10,
          };
          map = new window.kakao.maps.Map(mapContainerRef.current, options);
          if (
            schedules.filter((schedule) => schedule.x === 0 && schedule.y === 0)
              .length > 0
          )
            return;

          let lastDate: string | null = null;
          let linePath: any[] = [];
          const bounds = new window.kakao.maps.LatLngBounds();
          let colorIndex = 0;

          schedules.forEach((schedule) => {
            const dateChanged = lastDate !== schedule.schedule_date;
            if (dateChanged && linePath.length > 0) {
              const polyline = new window.kakao.maps.Polyline({
                path: linePath,
                strokeWeight: 5,
                strokeColor: COLORS[colorIndex % COLORS.length],
                strokeOpacity: 0.7,
                strokeStyle: 'solid',
              });
              polyline.setMap(map);
              linePath = [linePath[linePath.length - 1]];
              // eslint-disable-next-line no-plusplus
              colorIndex++;
            }

            const point = new window.kakao.maps.LatLng(schedule.y, schedule.x);
            linePath.push(point);
            bounds.extend(point);

            const marker = new window.kakao.maps.Marker({
              position: point,
            });
            marker.setMap(map);

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px; font-size:12px; height:80px;"><div>${schedule.place_name} (${schedule.schedule_date} ${schedule.arrival_time})</div> <div>${schedule.place_addr}</div></div>`,
            });

            let infowindowOpen = false;

            window.kakao.maps.event.addListener(marker, 'click', () => {
              if (infowindowOpen) {
                infowindow.close();
              } else {
                infowindow.open(map, marker);
              }
              infowindowOpen = !infowindowOpen;
            });

            lastDate = schedule.schedule_date;
          });

          if (linePath.length > 0) {
            const polyline = new window.kakao.maps.Polyline({
              path: linePath,
              strokeWeight: 5,
              strokeColor: COLORS[colorIndex % COLORS.length],
              strokeOpacity: 0.7,
              strokeStyle: 'solid',
            });
            polyline.setMap(map);
          }

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
  }, [schedules]);

  return <div className="h-full w-full" ref={mapContainerRef}></div>;
}
