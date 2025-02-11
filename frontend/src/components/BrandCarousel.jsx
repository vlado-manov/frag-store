import React, { useState, useEffect } from "react";
import gsap from "gsap";
import brandImageFemale from "../images/carousel1.jpg";
import brandImageMale from "../images/carousel3.jpg";

const images = [brandImageFemale, brandImageMale];

const BrandCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentParts = document.querySelectorAll(".image-part.current");
    const nextParts = document.querySelectorAll(".image-part.next");

    gsap.set(nextParts, {
      opacity: 1,
      y: (i) => (i % 2 === 0 ? "-100%" : "100%"),
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsAnimating(false);
      },
    });

    tl.to(currentParts, {
      y: (i) => (i % 2 === 0 ? "100%" : "-100%"),
      duration: 1.2,
      //   stagger: 0.1,
      ease: "power2.inOut",
    }).to(
      nextParts,
      {
        y: "0%",
        duration: 1.2,
        // stagger: 0.1,
        ease: "power2.inOut",
      },
      "-=1.2"
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) startAnimation();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  return (
    <div className="h-[550px] relative overflow-hidden rounded-lg max-w-4xl m-auto">
      {[0, 1].map((i) => (
        <React.Fragment key={i}>
          {[0, 1, 2, 3].map((j) => (
            <div
              key={j}
              className={`absolute w-1/4 h-full top-0 image-part ${
                i === activeIndex ? "current" : "next"
              }`}
              style={{
                backgroundImage: `url(${
                  images[i === activeIndex ? activeIndex : nextIndex]
                })`,
                backgroundSize: "400% 100%",
                backgroundPosition: `${j * 33.33}% center`,
                left: `${j * 25}%`,
                opacity: 1,
              }}
            ></div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BrandCarousel;
