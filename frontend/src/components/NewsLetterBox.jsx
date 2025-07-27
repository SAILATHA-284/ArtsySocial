import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler=(e)=>{
    e.preventDefault();
  }
  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-10 text-center rounded-2xl shadow-md max-w-2xl mx-auto">
      <p className="text-lg font-semibold text-gray-800 mb-6">
        Subscribe now to our newsletter and get the latest artsy articles and updates!
      </p>
      <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row items-center gap-4">
        <input
          className="w-full sm:flex-1 px-4 py-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-black transition"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-sm px-8 py-3 rounded-md hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
