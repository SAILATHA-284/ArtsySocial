import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("collection") && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location, showSearch]);

    return showSearch && visible ? (
        <div className="w-full flex justify-center items-center bg-white py-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-md w-[80%] max-w-lg">
                <img src={assets.search_icon} alt="search" className="w-4 h-4 mr-2" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                    placeholder="Search for products"
                />
                <img
                    src={assets.cross_icon}
                    alt="close"
                    className="w-3 h-3 ml-2 cursor-pointer"
                    onClick={() => {
                        setSearch(''),
                        setShowSearch(false)}}
                />
            </div>
        </div>
    ) : null;
};

export default SearchBar;
