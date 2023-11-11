import React from "react";

function CloseButton() {
  return (
    <svg
      className="h-6 w-6 text-indigo-600"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
}

export default CloseButton;
