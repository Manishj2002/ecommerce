import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createRoutesFromElements, Route } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/features/store.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from 'react-helmet-async';
import SEO from "./components/SEO.jsx";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Favorites = lazy(() => import("./pages/Products/Favorites.jsx"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetails.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Shipping = lazy(() => import("./pages/Orders/Shipping.jsx"));
const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));
const Order = lazy(() => import("./pages/Orders/Order.jsx"));
const UserOrders = lazy(() => import("./pages/User/UserOrders.jsx"));
const Profile = lazy(() => import("./pages/User/Profile.jsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const AdminRoute = lazy(() => import("./pages/Admin/AdminRoute.jsx"));
const Userlist = lazy(() => import("./pages/Admin/Userlist.jsx"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList.jsx"));
const ProductList = lazy(() => import("./pages/Admin/ProductList.jsx"));
const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate.jsx"));
const AllProducts = lazy(() => import("./pages/Admin/AllProducts.jsx"));
const OrderList = lazy(() => import("./pages/Admin/OrderList.jsx"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="Login - E-Commerce" description="Log in to your account" />
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="Register - E-Commerce" description="Create a new account" />
            <Register />
          </Suspense>
        }
      />
      <Route
        index={true}
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="Home - E-Commerce" description="Shop the best products online" />
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/favorite"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="Favorites - E-Commerce" description="View your favorite products" />
            <Favorites />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="Cart - E-Commerce" description="Review items in your cart" />
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/shop"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="Shop - E-Commerce" description="Browse all products" />
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="/user-orders"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="My Orders - E-Commerce" description="View your order history" />
            <UserOrders />
          </Suspense>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SEO title="Product Details - E-Commerce" description="View product details" />
            <ProductDetails />
          </Suspense>
        }
      />
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Profile - E-Commerce" description="Manage your profile" />
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/shipping"
          element={
            <Suspense favicon={<div>Loading...</div>}>
              <SEO title="Shipping - E-Commerce" description="Enter shipping details" />
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="/placeorder"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Place Order - E-Commerce" description="Complete your order" />
              <PlaceOrder />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Order Details - E-Commerce" description="View order details" />
              <Order />
            </Suspense>
          }
        />
      </Route>
      <Route path="/admin" element={<AdminRoute />}>
        <Route
          path="userlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Admin - User List" description="Manage users" />
              <Userlist />
            </Suspense>
          }
        />
        <Route
          path="categorylist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Admin - Category List" description="Manage categories" />
              <CategoryList />
            </Suspense>
          }
        />
        <Route
          path="productlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Admin - Product List" description="Manage products" />
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="orderlist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Admin - Order List" description="Manage orders" />
              <OrderList />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Admin - Dashboard" description="View admin dashboard" />
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="allproductslist"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Admin - All Products" description="View all products" />
              <AllProducts />
            </Suspense>
          }
        />
        <Route
          path="product/update/:_id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SEO title="Admin - Update Product" description="Update product details" />
              <ProductUpdate />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

// PayPal initial options using environment variable
// const paypalInitialOptions = {
//   "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
//   currency: "USD",
// };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        {/* <PayPalScriptProvider options={paypalInitialOptions}> */}
          <RouterProvider router={router} />
        {/* </PayPalScriptProvider> */}
      </HelmetProvider>
    </Provider>
  </StrictMode>
);