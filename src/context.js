import React, { useState, useContext, useEffect, useCallback } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const pagesCollectionRef = collection(db, "pages");
  const usersCollectionRef = collection(db, "users");

  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [pagesList, setPagesList] = useState([]);
  const [newPage, setNewPage] = useState(false);
  const [wordGoal, setWordGoal] = useState(300);
  const [activeDays, setActiveDays] = useState([]);
  const [newPageContent, setNewPageContent] = useState("");
  const [currentDay, setCurrentDay] = useState(
    new Date().toDateString().substr(8, 2)
  );
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [historyPageContent, setHistoryPageContent] = useState("");
  const [showHistoryPage, setShowHistoryPage] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [editingId, setEditingId] = useState();
  const [editing, setEditing] = useState();
  const [editingContent, setEditingContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [insightWords, setInsightWords] = useState(0);
  const [writingTime, setWritingTime] = useState(0);
  const [writingTimeStarted, setWritingTimeStarted] = useState(null);

  useEffect(() => {
    const createUser = async () => {
      const data = await getDoc(doc(db, "users", user.email));
      const userDoc = data.data();

      setWordGoal(userDoc.wordGoal);
      return (
        userDoc.length === 0 &&
        (await setDoc(doc(db, "users", user.email), {
          wordGoal: 300,
        }))
      );
    };
    if (user?.email) {
      createUser();
    }
  }, [user, usersCollectionRef]);

  const getAllPages = async () => {
    setLoading(true);
    try {
      const data = await getDocs(pagesCollectionRef);
      if (data) {
        const allPages = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const userPages = allPages.filter((doc) => doc.user === user.email);

        const userPagesMonth = userPages.filter(
          (doc) =>
            Number.parseInt(doc.time?.substr(0, 2)) === month + 1 &&
            Number.parseInt(doc.time?.substr(6, 4)) === year
        );

        const activeDaysWithScore = userPagesMonth.map((doc) => {
          return {
            day: doc.time.substr(3, 2),
            score: (doc.content.split(" ").length / wordGoal) * 100,
          };
        });
        // console.log("userPages", userPages);
        // console.log("allPages", allPages);
        setPagesList(userPages);
        setActiveDays(activeDaysWithScore);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPage = useCallback(() => {
    const localDayString = `${month + 1}-${selectedDay}-${year}`;

    if (pagesList) {
      const userPageDay = pagesList.filter((item) => {
        return item.time === localDayString;
      });

      if (userPageDay.length !== 0) {
        setShowHistoryPage(true);
        setHistoryPageContent(userPageDay[0].content);
        setEditingId(userPageDay[0].id);
        setInsightWords(userPageDay[0].content.split(" ").length);
      }
      if (userPageDay.length === 0) {
        setShowHistoryPage(false);
      }
    }
  }, [
    selectedDay,
    month,
    setShowHistoryPage,
    setHistoryPageContent,
    year,
    setEditingId,
    pagesList,
  ]);
  console.log(pagesList);
  useEffect(() => {
    getPage();
  }, [selectedDay, getPage]);

  useEffect(() => {
    if (user?.email) {
      getAllPages();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, month, year, newPage]);

  const handleSelectedDayClick = (day) => {
    if (day < 10) {
      day = "0" + day;

      setSelectedDay(day);
    } else {
      setSelectedDay(Number.parseInt(day));
    }
    console.log(selectedDay, currentDay);
  };

  const logOut = async () => {
    await signOut(auth);
    setIsAuth(false);
    console.log("log out");
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const value = {
    pagesCollectionRef,
    usersCollectionRef,
    user,
    setUser,
    isAuth,
    setIsAuth,
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
    wordGoal,
    setWordGoal,
    activeDays,
    setActiveDays,
    month,
    setMonth,
    year,
    setYear,
    logOut,
    editingId,
    setEditingId,
    editingContent,
    setEditingContent,
    editing,
    setEditing,
    loading,
    setLoading,
    isNotificationOpen,
    setIsNotificationOpen,
    newPage,
    setNewPage,
    setInsightWords,
    insightWords,
    writingTimeStarted,
    setWritingTimeStarted,
    writingTime,
    setWritingTime,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
