'use client';
import Image from 'next/image';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function HeroCarousel({ banners }) {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={false} // Disable infinite loop
      stopOnHover={true}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      className="rounded-md"
    >
      {banners.map((banner, index) => (
        <Image
          key={index}
          src={banner.imageUrl}
          alt={banner.title}
          className="rounded-md h-96"
          width={3000}
          height={384}
        />
      ))}
    </Carousel>
  );
}
