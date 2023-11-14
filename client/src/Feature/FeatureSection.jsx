import React from 'react';
import code from '../assets/setting.svg';
import monitor from '../assets/charge.svg';
import contentWriting from '../assets/call.svg';

const featureData = [
  {
    title: 'Weekly Crypto Insights',
    description:
      'Stay ahead with our weekly newsletters, every Sunday, offering detailed analysis of the crypto market trends, future predictions, and insights tailored for beginners. ',
    image: monitor,
  },
  {
    title: 'Beginner-Friendly Learning',
    description:
      'Our newsletters break down complex crypto concepts into easy-to-understand language, helping beginners grasp the essentials of blockchain and cryptocurrencies.',
    image: code,
  },
  {
    title: 'Practical Tips and Tricks',
    description:
      'Get actionable advice and practical tips in every issue, guiding you through making informed crypto investments and navigating the digital currency landscape safely.',
    image: contentWriting,
  },
];

const Card = ({ title, description, image, number }) => {
  console.log(number);
  return (
    <div className="services-card-box p-6 flex items-center justify-center flex-col gap-y-6">
      <div className="text-xl lg:text-2xl font-bold text-[#16403F] text-center h-16 w-16 flex items-center justify-center bg-[#F9F9F9] rounded-full">
        {/* <img className="h-8 w-8 bg-[#F9F9F9]" src={image} alt="" /> */}
        {number}
      </div>
      <div className="card-content flex flex-col items-center justify-center gap-y-2">
        <h3 className="text-xl lg:text-2xl font-bold text-[#16403F] text-center">
          {title}
        </h3>
        <p className="text-base text-black font-medium text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <section className="services__section max-w-5xl mx-auto px-0 mt-10">
      <div className="services-headline flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          What our newsletter contains
        </h2>
      </div>
      <div className="services-card grid px-10 lg:px-14 xl:px-2 md:grid-cols-2 lg:grid-cols-3 gap-5 py-3 lg:py-5">
        {featureData.map((service, index) => (
          <Card key={index} number={index + 1} {...service} />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
