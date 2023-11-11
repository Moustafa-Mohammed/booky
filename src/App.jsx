import Navbar from "./components/Navbar";

import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import { BOOK_DETAILS, HOME, AUTH_SIGNUP, AUTH_LOGIN } from "./apis";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-[#1f2028] min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Navbar />

        <div className="py-8">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path={HOME} element={<Home />} />
              <Route path={BOOK_DETAILS} element={<BookDetails />} />
            </Route>
            <Route path={AUTH_SIGNUP} element={<Signup />} />
            <Route path={AUTH_LOGIN} element={<Login />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
