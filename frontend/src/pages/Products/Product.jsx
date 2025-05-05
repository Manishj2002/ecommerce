import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { toast } from 'react-toastify';
import HeartIcon from './HeartIcon';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const backendUrl = 'http://localhost:5000'; // Backend origin

  const getImageUrl = (image) => {
    if (!image) return '/fallback-image.jpg';
    // Prepend backend URL for relative paths
    return image.startsWith('http') ? image : `${backendUrl}${image}`;
  };

  const addToCartHandler = (product, qty) => {
    console.log('Adding to cart (Product):', { ...product, qty }); // Debug log
    dispatch(addToCart({ ...product, qty }));
    toast.success('Item added successfully');
  };

  return (
    <div className="w-full max-w-sm relative bg-[#1A1A1A] rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={getImageUrl(product.image)}
          alt={product.name || 'Product'}
          className="w-full h-[200px] object-cover rounded-t-xl"
          onError={() => console.log('Image failed to load:', product.image)} // Debug log
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg font-semibold text-white">{product.name || 'Unnamed Product'}</div>
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
              ${product.price?.toFixed(2) || '0.00'}
            </span>
          </h2>
        </Link>
        <button
          className="mt-4 flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-700 transition-colors duration-300"
          onClick={() => addToCartHandler(product, 1)}
          title="Add to Cart"
        >
          <AiOutlineShoppingCart className="mr-2" size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;