import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
    return (
        <div className="w-full h-[350px] sm:h-[500px] lg:h-[640px] rounded-md overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500 }}
                effect="fade"
                loop={true}
            >
                <SwiperSlide>
                   <img src="https://i.ibb.co.com/27Y4T88C/medium-shot-woman-with-book-double-exposure.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                   <img src="https://i.ibb.co.com/S7K3tswz/4235926.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                   <img src="https://i.ibb.co.com/cXNJxpyN/3860811.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                   <img className='w-full' src="https://i.ibb.co.com/6c8gnTLK/Screenshot-2025-12-08-184128.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                   <img className='w-full' src="https://i.ibb.co.com/TxW0hLtg/colorful-cyclist-bicycle-silhouettes.jpg" alt="" />
                </SwiperSlide>
               

            </Swiper>
        </div>
    );
};

export default HeroSlider;
