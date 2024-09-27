import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/features/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  // console.log(import.meta.env.VITE_SOME_KEY);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        // console.log("Main App: ", userData);
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <>
      <div className="min-h-screen w-full flex flex-col content-between bg-gray-400">
        {/* <div className="w-full block"> */}
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        {/* </div> */}
      </div>
    </>
  ) : null;
}

export default App;
