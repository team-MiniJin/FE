'use client';

import { useState, useEffect, useRef } from 'react';

const useCarousel = (
  breakpoints: { [key: number]: number },
  totalSlides: number,
  autoSlide: boolean = false,
  interval: number = 3000,
  isInfinity: boolean = false
) => {
  const [carouselStartIndex, setCarouselStartIndex] = useState<number>(0);
  const [visibleSlides, setVisibleSlides] =
    useState<number>(getVisibleSlides());
  const [isAutoSliding, setIsAutoSliding] = useState<boolean>(autoSlide);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function getVisibleSlides() {
    let slides =
      Object.values(breakpoints)[Object.values(breakpoints).length - 1]; // 기본 값
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      // 주어진 브레이크포인트에 따라 슬라이드 수 설정
      // eslint-disable-next-line no-restricted-syntax
      for (const breakpoint in breakpoints) {
        if (width >= parseInt(breakpoint, 10)) {
          slides = breakpoints[breakpoint];
        }
      }
    }
    return slides;
  }

  useEffect(() => {
    function handleResize() {
      setVisibleSlides(getVisibleSlides());
    }

    window.addEventListener('resize', handleResize);

    // 초기 설정
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoints]);

  const nextItem = () => {
    setCarouselStartIndex((prevIndex) => {
      const newIndex = prevIndex + visibleSlides;
      if (isInfinity) {
        return newIndex >= totalSlides ? 0 : newIndex;
      }
      return newIndex >= totalSlides ? prevIndex : newIndex;
    });
  };

  const prevItem = () => {
    setCarouselStartIndex((prevIndex) => {
      const newIndex = prevIndex - visibleSlides;
      if (isInfinity) {
        return newIndex < 0 ? totalSlides - 1 : newIndex;
      }
      return newIndex < 0 ? prevIndex : newIndex;
    });
  };

  useEffect(() => {
    if (isAutoSliding) {
      intervalRef.current = setInterval(nextItem, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoSliding, interval]);

  const toggleAutoSlide = () => {
    setIsAutoSliding((prev) => !prev);
  };

  return {
    carouselStartIndex,
    visibleSlides,
    setVisibleSlides,
    nextItem,
    prevItem,
    isAutoSliding,
    toggleAutoSlide,
  };
};

export default useCarousel;
