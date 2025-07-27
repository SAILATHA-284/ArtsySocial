import React from 'react'
import {NavLink} from 'react-router-dom'
import {assets} from '../assets/assets'
const Sidebar = () => {
  return (
    <div className="p-2">
  <div>
    <NavLink 
      to="/add" 
      className="flex items-center gap-3 border border-gray-300 px-4 py-2 rounded-l-md hover:bg-gray-100 transition-all duration-200"
    >
      <img 
        className="w-5 h-5" 
        src={assets.add_icon} 
        alt="Add Icon"
      />
      <p className="text-sm font-medium text-gray-700 hidden md:block">
        Add Items
      </p>
    </NavLink>
    <NavLink 
      to="/list" 
      className="flex items-center gap-3 border border-gray-300 px-4 py-2 rounded-l-md hover:bg-gray-100 transition-all duration-200"
    >
      <img 
        className="w-5 h-5" 
        src={assets.order_icon} 
        alt=""
      />
      <p className="text-sm font-medium text-gray-700 hidden md:block">
        List Items
      </p>
    </NavLink>
    <NavLink 
      to="/orders" 
      className="flex items-center gap-3 border border-gray-300 px-4 py-2 rounded-l-md hover:bg-gray-100 transition-all duration-200"
    >
      <img 
        className="w-5 h-5" 
        src={assets.add_icon} 
        alt="Add Icon"
      />
      <p className="text-sm font-medium text-gray-700 hidden md:block">
        Order Items
      </p>
    </NavLink>
  </div>
</div>

  )
}

export default Sidebar