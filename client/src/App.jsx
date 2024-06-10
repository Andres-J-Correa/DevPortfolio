import { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import { projects } from "./portfolio";
import uniqid from "uniqid";
import "./App.css";

const App = () => {
  const [routes, setRoutes] = useState([]);

  const mapRoutes = (p) => (
    <Route key={uniqid()} path={p.path} element={<p.component />} />
  );

  useEffect(() => {
    const mappedRoutes = projects.map(mapRoutes);

    setRoutes(mappedRoutes);
  }, []);

  return (
    <div id="top" className={`dark app`}>
      <header className="header center">
        <Navbar />
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="" element={<Home />} />
            {routes}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
