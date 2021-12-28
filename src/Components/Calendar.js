import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
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

  const { setSelectedDay, month, setMonth, year, setYear, user } =
    useGlobalContext();

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
    //gaps in calendar
    const dayNamesIndex = new Date(year, month, 1).getDay();
    setGaps(dayNamesIndex - 1);
  }, [month, year]);

  useEffect(() => {
    setDays(daysInMonth);
    getGaps();
  }, [month, year, daysInMonth, getGaps]);

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
        {user ? (
          <span>Welcome back!</span>
        ) : (
          <div>
            <p>Create an account to save &amp; secure your pages</p>
            <button onClick={() => navigate("/auth")}>Create Account</button>
          </div>
        )}
      </Footer>
    </Container>
  );
};

export default Calendar;
