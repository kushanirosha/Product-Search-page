import React from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Image from 'next/image';
import headerImg from '@/public/header.png';
import Popup from '@/components/popup'; 

export default function Home() {
  return (
      <div className="relative w-full h-screen">
        <Image
          src={headerImg}
          alt="Header Image"
          className="w-full h-full object-cover"
        />
  
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Shop The
            <br className="block md:hidden" />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              &nbsp;Best Deals
            </span>
            <br />
            <span className='break-words'>Around You</span>
          </h1>
          <div className="relative w-full max-w-xs md:max-w-md mt-4">
            <input
              type="text"
              placeholder="Search Smart, Shop Better....."
              className="h-12 w-full rounded-full pl-6 pr-16 bg-white text-black text-sm md:text-base"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-cyan-800 flex items-center justify-center">
              <IoSearchOutline className="text-white text-xl" />
            </button>
          </div>
        </div>
        <Popup />
      </div>
  );
}
