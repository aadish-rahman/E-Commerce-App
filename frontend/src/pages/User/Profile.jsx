import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not Match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message || error.data);
      }
    }
  };

  return (
    <div className="container p-4 mx-auto mt-[5rem]">
      <div className="flex justify-center align-middle md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-white ">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-4 text-white rounded-sm form-input bg-neutral-700"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-white ">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-4 text-white rounded-sm form-input bg-neutral-700"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-white ">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-4 text-white rounded-sm form-input bg-neutral-700"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-white "
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-4 text-white rounded-sm form-input bg-neutral-700"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600"
              >
                Update Profile
              </button>
              <Link
                to={"/user-orders"}
                className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
