import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-white p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-xl">
        <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">Contact Us</h1>
        <p>If you wish to submit your artworks, here are the details to contact us:</p>
        <br></br>
        <div className="text-lg text-gray-800 space-y-6">
          <div>
            📧 <span className="font-semibold">Email:</span> artsySocial159@gmail.com
          </div>
          <div>
            📞 <span className="font-semibold">Phone:</span> +91 1234567890
          </div>
          <div>
            📍 <span className="font-semibold">Address:</span> Mumbai, Maharashtra, India
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
