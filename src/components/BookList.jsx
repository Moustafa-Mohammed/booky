import axios from "axios";
import { BOOKS_API_URL } from "../apis";
import Book from "./Book";
import { useQuery } from "@tanstack/react-query";
import BookSkeleton from "./BookSkeleton";

export default function BookDetails() {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      return await axios
        .get(`${BOOKS_API_URL}?_limit=100`)
        .then((res) => res.data);
    },
  });

  const displayedBooks = books?.map((b) => {
    return <Book key={b.id} book={b} />;
  });

  if (isLoading) {
    return (
      <>
        <div className="container mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
          <BookSkeleton />
        </div>
        <p className="mt-4 text-2xl text-gray-400 rounded-full mb-4 animate-pulse text-center">
          Loading...
        </p>
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {displayedBooks}
    </div>
  );
}
