import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const slides = [
  "https://i.ibb.co.com/G3c3Z6bJ/portrait-young-hipster-man-outdoor-raising-hands-with-backpac-1.jpg",
    "https://i.ibb.co.com/S7W90pvT/tourist-sitting-phu-sub-lek-viewpoint-sunset-lopburi-thailand-1.jpg",
  "https://i.ibb.co.com/Gv1TBkKc/woman-mask-sitting-grass-1.jpg",
  "https://i.ibb.co.com/YTPQhGZ6/portrait-young-man-while-studying-books-1.jpg"
];

const HeroSlider = () => {
  return (
    <div className="relative w-full h-[360px] sm:h-[520px] lg:h-[640px] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        loop
        className="h-full"
      >
        {slides.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={img}
                alt="Learning platform banner"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

              {/* Left Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-6xl w-full px-6 mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-xl text-white"
                  >
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                      Learn Skills for a <br />
                      <span className="text-[#9F62F2]">Digital Life</span>
                    </h1>

                    <p className="mt-4 text-gray-200 text-sm sm:text-base leading-relaxed">
                      Structured lessons, premium content, and practical
                      knowledge designed to help you grow in the digital world.
                    </p>

                  <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 250 }}
  className="inline-block mt-6"
>
  <Link
    to="/public"
    className="px-6 py-3 rounded-lg font-semibold text-white
    bg-gradient-to-r from-[#632EE3] to-[#9F62F2]
    shadow-lg hover:opacity-90 transition block"
  >
    Explore Lessons
  </Link>
</motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
