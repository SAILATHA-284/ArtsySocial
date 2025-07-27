import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { product, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {
    product.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image?.[0]); // optional chaining to avoid undefined error
        return null;
      }
    });
  };

  useEffect(() => {
    if (product && product.length > 0) {
      fetchProductData();
    }
  }, [product, productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Left Side: Images */}
        <div className="flex 1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[70%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className='flex1'>
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* Add ratings or other details here if needed */}
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className ='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <br></br>
          <button onClick={()=>addToCart(productData._id)} className="bg-black text-white px-8 py-3 text-sm a">ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'></hr>
          <div>
            <p>100% original artworks</p>
            <p>Cash on delivery is available</p>
            <p>Product will be delivered in 7 working days</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        < div className='flex'>
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Let the creativity thrive. Support artists</p>
        </div>
      </div>
       <RelatedProducts category={productData.category}/>
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">Loading product...</div>
  );
 
};

export default Product;
