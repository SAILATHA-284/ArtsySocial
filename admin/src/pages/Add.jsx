import React, { useState } from 'react';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { backendUrl } from '../App';
import {toast} from 'react-toastify';
const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Colour pencil illustration");
  const [bestseller, setBestseller] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("bestseller", bestseller);
  formData.append("date", Date.now());

  // Append all selected images under the same key "images"
  if (image1) formData.append("image1", image1);
if (image2) formData.append("image2", image2);
if (image3) formData.append("image3", image3);
if (image4) formData.append("image4", image4);

 
    const response = await axios.post(backendUrl+"/api/product/add", formData,{ headers: { Authorization: `Bearer ${token}` } });
    console.log("Product added:", response.data);
    toast.success("Product added!")
  } catch (error) {
    console.error("Error adding product:", error);
    alert('Failed to add product.');
  }
};



  return (
    <form className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6" onSubmit={handleSubmit}>
      <div className="mb-8">
        <p className="text-xl font-semibold text-gray-800 mb-4">Upload Product Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
         <label htmlFor='image1'>
          <img className='w-20'src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt=""/>
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
         </label>
         <label htmlFor='image2'>
          <img className='w-20'src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt=""/>
          <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
         </label>
         <label htmlFor='image3'>
          <img className='w-20'src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt=""/>
          <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
         </label>
         <label htmlFor='image4'>
          <img className='w-20'src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt=""/>
          <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
         </label>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-1">Product Name</p>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          required
        />
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-1">Product Description</p>
        <input
          type="text"
          placeholder="Write a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="w-full sm:w-1/2">
          <p className="text-sm font-medium text-gray-700 mb-1">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Colour pencil illustration">Color Pencil Illustration</option>
            <option value="Digital Art">Digital Art</option>
            <option value="CraftWork">CraftWork</option>
            <option value="Painting">Painting</option>
          </select>
        </div>

        <div className="w-full sm:w-1/2">
          <p className="text-sm font-medium text-gray-700 mb-1">Product Price (₹)</p>
          <input
            type="number"
            placeholder="e.g. 499"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="bestseller" className="text-gray-700 text-sm font-medium">
          Add to Bestseller
        </label>
      </div>

      <div className="text-right mt-6">
        <button
          type="submit"
          className="bg-pink-800 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default Add;
