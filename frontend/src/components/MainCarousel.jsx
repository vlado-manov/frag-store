import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomButton from "./ui/CustomButton";

const swipesCarousel = [
  {
    image: "https://i.makeup.uk/d/dy/dy0dbomgw9x8.jpg",
    title: "Prada l'homme",
    desc: "A sophisticated fragrance blending notes of neroli, geranium, and patchouli.",
    direction: "right",
    url: "/products/brands/prada",
  },
  {
    image:
      "https://parfumerienasreen.com/cdn/shop/collections/Creed-Banner_2048x.jpg",
    title: "Bleu de Chanel",
    desc: "Bleu de Chanel is a bold and fresh fragrance for male with notes of citrus, sandalwood, and cedar.",
    direction: "left",
    url: "/products/brands/chanel",
  },
  {
    image:
      "https://cdn.mos.cms.futurecdn.net/hx2LYQjsSVF5nVqucnwUwM-1280-80.jpg",
    title: "Lattafa Raghba",
    desc: "A sweet and smoky fragrance with notes of vanilla, oud, and incense, perfect for any occasion.",
    direction: "right",
    url: "/products/brands/lattafa",
  },
];

const swipesCarouse2 = [
  {
    image:
      "https://cdn.mos.cms.futurecdn.net/hx2LYQjsSVF5nVqucnwUwM-1280-80.jpg",
    url: "/products/67879093b1398b87ee6c1c95",
  },
  {
    image: "https://i.makeup.uk/d/dy/dy0dbomgw9x8.jpg",
    url: "/products/67879093b1398b87ee6c1c1a",
  },
  {
    image:
      "https://parfumerienasreen.com/cdn/shop/collections/Creed-Banner_2048x.jpg",
    url: "/products/67879093b1398b87ee6c1c1c",
  },
];

const MainCarousel = () => {
  return (
    <div className="flex items-center justify-center flex-col md:flex-row gap-1 md:gap-4 w-full px-4">
      <div className="w-full md:w-1/4 h-[240px] md:h-[650px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          direction="vertical"
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="h-full custom-swiper transform rotate-180"
        >
          {swipesCarouse2.map((swipe, index) => (
            <SwiperSlide key={index}>
              <div className="relative transform rotate-180">
                <img
                  src={swipe.image}
                  alt={`Slide ${index}`}
                  className="w-full h-[240px] md:h-[650px] object-cover shadow-lg"
                />
                <CustomButton
                  variant="tertiary"
                  to={swipe.url}
                  tw="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg"
                >
                  Check it now
                </CustomButton>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full md:w-2/4 h-[650px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="custom-swiper"
        >
          {swipesCarousel.map((swipe, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={swipe.image}
                  alt={`Slide ${index}`}
                  className="w-full h-[650px] object-cover shadow-lg"
                />
                <div
                  className={`absolute bg-black bg-opacity-40 backdrop-blur-md md:backdrop-blur-sm hover:backdrop-blur-md duration-300 
                    backdrop-brightness-125 backdrop-contrast-125 p-6 shadow-lg flex flex-col top-1/2 -translate-y-1/2  w-full md:w-fit
                    
                    ${
                      swipe.direction === "right"
                        ? "right-0 md:pr-20 md:pl-6 justify-center text-center md:items-end md:text-right"
                        : "left-0 md:pl-20 md:pr-6 justify-center text-center md:text-left md:items-start"
                    }
                  `}
                >
                  <h1 className="text-white text-3xl font-poiret font-extrabold uppercase drop-shadow">
                    {swipe.title}
                  </h1>
                  <p className="max-w-[320px] text-white font-outfit drop-shadow">
                    {swipe.desc}
                  </p>
                  <CustomButton variant="tertiary" to={swipe.url} tw="mt-4">
                    Learn more
                  </CustomButton>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:block md:w-1/4 h-[650px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          direction="vertical"
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="h-full custom-swiper"
        >
          {swipesCarouse2.map((swipe, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={swipe.image}
                  alt={`Slide ${index}`}
                  className="w-full h-[650px] object-cover shadow-lg"
                />
                <CustomButton
                  variant="tertiary"
                  tw="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg"
                  to={swipe.url}
                >
                  Check it now
                </CustomButton>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MainCarousel;
