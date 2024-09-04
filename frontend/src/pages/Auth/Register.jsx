import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();

  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match");
    } else {
      try {
        const res = await register({ email, password, username }).unwrap();
        dispatch(setCredientials({ ...res }));
        navigate(redirect);
        toast.success("User Successfully Register");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="flex overflow-hidden">
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="username"
                className="block text-sm font-medium rounded w-full "
              >
                Username
              </label>

              <input
                type="username"
                id="username"
                className="mt-1 p-2 border rounded w-full  bg-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium rounded w-full"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full  bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium rounded w-full"
              >
                password{" "}
              </label>

              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium rounded w-full"
              >
                confirmPassword
              </label>

              <input
                type="confirmPassword"
                id="confirmPassword"
                className="mt-1 p-2 border rounded w-full bg-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Register..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>
          <div className="mt-4">
            <p className="text-white">
              already have account ?{" "}
              <Link
                className="text-pink-500 hover:underline"
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
        <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
          alt=""
          className="h-[45rem] w-[45%] xl:block md:hidden sm:hidden rounded-lg"
        />
    </div>
  );
};

export default Register;
