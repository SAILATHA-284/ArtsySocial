import React, { createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
export const ShopContext = createContext();
import axios from "axios";
import {toast} from "react-toastify";

const ShopContextProvider = (props) => {
    const currency = 'Rs';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const[cartItems, setCartItems] = useState({});
    const[product, setProduct] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async(itemId)=>{
        if (!token) {
        toast.error("Please login to add items to cart");
        navigate("/login");
        return;
    }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
            
        }
        else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        if(token){
        try{
            await axios.post(backendUrl+'/api/cart/add', {itemId}, {headers: {token}})

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }
}

    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            try{
                if(cartItems[items]>0){
                    totalCount+=cartItems[items];
                }

            }catch(error){

            }
        }
        return totalCount;
    }
    const updateQuantity = async(itemId, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        if(token){
            try{
                await axios.post(backendUrl+'/api/cart/update', {itemId,quantity}, {headers: {token}})
                
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }
}
    const getCartAmount=()=>{
        let totalAmount =0;
        for(const items in cartItems){
            let itemInfo = product.find((p)=>p._id===items);
            try{
                if(cartItems[items]>0){
                    totalAmount+= itemInfo.price* cartItems[items]
                } 
            }catch(error){

            }
        }
    return totalAmount;
    }

    const getProductsData=async()=>{
        try{
            const response = await axios.get(backendUrl+'/api/product/list')
            if(response.data.success){
                setProduct(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    const getUserCart = async(token) =>{
        try{
            const response = await axios.post(backendUrl+'/api/cart/get', {},{headers: {token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getProductsData();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    })
    const value = {
        product,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems, addToCart,
        cartItems, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
