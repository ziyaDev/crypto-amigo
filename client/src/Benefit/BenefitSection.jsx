import React from "react";

const benefits = [
  "📚 Knowledge Databases",
  "✅ Checklists",
  "🔥 Custom Notion Templates",
  "⚡ Speed up & simplify your workflows",
];

function BenefitSection() {
  return (
    <section className="benefit__section max-w-3xl px-7 lg:px-10 py-5 mx-auto">
      <div className="flex items-center flex-wrap justify-center gap-x-5 gap-y-5">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-2 items-center justify-center bg-black/10 py-1.5 px-2.5 rounded-full border border-zinc-300/50"
          >
            <p className="text-sm text-zinc-700 font-bold">{benefit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BenefitSection;
