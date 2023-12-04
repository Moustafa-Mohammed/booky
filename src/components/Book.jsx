import React, { useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Book({ book }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="shadow-lg pb-4 group bg-gray-800 border border-gray-500 rounded-md">
      <div className="h-[300px]  overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${book.image_url})`,
          }}
          className="rounded-md w-full h-full relative bg-cover bg-center group-hover:scale-110  duration-[3000ms]"
          onClick={() => navigate("/" + book.id)}
        >
          <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>
      </div>

      <div className="px-6 relative ">
        <h3 className="text-white text-md mt-3 font-medium w-4/5 ">
          {book.title}
        </h3>
        <p className="text-gray-300 text-xs">By: {book.authors}</p>
        <p className="text-yellow-600 flex items-center gap-1 mt-2">
          {book.rating} <AiFillStar className="text-yellow-600" />
        </p>

        <AiFillHeart
          onClick={handleAddToFavorite}
          className={`${
            isFavorite ? "text-red-700" : "text-white"
          } text-3xl absolute right-6 top-0`}
        />
      </div>
    </div>
  );
}

export default Book;
