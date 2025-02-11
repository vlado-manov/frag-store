import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box } from "@mui/material";

const images = [
  "https://i.makeup.uk/d/dy/dy0dbomgw9x8.jpg",
  "https://parfumerienasreen.com/cdn/shop/collections/Creed-Banner_2048x.jpg",
  "https://cdn.mos.cms.futurecdn.net/hx2LYQjsSVF5nVqucnwUwM-1280-80.jpg",
];

const MainCarousel = () => {
  return (
    <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MainCarousel;
