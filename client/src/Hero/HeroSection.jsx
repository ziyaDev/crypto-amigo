import React from 'react';
import Navbar from '../Navbar';
import testimonialPfp from '../assets/testimonialpfp.png';
// import heroIcon1 from '../assets/hero-icon1.svg';
import heroIcon2 from '../assets/hero-icon2.svg';
// import heroIcon3 from '../assets/hero-icon3.svg';
import BitcoinIcon from '../assets/bitcoin.svg';
import EthereumIcon from '../assets/ethereum.svg';
import EmailForm from '../Form/EmailForm';
import Reviews from '../service/ReviewsSection';

function HeroSection() {
  return (
    <section className="hero__section">
      <Navbar />
      <div className="hero__container max-w-5xl py-10 lg:py-20 mx-auto px-7 relative">
        <img
          className="absolute top-0 left-0 w-20 sm:w-20 md:w-25 lg:w-32"
          src={BitcoinIcon}
          alt="CryptoAmigo Icon"
        />
        <img
          className="absolute top-0 right-0 w-20 sm:w-20 md:w-25 lg:w-32"
          src={EthereumIcon}
          alt="CryptoAmigo Icon"
        />
        <img
          className="absolute bottom-0 left-0 right-0 mx-auto translate-y-10 w-20 sm:w-20 md:w-25 lg:w-32"
          src={heroIcon2}
          alt="CryptoAmigo Icon"
        />
        <div className="flex items-center justify-center px-5 py-5">
          <div className="hero-content flex flex-col items-start gap-y-4 w-full">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto text-center xl:flex">
              <span className="before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:from-sky-700 before:to-blue-300 before:mx-auto before:w-full before:h-full before:-z-10 text-black before:-rotate-1 flex-row">
                Welcome to
              </span>
              <span className="before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:from-sky-700 before:to-blue-300 before:mx-auto before:w-full before:h-full before:-z-10 text-white before:-rotate-1 mx-2">
                CryptoAmigo
              </span>
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto text-center">
              <span className="before:absolute before:top-0 before:left-0 before:bg-gradient-to-r before:from-sky-700 before:to-blue-300 before:mx-auto before:w-full before:h-full before:-z-10 text-black before:-rotate-1">
                Your{' '}
                <span className="underline underline-offset-2">
                  beginner-friendly
                </span>{' '}
                crypto newsletter
              </span>
            </h3>
            <p className="md:max-w-md mx-auto text-center lg:text-base text-zinc-700/70">
              Explore The World of Cryptocurrencies With Our{' '}
              <strong className="text-black">Free</strong> Weekly Newsletter.
            </p>
            <div className="flex items-center justify-center mx-auto">
              <img
                src={testimonialPfp}
                alt="User Testimonial"
                className="mr-2"
              />
              <span className="text-xs sm:text-sm md:text-md">
                Join our growing family of crypto amigos!
              </span>
            </div>
            <div className="w-full">
              <EmailForm />
            </div>
            <div className="w-full">
              <Reviews />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
