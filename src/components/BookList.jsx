import axios from "axios";
import { BOOKS_API_URL } from "../apis";
import Book from "./Book";
import { useQuery } from "@tanstack/react-query";
import BookSpinner from "./BookSpinner";

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
      <div className="container mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <BookSpinner />
        <BookSpinner />
        <BookSpinner />
        <BookSpinner />
        <BookSpinner />
        <BookSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {displayedBooks}
    </div>
  );
}
