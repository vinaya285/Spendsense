import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "./firebase/auth";

import Home from "./pages/Home";
import Pay from "./pages/Pay";
import Insights from "./pages/Insights";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, (currentUser) => {

        setUser(currentUser);

        setLoading(false);

      });

    return () => unsubscribe();

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );

  }

  if (!user) {

    return <Login />;

  }

  return (

    <BrowserRouter>

      <div className="max-w-sm mx-auto min-h-screen bg-slate-900 text-white">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/pay"
            element={<Pay />}
          />

          <Route
            path="/insights"
            element={<Insights />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;