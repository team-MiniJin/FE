/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  images: {
    domains: ['tong.visitkorea.or.kr', 'dapi.kakao.com'],
  },
};

export default nextConfig;
