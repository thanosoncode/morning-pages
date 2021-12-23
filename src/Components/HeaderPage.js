import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useGlobalContext } from "./Context";
import logo from "../images/logo.png";
import { months } from "../data/daysAndMonths";
import {
  StyledHeader,
  StyledLogoDiv,
  GreenButton,
  ProgressBar,
} from "./styles/HeaderPage.styled";

const HeaderPage = () => {
  let navigate = useNavigate();
  const {
    user,
    pagesCollectionRef,
    newPageContent,
    setNewPageContent,
    wordGoal,
    month,
    year,
    selectedDay,
    setShowHistoryPage,
    setHistoryPageContent,
    setNewPage,
    newPage,
  } = useGlobalContext();

  const [barPercentage, setBarPercentage] = useState(0);

  const createNewPage = async () => {
    console.log(selectedDay);
    const time = `${month + 1}-${selectedDay}-${year}`;
    await addDoc(pagesCollectionRef, {
      user: user.email,
      time: time,
      content: newPageContent,
      id: nanoid(),
    });

    console.log("created new page");
    setNewPageContent("");

    setBarPercentage(0);
    setNewPage(!newPage);
    navigate("/dashboard");
  };

  const handleCancelClick = () => {
    setNewPageContent("");
    setBarPercentage(0);
    navigate("/dashboard");
  };

  console.log(user.email);

  const getWrittenWords = useCallback(() => {
    if (newPageContent.length === 0) {
      return 0;
    }
    return newPageContent.split(" ").length - 1;
  }, [newPageContent]);

  useEffect(() => {
    setBarPercentage((getWrittenWords() / wordGoal) * 100);
    console.log(barPercentage);
  }, [newPageContent, wordGoal, getWrittenWords]);

  return (
    <StyledHeader>
      <StyledLogoDiv onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="logo" />
        <p>
          {months[month].name}&nbsp;{selectedDay},&nbsp;{year}
        </p>
        <p>{user?.email}</p>
      </StyledLogoDiv>
      <h5>
        {getWrittenWords()}/{wordGoal} words written
      </h5>
      <div>
        <button onClick={handleCancelClick}>Cancel</button>
        <GreenButton
          disabled={!user.email}
          opacity={user.email ? "1" : "0.3"}
          onClick={createNewPage}
        >
          Save
        </GreenButton>
      </div>
      <ProgressBar barPercentage={barPercentage} />
    </StyledHeader>
  );
};

export default HeaderPage;
