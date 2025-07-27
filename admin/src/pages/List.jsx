import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch product list.");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setList(prevList => prevList.filter(item => item._id !==id));
      } else {
        await fetchList();
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2 text-xl font-semibold'>All Products List</p>

      <div className="overflow-x-auto">
        <div className='min-w-[800px]'>
          <div className="hidden md:grid grid-cols-5 items-center py-3 px-6 border bg-gray-100 text-sm font-semibold">
            <span className="px-2">Image</span>
            <span className="px-2">Name</span>
            <span className="px-2">Category</span>
            <span className="px-2">Price</span>
            <span className="text-center px-2">Action</span>
          </div>

          {list.map((item, index) => (
            <div
              className='grid grid-cols-3 md:grid-cols-5 items-center gap-2 py-2 px-4 border text-sm'
              key={index}
            >
              <img className="w-12 h-12 object-cover" src={item.image[0]} alt="" />
              <p className="truncate">{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
