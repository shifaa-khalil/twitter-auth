import React from "react";
import HomePage from "./components/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};
