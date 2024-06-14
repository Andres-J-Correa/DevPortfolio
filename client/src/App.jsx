import { useState, useEffect, Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/theme";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { pageRoutes } from "./routes";
import uniqid from "uniqid";
import "./App.css";

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
