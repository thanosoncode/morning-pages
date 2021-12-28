import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context";

const DayTile = ({ value, month, year }) => {
  const { currentDay, selectedDay, activeDays, handleSelectedDayClick } =
    useGlobalContext();

  return (
    <StyledDayTile
      value={value}
      currentDay={currentDay}
      selectedDay={selectedDay}
      activeDays={activeDays}
      month={month}
      year={year}
      onClick={() => handleSelectedDayClick(value)}
    >
      {value}
      <Background
        value={value}
        currentDay={currentDay}
        selectedDay={selectedDay}
        activeDays={activeDays}
        month={month}
        year={year}
      ></Background>
    </StyledDayTile>
  );
};

export default DayTile;

const StyledDayTile = styled.div`
  text-align: center;
  width: 40px;
  height: 40px;
  position: relative;
  background: transparent;
  z-index: 0;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: ${({ value, currentDay, month, year }) => {
    if (
      value === currentDay &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      return "white";
    }
    // if (activeDays) {
    //   for (let i = 0; i < activeDays.length; i++) {
    //     if (value == activeDays[i][0]) {
    //       return "white";
    //     }
    //   }
    // }

    return "black";
  }};

  border: 1px solid
    ${({ theme, value, selectedDay }) => {
      if (value == selectedDay) {
        return theme.color;
      }
      return theme.colorVeryLight;
    }};

  &:hover {
    transform: scale(1.1);
  }
`;

const Background = styled.div`
  position: absolute;
  z-index: -5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ activeDays, value, currentDay }) => {
    for (let j = 0; j < activeDays.length; j++) {
      if (value == activeDays[j].day && value !== currentDay) {
        return `${activeDays[j].score}%`;
      }
    }
    return "100%";
  }};

  background-color: ${({
    theme,
    value,
    currentDay,
    activeDays,
    year,
    month,
  }) => {
    if (
      value === currentDay &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      return theme.color;
    }
    if (activeDays) {
      for (let i = 0; i < activeDays.length; i++) {
        if (value == activeDays[i].day) {
          return theme.greenActive;
        }
      }
    }
    return "white";
  }};
`;
