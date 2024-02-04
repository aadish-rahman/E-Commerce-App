import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./Navigation.css";

function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropDownOpen);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen(!dropDownOpen);
  };

  // const toggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  // const closeSidebar = () => {
  //   setShowSidebar(false);
  // };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white
       bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to={"/"}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>
        <Link
          to={"/shop"}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link
          to={"/cart"}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>
        </Link>
        <Link
          to={"/favorites"}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">FAVORITES</span>
          <FavoritesCount />
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}

          {userInfo && (
            <MdOutlineArrowDropDown
              className={`text-white`}
            ></MdOutlineArrowDropDown>
          )}
        </button>

        {dropDownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 space-y-2 bg-neutral-800 text-white
            ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}
            onMouseLeave={toggleDropdown2}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to={"/admin/dashboard"}
                    className="block px-4 py-2 hover:bg-neutral-600"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/productlist"}
                    className="block px-4 py-2 hover:bg-neutral-600"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/categorylist"}
                    className="block px-4 py-2 hover:bg-neutral-600"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/orderlist"}
                    className="block px-4 py-2 hover:bg-neutral-600"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/admin/userlist"}
                    className="block px-4 py-2 hover:bg-neutral-600"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to={"/profile"}
                className="block px-4 py-2 hover:bg-neutral-600"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 hover:bg-neutral-600"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to={"/login"}
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/register"}
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
              <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navigation;
