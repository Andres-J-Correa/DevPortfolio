import { useState, useEffect, Suspense, useContext } from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/theme";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/Navbar";
import { pageRoutes } from "./routes";
import uniqid from "uniqid";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [routes, setRoutes] = useState([]);

  const [{ themeName }] = useContext(ThemeContext);

  const mapRoutes = (route) => (
    <Route key={uniqid()} path={route.path} element={<route.component />} />
  );

  useEffect(() => {
    const mappedRoutes = pageRoutes.map(mapRoutes);

    setRoutes(mappedRoutes);
  }, []);

  return (
    <div id="top" className={`${themeName} app`}>
      <Helmet>
        <title>Andres Correa Portfolio</title>
      </Helmet>
      <header className="header center">
        <Navbar />
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{routes}</Routes>
        </Suspense>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default App;
