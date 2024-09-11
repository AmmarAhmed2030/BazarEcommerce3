'use client';

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Product';

export default function CategoryCarousel({ products, isMarket, deviceType }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: isMarket ? 4 : 5,
      slidesToSlide: isMarket ? 4 : 5,
    },
    xl: {
      breakpoint: { max: 2000, min: 1024 },
      items: isMarket ? 4 : 4,
      slidesToSlide: isMarket ? 4 : 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 735 },
      items: isMarket ? 3 : 3,
      slidesToSlide: isMarket ? 3 : 3,
    },
    md: {
      breakpoint: { max: 735, min: 510 },
      items: isMarket ? 2 : 2,
      slidesToSlide: isMarket ? 2 : 2,
    },
    mobile: {
      breakpoint: { max: 510, min: 0 },
      items: isMarket ? 1 : 1,
      slidesToSlide: isMarket ? 1 : 1,
    },
  };

  return (
    <Carousel
      swipeable={true} // Enabled swipe for better user experience
      draggable={true} // Enabled draggable functionality
      showDots={true}
      responsive={responsive}
      ssr={false} // Disabled SSR to prevent rendering issues on the server
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      deviceType={deviceType} // Added back deviceType for better device detection
      dotListClass="custom-dot-list-style"
      itemClass="px-2 mb-6 rounded-lg"
    >
      {products?.map(
        (product, index) =>
          product ? <Product product={product} key={index} /> : null, // Added check for valid product
      )}
    </Carousel>
  );
}
