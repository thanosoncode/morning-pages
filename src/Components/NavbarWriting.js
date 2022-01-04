import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "../firebase";
import { useGlobalContext } from "../context";
import logo from "../images/logo.png";
import { months } from "../data/daysAndMonths";
import {
  StyledNav,
  StyledLogoDiv,
  GreenButton,
  ProgressBar,
  Container,
} from "./styles/NavbarWriting.styled";

const NavbarWriting = () => {
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
    setNewPage,
    newPage,
    editing,
    editingId,
    editingContent,
    setEditing,
    setEditingContent,
    setLoading,
    writingTimeStarted,
    writingTime,
    setWritingTime,
  } = useGlobalContext();

  const [barPercentage, setBarPercentage] = useState(0);

  const createNewPage = async () => {
    if (user) {
      if (editing) {
        setLoading(true);
        try {
          const userDoc = doc(db, "pages", editingId);
          const newFields = { content: editingContent };
          await updateDoc(userDoc, newFields);
          setLoading(false);
          setEditingContent("");
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        setLoading(true);

        try {
          let selectedMonth = month + 1;
          if (month < 10) {
            selectedMonth = "0" + selectedMonth.toString();
          } else {
            selectedMonth = selectedMonth.toString();
          }
          const time = `${selectedMonth}-${selectedDay}-${year}`;
          setWritingTime(
            Math.floor((new Date().getTime() - writingTimeStarted) / 1000 / 60)
          );

          await addDoc(pagesCollectionRef, {
            user: user.email,
            id: nanoid(),
            time: time,
            content: newPageContent,
            writingTime: writingTime,
            wordsWritten: newPageContent.split(" ").length,
          });

          setBarPercentage(0);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      setNewPage(!newPage);
      setEditing(false);
      navigate("/dashboard");
    }
  };

  const handleCancelClick = () => {
    if (window.confirm("Are you sure? Changes will not be saved.")) {
      setNewPageContent("");
      setBarPercentage(0);
      navigate("/dashboard");
    }
  };

  const getWrittenWords = useCallback(() => {
    if (editing) {
      if (editingContent.length === 0) {
        return 0;
      }
      return editingContent.split(" ").length - 1;
    } else {
      if (newPageContent.length === 0) {
        return 0;
      }
      return newPageContent.split(" ").length - 1;
    }
  }, [newPageContent, editingContent, editing]);

  useEffect(() => {
    setBarPercentage((getWrittenWords() / wordGoal) * 100);
  }, [newPageContent, wordGoal, editing, editingContent, getWrittenWords]);

  return (
    <Container>
      <StyledNav>
        <StyledLogoDiv onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="logo" />
          <p>
            {months[month].name}&nbsp;{selectedDay},&nbsp;{year}
          </p>
        </StyledLogoDiv>
        <h5>
          {getWrittenWords()}/{wordGoal} words written
        </h5>
        <div>
          <button onClick={handleCancelClick}>Cancel</button>
          <GreenButton
            disabled={!user}
            opacity={user ? "1" : "0.3"}
            onClick={createNewPage}
          >
            Save
          </GreenButton>
        </div>
        <ProgressBar barPercentage={barPercentage} />
      </StyledNav>
    </Container>
  );
};

export default NavbarWriting;
