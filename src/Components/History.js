import { useEffect } from "react";
import { deleteDoc } from "firebase/firestore";
import { StyledHistory } from "./styles/History.styled";
import { useNavigate } from "react-router-dom";
import HistoryPage from "./HistoryPage";

import { useGlobalContext } from "./Context";
import HistoryButton from "./HistoryButton";
import { months } from "../data/daysAndMonths";

const History = () => {
  let navigate = useNavigate();

  const {
    showHistoryPage,
    setShowHistoryPage,
    historyPageContent,
    selectedDay,
    currentDay,
    month,
    year,
  } = useGlobalContext();

  const handleNewPageClick = () => {
    navigate(`/pages/${month + 1}-${selectedDay}-${year}`);
  };

  useEffect(() => {}, [historyPageContent]);

  return (
    <StyledHistory>
      <h5>
        {months[month].name}&nbsp;{selectedDay},&nbsp;{year}
      </h5>
      {showHistoryPage ? (
        <HistoryPage content={historyPageContent} />
      ) : (
        <HistoryButton handleNewPageClick={handleNewPageClick} />
      )}
    </StyledHistory>
  );
};

export default History;
