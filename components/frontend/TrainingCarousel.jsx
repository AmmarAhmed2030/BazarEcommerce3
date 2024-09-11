'use client';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
export default function TrainingCarousel({ trainings }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
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
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile']}
      //deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="px-4 mb-6"
    >
      {trainings.map((training, index) => (
        <div key={index} className="rounded-lg mr-3 border-2 border-slate-300">
          <Link href="#">
            <Image
              src={training.imageUrl}
              alt={training.title}
              width={556}
              height={556}
              className="w-full  h-52  rounded-t-lg"
            />
          </Link>
          <h2 className="text-slate-800 dark:text-slate-200 text-center mt-2 text-md font-semibold py-6">
            {training.title}
          </h2>
          <p className="px-4 line-clamp-3">{training.description}</p>
          <div className="flex justify-between text-lime-800 dark:text-slate-50 px-6 py-6 gap-4">
            <Link
              href="#"
              className="bg-lime-900 dark:bg-lime-600 dark:hover:bg-lime-600 hover:bg-lime-800  duration-300 transition-all text-slate-50 rounded-md text-center py-2 px-4"
            >
              Read more
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between dark:hover:text-lime-600 text-center"
            >
              <span className="pe-2 "> Talk to the Consultant </span>
              <ArrowRight className="mt-1" />
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
