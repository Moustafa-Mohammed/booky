import Navbar from "./components/Navbar";

import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import BookDetails from "./pages/BookDetails";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import {
  BOOK_DETAILS,
  HOME,
  FAVOURITES,
  AUTH_SIGNUP,
  AUTH_LOGIN,
} from "./apis";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const client = new QueryClient();
  return (
    <div className="bg-indigo-100">
      <QueryClientProvider client={client}>
        <Navbar />

        <Routes>
          <Route path={AUTH_SIGNUP} element={<Signup />} />
          <Route path={AUTH_LOGIN} element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path={HOME} element={<Home />} />
            <Route path={BOOK_DETAILS} element={<BookDetails />} />
            <Route path={FAVOURITES} element={<Favourites />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
