import React, { useState } from "react";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Book({ book }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="h-full w-full bg-white shadow-lg p-4 rounded-md drop-shadow-md">
      <div
        className="w-full h-4/5 relative"
        onClick={() => navigate("/" + book.id)}
      >
        <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        <img src={book.image_url} alt="" className=" w-full h-full block" />
      </div>

      <h3 className="text-sm mt-3 font-medium">{book.title}</h3>
      <p className="text-xs">By: {book.authors}</p>
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1">
          {book.rating} <AiFillStar className="text-yellow-600" />
        </p>
        <div onClick={handleAddToFavorite}>
          {isFavorite ? (
            <AiFillHeart className="text-red-700 text-3xl" />
          ) : (
            <AiOutlineHeart className="text-3xl" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
