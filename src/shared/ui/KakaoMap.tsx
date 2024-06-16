'use client';

import React, { useEffect } from 'react';

interface KakaoMapProps {
  mapx: number | undefined;
  mapy: number | undefined;
  title: string | undefined;
}

export default function KakaoMap({ mapx, mapy, title }: KakaoMapProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(mapy, mapx),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(mapy, mapx);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });
        marker.setMap(map);

        const content = `<div style="position:relative;bottom:85px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;box-shadow:0px 1px 2px #888;">
          <a href="https://map.kakao.com/link/to/${title},${mapy},${mapx}" target="_blank" style="display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;">
            <span style="display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;">길찾기</span>
          </a>
          <div style="content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')"></div>
        </div>`;

        const position = new window.kakao.maps.LatLng(mapy, mapx);

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position,
          content,
        });

        customOverlay.setMap(map);

        window.kakao.maps.event.addListener(marker, 'click', () => {
          window.open(
            `https://map.kakao.com/link/to/${title},${mapy},${mapx}`,
            '_blank'
          );
        });
      });
    };
    document.head.appendChild(script);
  }, [mapx, mapy]);

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
}
