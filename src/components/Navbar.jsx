import React, { useState } from "react";
import { GoSignOut } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { HOME, AUTH_SIGNUP, AUTH_LOGIN } from "../apis";
import userAuth from "../context/Authcontext";
import CloseButton from "./CloseButton";
import HamburgerMenu from "./HamburgerMenu";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = userAuth();
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const activeLink = ({ isActive }) =>
    isActive ? "text-white text-large font-medium" : "text-gray-400";

  const handleLogout = async () => {
    setShowMenu(false);
    try {
      await logout();
      navigate(AUTH_LOGIN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex mx-auto justify-center text-center h-16  py-4 px-2 items-center sticky top-0 z-10 bg-gray-900">
      <nav className="container flex items-center justify-between w-full">
        <h1 className="text-3xl text-primary-500 uppercase font-extrabold mr-4 text-white">
          Booky
        </h1>
        <ul className="hidden sm:flex items-center flex-1 gap-6 text-xm tracking-wide font-semibold justify-end">
          <NavLink end to={HOME} className={activeLink}>
            Books
          </NavLink>

          <div className="flex gap-4">
            {!user ? (
              <>
                <Button primary onClick={() => navigate(AUTH_LOGIN)}>
                  Sign in
                </Button>
                <Button secondary onClick={() => navigate(AUTH_SIGNUP)}>
                  Sign up
                </Button>
              </>
            ) : (
              <Button onClick={handleLogout} danger rounded>
                Log out
                <GoSignOut />
              </Button>
            )}
          </div>
        </ul>
        <div
          className="cursor-pointer sm:hidden absolute right-2 top-[14px] group space-y-1 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-full transition"
          onClick={() => setShowMenu((prevState) => !prevState)}
        >
          {showMenu ? <CloseButton /> : <HamburgerMenu />}
        </div>

        <ul
          className={`flex flex-col ml-auto w-screen sm:w-0 sm:h-0 bg-gray-800  items-center gap-8 justify-center transition-[height]" duration-300 overflow-hidden absolute right-0 top-16  text-xm tracking-wide font-semibold ${
            showMenu ? " h-[600px] py-3" : "h-0"
          }`}
        >
          <NavLink
            end
            to={HOME}
            className={activeLink}
            onClick={() => setShowMenu(false)}
          >
            Books
          </NavLink>
          <div className="flex flex-col items-center gap-6">
            {!user ? (
              <>
                <Button
                  primary
                  onClick={() => {
                    navigate(AUTH_LOGIN);
                    setShowMenu(false);
                  }}
                >
                  Sign in
                </Button>
                <Button
                  secondary
                  onClick={() => {
                    navigate(AUTH_SIGNUP);
                    setShowMenu(false);
                  }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <Button onClick={handleLogout} danger rounded>
                Log out
                <GoSignOut />
              </Button>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}
