import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetProfileQuery, useLogoutMutation } from "../../slices/userSlice";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const links = [
  { label: "User profile", path: "profile" },
  { label: "Orders", path: "orders" },
  { label: "Address", path: "address" },
  { label: "Payment methods", path: "payment-methods" },
  { label: "Wishlist", path: "wishlist" },
  //   { label: "Sign Out", path: "sign-out" },
];
const Settings = ({ children }) => {
  const { data: user } = useGetProfileQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="px-4 w-full max-w-max md:max-w-7xl">
        <div className="flex py-16 px-10 rounded w-full gap-10 font-roboto">
          <div className="flex-[3] w-full relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 -z-0">
              {user?.image ? (
                <img
                  src={user?.image}
                  alt={user?.name}
                  className="w-24 h-24 border-white border-4 rounded-full object-contain"
                />
              ) : (
                <FaCircleUser
                  color="#e2e8f0"
                  className="w-24 h-24 border-white border-4 rounded-full"
                />
              )}
              {/* <div className="w-24 h-24 bg-slate-200 border-white border-4 rounded-full"></div> */}
            </div>
            <ul className="rounded-xl bg-slate-200 z-10">
              {links.map((link, index) => (
                <li
                  key={index}
                  className="border-b-4 border-white  last-of-type:border-none"
                >
                  <NavLink
                    to={`/${link.path}`}
                    className={({ isActive }) =>
                      `p-4 text-sm w-full block hover:cursor-pointer  ${
                        isActive
                          ? "bg-sky-500 text-white hover:text-gray-200"
                          : "hover:text-sky-500"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li
                className="border-b-4 border-white  last-of-type:border-none p-4 text-sm w-full hover:cursor-pointer hover:text-blue-500"
                onClick={logoutHandler}
              >
                Sign Out
              </li>
            </ul>
          </div>
          <div className="flex-[9] w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
