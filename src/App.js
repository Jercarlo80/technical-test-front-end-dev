import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardRoute from "./route/DasboardRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardRoute />} />
        <Route path="/Dashboard" element={<DashboardRoute />} />
      </Routes>
    </Router>
  );
}
