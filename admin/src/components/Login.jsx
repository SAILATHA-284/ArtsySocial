import React, {useState} from 'react';
import { backendUrl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';
const Login = ({setToken}) => {

  const [email, setEmail]= useState('')
  const[password,setPassword] = useState('')
  const onSubmitHandler= async(e)=>{

    try{
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
      if(response.data.success){
        setToken(response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <p className="text-sm text-gray-600 mb-1">Email Address</p>
            <input onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
