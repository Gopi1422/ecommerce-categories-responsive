import React, { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import MainContainer from "./components/MainContainer";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const headerRef = useRef(null);

  return (
    <AnimatePresence>
      <div className="w-screen h-screen flex flex-col">
        <Header headerRef={headerRef} />
        <Routes>
          <Route path="/*" element={<MainContainer headerRef={headerRef} />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
