import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import MorningPage from "./Pages/MorningPage";
import Profile from "./Pages/Profile";
import Auth from "./Pages/Auth";
import Notification from "./Components/Notification";
import { AppContainer } from "./Components/styles/App.styled";
import { useGlobalContext } from "./context";

const App = () => {
  // const { isNotificationOpen } = useGlobalContext();
  return (
    <>
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pages/:id" element={<MorningPage />} />

            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
        {/* {isNotificationOpen && <Notification />} */}
      </AppContainer>
    </>
  );
};

export default App;
