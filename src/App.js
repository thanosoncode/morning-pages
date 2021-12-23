import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Dashboard from "./Components/Dashboard";
import HeaderPage from "./Components/HeaderPage";
import MorningPage from "./Components/MorningPage";
import Profile from "./Components/Profile";
import Auth from "./Components/Auth";
import { useGlobalContext } from "./Components/Context";

const App = () => {
  const { showProfile } = useGlobalContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pages/:id" element={<MorningPage />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
