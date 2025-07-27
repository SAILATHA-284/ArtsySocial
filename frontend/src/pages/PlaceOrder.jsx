import React, { useContext, useState } from "react"
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { assets } from "../assets/assets"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import {toast} from 'react-toastify';
const PlaceOrder = () => {
  const { navigate, backendUrl,token, cartItems, setCartItems, getCartAmount, delivery_fee, product } = useContext(ShopContext);
  const[method,setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const name= e.target.name
    const value=e.target.value
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const initPay = (order)=>{
    const options= {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Order Payment',
      description: 'Order Payment',
      order_id : order.id,
      receipt: order.receipt,
      handler: async(response)=>{
        console.log(response)
        try{
          const {data} = await axios.post(backendUrl+'/api/order/verifyRazorpay',response ,{headers:{token}})
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
        }catch(error){
          console.log(error)
          toast.error(error)
        }
      }
      }
      const rzp = new window.Razorpay(options)
      rzp.open();
    }

  const handlePlaceOrder = async(e) => {
    e.preventDefault();
    try{
      let orderItems= []

      for(const items in cartItems){
        if(cartItems[items]>0){
          const itemInfo = structuredClone(product.find(p=>p._id===items))
          if(itemInfo){
            itemInfo.quantity= cartItems[items];
            orderItems.push(itemInfo);
          }
        }
      }
      let orderData={
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      switch(method){
        case 'cod':
          const response = await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          if(response.data.success){
            setCartItems({});
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl+'/api/order/razorpay',orderData,{headers:{token}})
          if(responseRazorpay.data.success){
            initPay(responseRazorpay.data.order)
          }

          break;
          default:
          break;
      }
    }catch(error){
      console.log(error)
      toast.error(error)
    }
  };

  return (
    <form onSubmit={handlePlaceOrder}  className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input required onChange={handleChange} name="firstName" value={formData.firstName}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
          <input required onChange={handleChange} name="lastName" value={formData.lastName}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
        </div>
        <input required onChange={handleChange} name="email" value={formData.email}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address" />
        <input required onChange={handleChange} name="street" value={formData.street}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={handleChange} name="city" value={formData.city}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input required onChange={handleChange} name="state" value={formData.state}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={handleChange} name="zipcode" value={formData.zipcode}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required onChange={handleChange} name="country" value={formData.country}  className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
        <input required  onChange={handleChange} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone number" />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
 

  {/* Razorpay Option */}
  <div
    className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${
      method === 'razorpay' ? 'border-black bg-gray-100' : ''
    }`}
    onClick={() => setMethod('razorpay')}
  >
    <div
      className={`w-3.5 h-3.5 rounded-full border ${
        method === 'razorpay' ? 'bg-black' : ''
      }`}
    />
    <img src={assets.razorpay_logo} alt="Razorpay" className="w-24 h-5 object-contain" />
  </div>

  {/* Cash on Delivery */}
  <div
    className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded ${
      method === 'cod' ? 'border-black bg-gray-100' : ''
    }`}
    onClick={() => setMethod('cod')}
  >
    <div
      className={`w-3.5 h-3.5 rounded-full border ${
        method === 'cod' ? 'bg-black' : ''
      }`}
    />
    <p className="text-gray-600 text-sm font-medium mx-4">CASH ON DELIVERY</p>
  </div>
</div>



          <div className="w-full text-end mt-8">
            <button type='submit' className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
