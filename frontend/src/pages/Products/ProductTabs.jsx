import React, { useState } from 'react';
import { useGetTopProductQuery } from '../../redux/api/productApiSlice';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import Ratings from './Ratings';
import SmallProduct from './SmallProduct';

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <section className="flex flex-col w-full md:w-1/4">
        {['Write a Review', 'All Reviews', 'Related Products'].map((tab, index) => (
          <div
            key={index}
            className={`p-4 cursor-pointer text-lg text-white rounded-lg transition-colors duration-300 ${
              activeTab === index + 1 ? 'bg-gradient-to-r from-pink-500 to-purple-600 font-bold' : 'hover:bg-gray-700'
            }`}
            onClick={() => handleTabClick(index + 1)}
          >
            {tab}
          </div>
        ))}
      </section>

      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-4">
                  <label htmlFor="rating" className="block text-xl mb-2 text-white">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 w-full max-w-md rounded-lg border text-black bg-white"
                    aria-label="Select rating"
                  >
                    <option value="">Select...</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-4">
                  <label htmlFor="comment" className="block text-xl mb-2 text-white">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 w-full max-w-md rounded-lg border text-black bg-white"
                    aria-label="Write your review"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="px-6 py-2 text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-700 transition-colors duration-300 disabled:opacity-50"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-white">
                Please <Link to="/login" className="text-pink-500 hover:underline">Sign In</Link> to write a review
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div>
            {product?.reviews?.length === 0 && <p className="text-white">No Reviews</p>}
            {product?.reviews?.map((review) => (
              <div key={review._id} className="bg-[#1A1A1A] p-4 rounded-lg mt-4 max-w-2xl">
                <div className="flex justify-between">
                  <strong className="text-white">{review.name}</strong>
                  <p className="text-gray-400">
                    {review.createdAt ? review.createdAt.substring(0, 10) : 'Date not available'}
                  </p>
                </div>
                <p className="my-4 text-white">{review.comment}</p>
                <Ratings value={review.rating} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 3 && (
          <section className="flex flex-wrap gap-4">
            {data?.map((product) => (
              <SmallProduct key={product._id} product={product} />
            ))}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;