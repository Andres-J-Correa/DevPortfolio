import { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { pageRoutes } from "./routes";
import uniqid from "uniqid";
import "./App.css";

const App = () => {
  const [routes, setRoutes] = useState([]);

  const mapRoutes = (route) => (
    <Route key={uniqid()} path={route.path} element={<route.component />} />
  );

  useEffect(() => {
    const mappedRoutes = pageRoutes.map(mapRoutes);

    setRoutes(mappedRoutes);
  }, []);

  return (
    <div id="top" className={`dark app`}>
      <header className="header center">
        <Navbar />
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{routes}</Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
