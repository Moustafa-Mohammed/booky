import React from "react";
import { NavLink } from "react-router-dom";
import { HOME, FAVOURITES, AUTH_SIGNUP, AUTH_LOGIN } from "../apis";
import userAuth from "../context/Authcontext";

export default function Navbar() {
  const { user, logOut } = userAuth();
  return (
    <header className="bg-white py-4 fixed top-0 w-full z-10">
      <div className="container mx-auto ">
        <nav className="flex items-center gap-6 w-full ">
          <h1 className="text-3xl text-indigo-500 uppercase font-extrabold mr-4">
            Booky
          </h1>
          <NavLink
            end
            to={HOME}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500  font-bold"
                : "text-slate-400 font-bold"
            }
          >
            Books
          </NavLink>
          <NavLink
            to={FAVOURITES}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-500  font-bold "
                : "text-slate-400  font-bold "
            }
          >
            Favourites
          </NavLink>

          <div className="ml-auto">
            {!user ? (
              <>
                <NavLink
                  to={AUTH_LOGIN}
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 transition text-white cursor-pointer"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to={AUTH_SIGNUP}
                  className="px-6 py-2 bg-slate-500 hover:bg-slate-400 transition text-white cursor-pointer ml-4"
                >
                  Sign up
                </NavLink>
              </>
            ) : (
              <button
                onClick={logOut}
                className="px-6 py-2 bg-red-500 hover:bg-red-400 transition text-white cursor-pointer ml-4"
              >
                Log out
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
