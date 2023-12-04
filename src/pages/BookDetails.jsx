import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { BOOKS_API_URL, HOME } from "../apis";
import { useQuery } from "@tanstack/react-query";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import userAuth from "../context/Authcontext";
import BookSkeleton from "../components/BookSkeleton";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = userAuth();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorite = () => {
    if (user !== null) setIsFavorite(!isFavorite);
  };

  const { data: book, isLoading } = useQuery({
    queryKey: ["book"],
    queryFn: async () => {
      return await axios.get(`${BOOKS_API_URL}/${id}`).then((res) => res.data);
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <BookSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto  bg-gray-800 ">
      <div className="grid grid-cols-3  items-center shadow-lg rounded p-4 gap-8 relative">
        <div className="absolute top-4 right-4" onClick={handleAddToFavorite}>
          {isFavorite ? (
            <AiFillHeart className="text-red-700 text-3xl" />
          ) : (
            <AiFillHeart className="text-3xl text-white" />
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
          <h3 className="text-white text-lg mt-3 font-medium w-2/3">
            {book.title}
          </h3>
          <p className="text-gray-200">By: {book.authors}</p>
          <p className="flex items-center gap-1 text-yellow-600">
            {book.rating} <AiFillStar className="text-yellow-600" />
          </p>
          <div className="mt-4">
            <h4 className="font-medium text-lg text-white">About the book</h4>
            <p className="text-gray-400">{book.description}</p>
          </div>
          <Link
            to={HOME}
            className="mt-6 inline-block text-yellow-600 underline"
          >
            Back to all books
          </Link>
        </div>
      </div>
    </div>
  );
}
