import React, { useState, useContext, useEffect, useCallback } from "react";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const pagesCollectionRef = collection(db, "pages");
  const usersCollectionRef = collection(db, "users");

  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [pagesList, setPagesList] = useState([]);
  const [newPage, setNewPage] = useState(false);
  const [wordGoal, setWordGoal] = useState(10);
  const [badges, setBadges] = useState({});
  const [activeDays, setActiveDays] = useState([]);
  const [newPageContent, setNewPageContent] = useState("");
  const [currentDay, setCurrentDay] = useState(
    new Date().toDateString().substr(8, 2)
  );
  const [selectedDay, setSelectedDay] = useState(
    new Date().toDateString().substr(8, 2)
  );
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
  const [translateX, setTranslateX] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkUserHasAccount = async () => {
      const data = await getDoc(doc(db, "users", user.email));
      const userDoc = data.data();
      if (userDoc) {
        setWordGoal(userDoc.wordGoal);
        setBadges(userDoc.badges);
      }

      if (!userDoc) {
        createUser();
      }
    };

    const createUser = async () => {
      try {
        await setDoc(doc(db, "users", user.email), {
          wordGoal: 10,
          badges: {
            eggCracker: false,
            yoda: false,
            sneaker: false,
            cupcake: false,
            meteor: false,
            owl: false,
            bird: false,
            dream: false,
            rainbow: false,
            submarine: false,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.email) {
      checkUserHasAccount();
    }
  }, [user]);

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
        const userPagesMonth = userPages.filter((doc) => {
          let targetMonth = month + 1;

          if (targetMonth < 10) {
            targetMonth = "0" + targetMonth.toString();
          } else {
            targetMonth = targetMonth.toString();
          }
          return (
            doc.time.substr(0, 2) === targetMonth &&
            Number.parseInt(doc.time?.substr(6, 4)) === year
          );
        });

        const activeDaysWithScore = userPagesMonth.map((doc) => {
          return {
            day: doc.time.substr(3, 2),
            score: (doc.content.split(" ").length / wordGoal) * 100,
          };
        });

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
    let targetMonth = month + 1;
    if (targetMonth < 10) {
      targetMonth = "0" + targetMonth.toString();
    } else {
      targetMonth = targetMonth.toString();
    }
    const localDayString = `${targetMonth}-${selectedDay}-${year}`;

    if (pagesList) {
      const userPageDay = pagesList.filter((item) => {
        return item.time === localDayString;
      });

      if (userPageDay.length !== 0) {
        setShowHistoryPage(true);
        setHistoryPageContent(userPageDay[0].content);
        setEditingId(userPageDay[0].id);
        setInsightWords(
          userPageDay[0].content
            .trim()
            .split(" ")
            .filter((item) => item !== "").length
        );
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
    setSelectedDay(day);
  };

  useEffect(() => {
    const getBadges = async () => {
      const data = await getDoc(doc(db, "users", user.email));
      const userDoc = data.data();
      setBadges(userDoc?.badges);
    };
    if (user?.email) {
      getBadges();
    }
  }, [user, pagesList]);

  const logOut = async () => {
    await signOut(auth);
    setIsAuth(false);
    setBadges({});
    setPagesList([]);
    window.localStorage.clear();
  };

  const throwNotification = (message, delay) => {
    setTimeout(() => {
      setTranslateX("-350px");
      setMessage(message);
      setTimeout(() => {
        setTranslateX(0);
      }, 2500);
    }, delay);
  };

  console.log("hey");

  useEffect(() => {
    if (!user) {
      throwNotification("Create an account to unlock all features", 7000);
    }
  }, [user]);

  useEffect(() => {
    const updateBadgesStatus = async (badge) => {
      const user = doc(db, "users", auth.currentUser.email);
      const newFields = badge;
      await updateDoc(user, newFields);
    };
    if (pagesList.length === 1 && badges?.eggCracker === false) {
      updateBadgesStatus({ "badges.eggCracker": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (pagesList.length === 2 && badges?.yoda === false) {
      updateBadgesStatus({ "badges.yoda": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (pagesList.length === 11 && badges?.sneaker === false) {
      updateBadgesStatus({ "badges.sneaker": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (pagesList.length === 44 && badges?.cupcake === false) {
      updateBadgesStatus({ "badges.cupcake": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (pagesList.length === 99 && badges?.meteor === false) {
      updateBadgesStatus({ "badges.meteor": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (
      pagesList.some((item) => item.wordsWritten >= 500) &&
      badges?.owl === false
    ) {
      updateBadgesStatus({ "badges.owl": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (
      pagesList.some((item) => item.hours > 0 && item.hours < 7) &&
      badges?.bird === false
    ) {
      updateBadgesStatus({ "badges.bird": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (
      pagesList.some((item) => item.hours > 18 && item.hours < 20) &&
      badges?.dream === false
    ) {
      updateBadgesStatus({ "badges.dream": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (
      pagesList.some((item) => item.hours > 14 && item.hours < 17) &&
      badges?.rainbow === false
    ) {
      updateBadgesStatus({ "badges.rainbow": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
    if (
      pagesList.some((item) => item.hours > 21 && item.hours < 23) &&
      badges?.submarine === false
    ) {
      updateBadgesStatus({ "badges.submarine": true });
      throwNotification("Congrats!!!  You earned a new badge! ✰⋆🌟✪🔯✨", 5000);
    }
  }, [
    pagesList,
    badges?.bird,
    badges?.cupcake,
    badges?.dream,
    badges?.eggCracker,
    badges?.badges?.meteor,
    badges?.owl,
    badges?.rainbow,
    badges?.sneaker,
    badges?.yoda,
    badges?.submarine,
    badges?.meteor,
  ]);

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
    pagesList,
    setPagesList,
    translateX,
    setTranslateX,
    message,
    setMessage,
    badges,
    setBadges,
    throwNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
