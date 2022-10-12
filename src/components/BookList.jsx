import axios from "axios";

import { BOOKS_API_URL } from "../apis";
import Book from "./Book";
import { useQuery } from "@tanstack/react-query";

export default function BookDetails() {
  const { data: books, isLoading } = useQuery(["books"], () => {
    return axios.get(`${BOOKS_API_URL}?_limit=100`).then((res) => res.data);
  });

  const displayedBooks = books?.map((b) => {
    return <Book key={b.id} book={b} />;
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto py-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayedBooks}
    </div>
  );
}
