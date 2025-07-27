import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';

const Collections = () => {
  const { product: latestProducts, search } = useContext(ShopContext); // added search

  const [showFilter, setShowFilter] = useState(true);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState(latestProducts);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let temp = [...latestProducts];

    // ✅ Apply search filter
    if (search.trim() !== '') {
      const lower = search.toLowerCase();
      temp = temp.filter(
        item =>
          item.name.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower) ||
          item.subCategory.toLowerCase().includes(lower)
      );
    }

    // ✅ Apply category filter
    if (category.length > 0) {
      temp = temp.filter(item => category.includes(item.category));
    }

    // ✅ Apply sub-category filter
    if (subCategory.length > 0) {
      temp = temp.filter(item => subCategory.includes(item.subCategory));
    }

    // ✅ Apply sorting
    if (sortType === 'low-high') {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      temp.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(temp);
  }, [category, subCategory, sortType, latestProducts, search]);

  return (
    <div className="px-4 sm:px-10 my-5">
      <Title text1="ALL" text2="COLLECTIONS" />

      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <div className={`w-[220px] border border-gray-300 p-4 ${showFilter ? '' : 'hidden'}`}>
          <div>
            <p className="mb-2 font-semibold">Category</p>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <label><input type="checkbox" value="Colour pencil illustration" onChange={toggleCategory} /> Colour pencil illustration</label>
              <label><input type="checkbox" value="Digital Art" onChange={toggleCategory} /> Digital Art</label>
              <label><input type="checkbox" value="CraftWork" onChange={toggleCategory} /> CraftWork</label>
              <label><input type="checkbox" value="Painting" onChange={toggleCategory} /> Painting</label>
            </div>
          </div>

          
        </div>

        {/* Product Display Right Side */}
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 px-3 py-1 rounded"
            >
              <option value="">Sort By</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Render Products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;

