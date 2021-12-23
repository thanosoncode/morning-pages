import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./Context";
import { getDocs } from "firebase/firestore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { dayNames, months } from "../data/daysAndMonths";
import {
  Container,
  Navigation,
  Grid,
  DayNames,
  Footer,
} from "./styles/Calendar.styled";
import DayTile from "./DayTile";

const Calendar = () => {
  let navigate = useNavigate();

  const {
    user,
    pagesCollectionRef,
    currentDay,
    selectedDay,
    setSelectedDay,
    handleSelectedDayClick,
    setHistoryPageContent,
    setShowHistoryPage,
    month,
    setMonth,
    year,
    setYear,
    setActiveDays,
    wordGoal,
    image,
    setImage,
    message,
    setMessage,
    newPage,
    setNewPage,
    editingId,
    setEditingId,
  } = useGlobalContext();

  const [days, setDays] = useState();
  const [gaps, setGaps] = useState();

  const currentYear = new Date().getFullYear();

  let years = [];
  for (let i = currentYear + 10; i >= 2010; i--) {
    years.push(i);
  }

  const getMonthIndex = (e) => {
    const targetMonth = months.find((month) => month.name === e.target.value);
    setMonth(Number.parseInt(targetMonth.id));
  };

  const daysInMonth = useCallback(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [month, year]);

  const getGaps = useCallback(() => {
    //first day of the month
    const dayNamesIndex = new Date(year, month, 1).getDay();
    setGaps(dayNamesIndex - 1);
  }, [month, year]);

  const populateCalendar = async () => {
    const data = await getDocs(pagesCollectionRef);
    const allPages = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userPages = allPages.filter((doc) => doc.user === user.email);
    const userPagesMonth = userPages.filter(
      (doc) =>
        doc.time?.substr(0, 2) == month + 1 && doc.time?.substr(6, 4) == year
    );
    const activeDaysWithScore = userPagesMonth.map((doc) => {
      return {
        day: doc.time.substr(3, 2),
        score: (doc.content.split(" ").length / wordGoal) * 100,
      };
    });
    setActiveDays(activeDaysWithScore);
  };

  const getPage = useCallback(async () => {
    const localDayString = `${month + 1}-${selectedDay}-${year}`;
    const data = await getDocs(pagesCollectionRef);

    const allPages = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const userPages = allPages.filter((doc) => doc.user === user.email);
    const userPageDay = userPages.filter((item) => {
      return item.time === localDayString;
    });

    if (userPageDay.length !== 0) {
      setShowHistoryPage(true);
      setHistoryPageContent(userPageDay[0].content);
      setEditingId(userPageDay[0].id);
      console.log(editingId);
    }
    if (userPageDay.length === 0) {
      setShowHistoryPage(false);
    }
  }, [
    selectedDay,
    month,
    pagesCollectionRef,

    user.email,
    setShowHistoryPage,
    setHistoryPageContent,
    year,
  ]);
  useEffect(() => {
    getPage();
  }, [selectedDay, getPage]);

  useEffect(() => {
    populateCalendar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, newPage]);

  useEffect(() => {
    setDays(daysInMonth);
    getGaps();
  }, [month, year, daysInMonth, getGaps]);
  console.log("new render");
  return (
    <Container>
      <Navigation>
        <button
          onClick={() => {
            if (month > 0) {
              setMonth(month - 1);
            }
            if (month === 0) {
              setMonth(11);
              setYear(year - 1);
            }
            setSelectedDay(null);
          }}
        >
          <span>
            <FaChevronLeft />
          </span>
        </button>

        <select
          name="months"
          id="months"
          onChange={getMonthIndex}
          value={months[month].name}
        >
          {months.map((mon, index) => {
            return (
              <option key={index} value={mon.name}>
                {mon.name}
              </option>
            );
          })}
        </select>
        <select
          name="years"
          id="years"
          onChange={(e) => {
            setYear(Number.parseInt(e.target.value));
          }}
          value={year}
        >
          {years.map((y, index) => {
            return (
              <option key={index} value={y}>
                {y}
              </option>
            );
          })}
        </select>
        <button
          onClick={() => {
            if (month < 12) {
              setMonth(month + 1);
            }
            if (month === 11) {
              setMonth(0);
              setYear(year + 1);
            }
            setSelectedDay(null);
          }}
        >
          <span>
            <FaChevronRight />
          </span>
        </button>
      </Navigation>

      <Grid>
        {dayNames.map((dayName, index) => {
          return <DayNames key={index}>{dayName.name}</DayNames>;
        })}
        {gaps > 0 &&
          Array.apply(null, Array(gaps)).map((item, index) => {
            return <div key={index}></div>;
          })}
        {Array.apply(null, Array(days)).map((day, index) => {
          return (
            <DayTile key={index} value={index + 1} month={month} year={year} />
          );
        })}
      </Grid>
      <Footer>
        <p>Create an account to save &amp; secure your pages</p>
        <button onClick={() => navigate("/auth")}>Create Account</button>
      </Footer>
    </Container>
  );
};

export default Calendar;
