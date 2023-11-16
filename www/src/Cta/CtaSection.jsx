import React from 'react';

function CtaSection() {
  return (
    <section className="cta__section__one max-w-4xl mx-auto py-14 px-5 lg:px-0">
      <div className=" bg-white p-10 rounded-2xl mx-auto flex flex-col gap-y-5 shadow-inner justify-center items-center border border-slate-500/20">
        <h3 className="text-2xl md:text-3xl lg:text-4xl max-w-xl mx-auto font-bold text-primarydark text-center">
          Understanding crypto shouldn't be difficult. That's why we're here.
        </h3>
        <a
          href="/"
          className="w-fit px-14 py-2 bg-[#76C84D] shadow-small transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-md rounded-full gap-2.5 flex items-center justify-center active:scale-95"
        >
          <span className="text-center text-secondarydark text-base font-bold leading-normal">
            Subscribe for free now
          </span>
        </a>
      </div>
    </section>
  );
}

export default CtaSection;
