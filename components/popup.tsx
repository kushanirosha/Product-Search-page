"use client";

import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import contactImg from '@/public/contactImg.jpg';
import { useRouter } from 'next/navigation';

const Popup = () => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.display = 'flex';
        }

        const timer = setTimeout(() => {
            if (popupRef.current) {
                popupRef.current.style.display = 'none';
            }
        }, 9000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        if (popupRef.current) {
            popupRef.current.style.display = 'none';
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePopupClick = () => {
        router.push('/product'); 
    };

    return (
        <div
            ref={popupRef}
            style={{ display: 'none' }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >
            <div ref={containerRef} className="rounded-lg shadow-lg max-w-2xl w-full cursor-pointer" onClick={handlePopupClick}>
                <div className="relative w-full h-96">
                    <Image
                        src={contactImg}
                        alt="Contact Image"
                        fill
                        className="object-cover rounded-lg"
                    />
                    <Button
                        size="lg"
                        radius="full"
                        isIconOnly
                        variant="flat"
                        color="secondary" 
                        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black" 
                        onClick={handleClose}
                    >
                        <IoClose size={20} />
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Popup;
