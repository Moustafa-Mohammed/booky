import React from "react";

export default function HamburgerMenu() {
  return (
    <>
      <span className="block w-6 h-1 bg-indigo-600 rounded-l-lg"></span>
      <span className="block w-4 group-hover:w-6 transition-[width] duration-300 h-1 bg-indigo-600 ml-auto rounded-l-lg"></span>
      <span className="block w-6 h-1 bg-indigo-600 rounded-l-lg"></span>
    </>
  );
}
