import React from "react";
import Navbar from "../Navbar";
import testimonialPfp from "../assets/testimonialpfp.png";
import heroIcon1 from "../assets/hero-icon1.svg";
import heroIcon2 from "../assets/hero-icon2.svg";
import heroIcon3 from "../assets/hero-icon3.svg";

function HeroSection() {
  return (
    <section className="hero__section">
      <Navbar />
      <div className="hero__container max-w-5xl py-10 lg:py-20 mx-auto px-7 relative">
        <img
          className="hidden lg:block absolute top-0 left-0"
          src={heroIcon1}
          alt="CryptoAmigo Icon"
        />
        <img
          className="hidden lg:block absolute top-0 right-0"
          src={heroIcon2}
          alt="CryptoAmigo Icon"
        />
        <img
          className=" hidden lg:block absolute bottom-0 left-0 right-0 mx-auto translate-y-5"
          src={heroIcon3}
          alt="CryptoAmigo Icon"
        />
        <div className=" flex items-center justify-center px-10 py-3.5">
          <div className="hero-content flex flex-col items-start gap-y-5 w-full">
            <h2 className="relative text-2xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto text-center">
              <span className="relative before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:from-sky-700 before:to-blue-300 before:mx-auto before:w-full before:h-full before:-z-10 text-white before:-rotate-1">
                Decrypting Crypto
              </span>{" "}
              Discover the power of simplicity with CryptoAmigo
            </h2>
            <p className="md:max-w-md mx-auto text-center font-medium text-sm lg:text-base text-zinc-700/70">
              Unravel the complexities of cryptocurrency through our easy-to-understand, jargon-free newsletter.
            </p>
            <div className="flex flex-col gap-y-2 items-center justify-center mx-auto">
              <img src={testimonialPfp} alt="User Testimonial" />
              <p>Embraced by a community keen on making crypto accessible, Join the movement!</p>
            </div>
            <a
              href="#subscribe"
              className="text-white bg-[#EDA35E] hover:bg-[#EDA35E]/80 px-5 py-2 rounded-lg mx-auto transition-colors duration-300"
            >
              Subscribe for Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
