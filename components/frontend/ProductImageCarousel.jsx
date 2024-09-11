'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ProductImageCarousel({
  productImages = [],
  thumbnail,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="col-span-3">
      {productImages?.length === 0 ? (
        <Image
          src={thumbnail}
          alt="product image"
          width={800}
          height={800}
          className="w-full"
        />
      ) : (
        <>
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {productImages?.map((image, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={image}
                  alt={`Product image ${i + 1}`}
                  width={3000}
                  height={3000}
                  className="object-cover w-48 h-48"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {productImages.map((image, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={image}
                  alt={`Thumbnail ${i + 1}`}
                  width={3000}
                  height={3000}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
