'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export default function MarketsCarousel({ markets }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    xl: {
      breakpoint: { max: 2000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 412 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    md: {
      breakpoint: { max: 412, min: 360 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 360, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      //deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="px-4 mb-6"
    >
      {markets.map((market, index) => (
        <div key={index} className="rounded-lg">
          <Link
            href={`market/${market.slug}`}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={market.logoUrl}
              alt={market.title}
              width={556}
              height={556}
              className="w-24 h-24 bg-slate-300 dark:bg-slate-800 rounded-full "
            />
            <h2 className="text-slate-800 dark:text-slate-200 text-center mt-2 ">
              {market.title}
            </h2>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
