import { useEffect, useState } from "react";
import React, {useContext} from "react"
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
const LatestCollection= ()=>{
    const{product}= useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])
    useEffect(()=>{
      setLatestProducts(product.slice(0,10));
    },[product])
  return(
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'ARTWORKS'}/>
      </div>
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
      We are the world's largest artist community. Let the creativity thrive!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-5 gap-6">
        {
          latestProducts.map((item,index)=>(
            <ProductItem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}
export default LatestCollection;