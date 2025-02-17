"use client";  

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; 
import { useRouter } from 'next/navigation';  
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';  

SwiperCore.use([Navigation, Pagination, Autoplay]);

const HeroSlider = () => {
  const router = useRouter();

  const slides = [
    {
      image: '/contactImg.jpg',
      text: 'About Us',
      link: '/about',
    },
    {
      image: '/header.png',
      text: 'Product',
      link: '/product',
    },
    {
      image: '/contactImg.jpg',
      text: 'Docs',
      link: '/docs',
    },
    {
        image: '/header.png',
        text: 'Docs',
        link: '/docs',
    },
  ];

  return (
    <Swiper
      navigation
      pagination
      autoplay={{ delay: 3000 }}  
      className="h-screen w-screen"  
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <img src={slide.image} alt={slide.text} className="w-full h-screen " />
          <div className="absolute inset-0 flex justify-center items-center">
            <button
              onClick={() => router.push(slide.link)}  
              className="text-white text-4xl font-bold bg-black bg-opacity-50 px-6 py-2 rounded-lg"
            >
              {slide.text}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
