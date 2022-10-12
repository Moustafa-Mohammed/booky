import axios from "axios";
import { useParams } from "react-router-dom";

import { BOOKS_API_URL } from "../apis";
import { useQuery } from "@tanstack/react-query";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

export default function BookDetails() {
  const { id } = useParams();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const { data: book, isLoading } = useQuery(["book"], async () => {
    return await axios.get(`${BOOKS_API_URL}/${id}`).then((res) => res.data);
  });

  const ratingBar = (book?.rating / 5) * 100;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto h-screen flex items-center">
      <div className="grid grid-cols-3 bg-white items-center w-full shadow-lg rounded p-4 gap-8 relative">
        <div className="absolute top-4 right-4" onClick={handleAddToFavorite}>
          {isFavorite ? (
            <AiFillHeart className="text-red-700 text-3xl" />
          ) : (
            <AiOutlineHeart className="text-3xl" />
          )}
        </div>
        <div className="col-span-1">
          <img
            src={book.image_url}
            alt={book.title}
            className=" w-full h-full block"
          />
        </div>
        <div className="col-span-2">
          <h3 className="text-xl mt-3 font-medium">{book.title}</h3>
          <p>By: {book.authors}</p>
          <p className="flex items-center gap-1">
            {book.rating} <AiFillStar className="text-yellow-600" />
          </p>
          <div className="mt-4">
            <h4 className="font-medium text-lg">About the book</h4>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
