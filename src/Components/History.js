import { useEffect } from "react";
import { StyledHistory } from "./styles/History.styled";
import { useNavigate } from "react-router-dom";
import HistoryPage from "./HistoryPage";
import { useGlobalContext } from "../context";
import HistoryButton from "./HistoryButton";
import { months } from "../data/daysAndMonths";
import Loading from "./Loading";

const History = () => {
  let navigate = useNavigate();

  const {
    showHistoryPage,
    historyPageContent,
    selectedDay,
    month,
    year,
    loading,
    setNewPageContent,
    setWritingTimeStarted,
  } = useGlobalContext();

  const handleNewPageClick = () => {
    navigate(`/pages/${month + 1}-${selectedDay}-${year}`);
    setNewPageContent("");
    setWritingTimeStarted(new Date().getTime());
  };

  useEffect(() => {}, [historyPageContent]);

  if (loading) {
    return <Loading />;
  }
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
