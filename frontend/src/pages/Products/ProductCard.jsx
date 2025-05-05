import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

// Utility to truncate description by words
const truncateWords = (text, maxWords) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    console.log("Adding to cart (ProductCard):", { ...product, qty }); // Debug log
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  return (
    <div className="w-full max-w-sm relative bg-[#1A1A1A] rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {p?.brand || "Unknown"}
          </span>
          <img
            className="w-full rounded-t-xl"
            src={p.image || "/fallback-image.jpg"}
            alt={p.name || "Product"}
            style={{ height: "200px", objectFit: "cover" }}
            onError={() => console.log("Image failed to load:", p.image)} // Debug log
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h5 className="mb-2 text-xl font-semibold text-white">{p?.name || "Unnamed Product"}</h5>
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }) || "$0.00"}
          </p>
        </div>

        <p className="mb-4 text-sm text-gray-400">
          {truncateWords(p?.description, 15)}
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-700 focus:ring-4 focus:ring-pink-300 transition-colors duration-300"
          >
            View Details
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            onClick={() => addToCartHandler(p, 1)}
            title="Add to Cart"
          >
            <AiOutlineShoppingCart className="mr-2" size={20} />
            Add
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;