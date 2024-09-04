import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [updateProfile, { isLoading : loadingUpdateProfile }] = useRegisterMutation();


  useEffect(() => {
  
    setUsername(userInfo.username)
    setEmail(userInfo.email)
    
  }, [userInfo.username,userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match");
    } else {
      try {
        const res = await updateProfile({_id:userInfo._id, email, password, username }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("Profile Update Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                className="block text-sm font-medium rounded w-full "
              >
                Name
              </label>

              <input
                type="username"
                className="mt-1 p-2 border rounded w-full  bg-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
              
                className="block text-sm font-medium rounded w-full"
              >
                Email Address
              </label>

              <input
                type="email"
                
                className="mt-1 p-2 border rounded w-full  bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
               
                className="block text-sm font-medium rounded w-full"
              >
                password{" "}
              </label>

              <input
                type="password"
               
                className="mt-1 p-2 border rounded w-full bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
             
                className="block text-sm font-medium rounded w-full"
              >
                confirmPassword
              </label>

              <input
                type="password"
              
                className="mt-1 p-2 border rounded w-full bg-transparent"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
           <div className="flex justify-between">
           <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              Update
            </button>

            <Link to="/user-orders" className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
            My Orders
            </Link>
           </div>

            {loadingUpdateProfile && <Loader />}
          </form>
          </div>
      </div>
    </div>
  );
};

export default Profile;
