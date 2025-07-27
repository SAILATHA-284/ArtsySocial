// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-pink-800 mb-4">About Us</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to ArtsySocial! A beautiful ecommerce platform that's all about art and creativity. Let the work know your talent and unleash the creative beast residing within you.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We aim at supporting artists all over the world providing them a platform to make best out of their creativity. Whether you're a creator, a shopper, or just exploring, our mission is to serve you with simplicity and purpose. We combine creativity, functionality, and technology to bring ideas to life.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Thank you for being part of our journey! Stay creative folks! Afterall the earth without art is just 'eh'
        </p>
      </div>
    </div>
  );
};

export default About;
