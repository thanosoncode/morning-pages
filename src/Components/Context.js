import React, { useState, useContext } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { collection } from "firebase/firestore";

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const pagesCollectionRef = collection(db, "pages");

  const [user, setUser] = useState({});
  const [wordGoal, setWordGoal] = useState(20);
  const [activeDays, setActiveDays] = useState([]);
  const [pagesOnCalendar, setPagesOnCalendar] = useState([]);
  const [newPageContent, setNewPageContent] = useState("");
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [selectedDay, setSelectedDay] = useState(null);
  const [historyPageContent, setHistoryPageContent] = useState("");
  const [showHistoryPage, setShowHistoryPage] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [newPage, setNewPage] = useState(false);
  const [editingId, setEditingId] = useState();
  const [editingContent, setEditingContent] = useState("");

  const handleSelectedDayClick = (day) => {
    if (day < 10) {
      day = "0" + day;

      setSelectedDay(day);
    } else {
      setSelectedDay(Number.parseInt(day));
    }
  };

  const logOut = async () => {
    await signOut(auth);
    console.log("log out");
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const value = {
    pagesCollectionRef,
    user,
    setUser,
    newPageContent,
    setNewPageContent,
    currentDay,
    setCurrentDay,
    selectedDay,
    setSelectedDay,
    handleSelectedDayClick,
    historyPageContent,
    setHistoryPageContent,
    showHistoryPage,
    setShowHistoryPage,

    pagesOnCalendar,
    setPagesOnCalendar,
    wordGoal,
    setWordGoal,
    activeDays,
    setActiveDays,
    month,
    setMonth,
    year,
    newPage,
    setNewPage,
    setYear,
    logOut,
    editingId,
    setEditingId,
    editingContent,
    setEditingContent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
