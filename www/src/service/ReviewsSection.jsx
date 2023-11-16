function Reviews() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* First Review */}
      <div className="bg-white p-3 rounded-md mb-4 flex items-center">
        {/* 5-star rating */}
        <div className="flex items-center space-x-1 text-yellow-500 text-sm md:text-base mr-3">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        {/* Review text */}
        <p className="mt-2 text-xs md:text-sm">
          "CryptoAmigo has been incredibly helpful in simplifying complex
          cryptocurrency topics. I've learned so much and highly recommend it!"
          - David Keeson
        </p>
      </div>

      {/* Second Review */}
      <div className="bg-white p-3 rounded-md mb-4 flex items-center">
        {/* 5-star rating */}
        <div className="flex items-center space-x-1 text-yellow-500 text-sm md:text-base mr-3">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        {/* Review text */}
        <p className="mt-2 text-xs md:text-sm">
          "I've been a subscriber to CryptoAmigo for months now, and I'm
          impressed by the quality of content and how easy it is to understand
          complex concepts. Keep up the great work!" - Dana Olbermann
        </p>
      </div>
    </div>
  );
}

export default Reviews;
