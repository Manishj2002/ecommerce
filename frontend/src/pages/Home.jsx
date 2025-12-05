import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from './Products/Product';

// New HeroBanner Component
const HeroBanner = () => (
  <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-banner-image.jpg)' }}>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">Discover the Latest Trends</h1>
      <p className="text-xl text-gray-300 mb-6">Shop exclusive deals and new arrivals today!</p>
      <Link
        to="/shop"
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:scale-105 transition-transform duration-300"
      >
        Shop Now
      </Link>
    </div>
  </div>
);

// New CategoryPreview Component
const CategoryPreview = () => {
  const categories = [
    { name: 'Electronics', image: '/images/image-1726489631923.webp', link: '/shop?category=electronics' },
    { name: 'Fashion', image: '/images/image-1764905376735.jpg', link: '/shop?category=fashion' },
    { name: 'Home', image: '/images/image-1764911853260.jpg', link: '/shop?category=home' },
  ];

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-white text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const { keyword } = useParams();
  const { data, isError, isLoading } = useGetProductsQuery({ keyword });

  return (
    <div className="bg-black min-h-screen">
      <Header />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
          <button
            className="ml-4 text-pink-500 underline"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </Message>
      ) : (
        <>
          {/* Hero Section */}
          <HeroBanner />

          {/* Featured Products */}
          <div className="container mx-auto py-12">
            <h2 className="text-3xl font-semibold text-white text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.products.slice(0, 8).map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/shop"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* Category Preview */}
          <CategoryPreview />
        </>
      )}
    </div>
  );
};

export default Home;