import { useState, useEffect } from "react";
import plus from "../images/plus-button2.png";
import today from "../images/plus.jpg";
import past from "../images/plusbnw.jpg";
import future from "../images/magicball.png";
import styled from "styled-components";
import { useGlobalContext } from "../context";

const messages = [
  "Write Morning Pages the next day. Try not to break the chain",
  "Looks like you missed Morning Pages on that today",
  "Either you run the day or the day runs you.",
  "Focus on doing Morning Pages tomorrow",
  "Write Morning Pages the next day. Try not to break the chain",
];

const HistoryButton = ({ handleNewPageClick }) => {
  const { selectedDay, currentDay, month, year } = useGlobalContext();
  const [image, setImage] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    console.log(new Date(year, month, selectedDay) < new Date());
    if (new Date(year, month, selectedDay) < new Date()) {
      setImage(past);
      setMessage(messages[1]);
    }

    if (new Date(year, month, selectedDay) > new Date()) {
      setImage(future);
      setMessage(messages[3]);
    }

    if (
      new Date(year, month, selectedDay).getTime() ===
      new Date(year, month, currentDay).getTime()
    ) {
      setImage(today);
      setMessage(messages[2]);
    }
  }, [selectedDay, currentDay]);

  return (
    <StyledDayHistory>
      <ImageWrapper
        events={image === future ? "none" : "auto"}
        onClick={handleNewPageClick}
        width={image !== future ? "210px" : "250px"}
        height={image !== future ? "210px" : "250px"}
        marginBtm={image === future ? "0" : "40px"}
      >
        <img src={image} alt="" />
        <PlusIcon visibility={image === future ? "hidden" : "visible"}>
          {/* <AiOutlinePlus /> */}
          <img src={plus} alt="" />
        </PlusIcon>
      </ImageWrapper>

      <span>{message}</span>
    </StyledDayHistory>
  );
};

export default HistoryButton;

const StyledDayHistory = styled.div`
  span {
    max-width: 280px;
    color: #8d9da1;
    margin-top: 25px;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  z-index: 0;
  margin: 100px auto ${({ marginBtm }) => marginBtm} auto;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  pointer-events: ${({ events }) => events};
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 100%;
    display: block;
  }
`;

const PlusIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 5rem;
  z-index: 5;
  transform: translate(-50%, -50%) scale(0.7);
  visibility: ${({ visibility }) => visibility};

  color: white;
`;
