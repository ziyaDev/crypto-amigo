import React from 'react';
// import icon1 from '../assets/icon1.svg';
// import icon2 from '../assets/icon2.svg';
// import icon3 from '../assets/icon3.svg';
import TwitterBirdIcon from '../assets/twitter-bird-icon.svg';

const servicesData = [
  {
    title: '#RWA',
    price: 'Real World Assets',
    image: TwitterBirdIcon,
  },
  {
    title: '#Web3Gaming',
    price: 'Gaming tokens',
    image: TwitterBirdIcon,
  },
  {
    title: '#TelegramBots',
    price: 'Telegram bots',
    image: TwitterBirdIcon,
  },
];

const Card = ({ title, price, image }) => {
  return (
    <div className="rounded-xl p-2 m:px-5 md:px-10 border flex items-center justify-between gap-y-2">
      <div className="flex items-center gap-x-2">
        <div className="h-16 w-16 flex items-center justify-center bg-[#F9F9F9] rounded-full">
          <img className="h-8 w-8 bg-[#F9F9F9]" src={image} alt="" />
        </div>
        <div className="card-content flex flex-col gap-y-2">
          <h3 className="">{title}</h3>
        </div>
      </div>
      <div>
        <p className="text-sm text-zinc-700/70">{price}</p>
      </div>
      {/* <div>
        <button className="border border-[#76EB4C] hover:bg-[#76EB4C] px-5 py-1 rounded-lg">
          Trade Now
        </button>
      </div> */}
    </div>
  );
};

const Services = () => {
  return (
    <section className="services__section max-w-3xl mx-auto px-0 mt-10 pt-10">
      <div className="services-headline flex items-center justify-center pb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          Trending topics on Crypto Twitter
        </h2>
      </div>
      <div className="services-card bg-white lg:rounded-lg grid px-2 md:px-10 lg:px-14 gap-2 py-2 md:py-12 lg:py-14">
        {servicesData.map((service, index) => (
          <Card key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
