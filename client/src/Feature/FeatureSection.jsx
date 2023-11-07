import React from "react";
import code from "../assets/setting.svg";
import monitor from "../assets/charge.svg";
import contentWriting from "../assets/call.svg";

const featureData = [
  {
    title: "UI Design",
    description:
      "Creating visual designs for websites and mobile applications with wireframes and prototypes",
    image: monitor,
  },
  {
    title: "Web Development",
    description:
      "Create website & responsive website by HTML/CSS, React & web-flow",
    image: code,
  },
  {
    title: "Content Writing",
    description:
      "We give you the best content for your product that will attract customers",
    image: contentWriting,
  },
];

const Card = ({ title, description, image }) => {
  return (
    <div className="services-card-box p-6 flex items-center justify-center flex-col gap-y-6">
      <div className="h-16 w-16 flex items-center justify-center bg-[#F9F9F9] rounded-full">
        <img className="h-8 w-8 bg-[#F9F9F9]" src={image} alt="" />
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
    <section className="services__section max-w-5xl mx-auto px-0 py-10">
      <div className="services-headlineflex items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          How we help businesses
        </h2>
      </div>
      <div className="services-card grid px-10 lg:px-14 xl:px-2 md:grid-cols-2 lg:grid-cols-3 gap-10 py-12 lg:py-14">
        {featureData.map((service, index) => (
          <Card key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
