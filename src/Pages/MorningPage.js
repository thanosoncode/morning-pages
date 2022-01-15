import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import NavbarWriting from "../Components/NavbarWriting";
import Notification from "../Components/Notification";
import { Container, TextArea } from "../Components/styles/MorningPage.styled";
import { placeHolders } from "../data/placeholders";

const MorningPage = () => {
  let { id } = useParams();
  const textAreaElement = useRef();
  const {
    newPageContent,
    setNewPageContent,
    editing,
    editingContent,
    setEditingContent,
    throwNotification,
    user,
  } = useGlobalContext();

  const random = Math.floor(Math.random() * placeHolders.length);

  const handleMorningPageContent = (e) => {
    if (editing) {
      setEditingContent(e.target.value);
    } else {
      setNewPageContent(e.target.value);
    }
  };

  useEffect(() => {
    textAreaElement.current.focus();
  }, []);

  useEffect(() => {
    if (!user) {
      throwNotification("Create an account to unlock all features", 3000);
    }
  }, [user]);

  return (
    <>
      <NavbarWriting id={id}></NavbarWriting>
      <Container>
        {" "}
        <TextArea
          ref={textAreaElement}
          placeholder={placeHolders[random]}
          value={editing ? editingContent : newPageContent}
          onChange={handleMorningPageContent}
        />
        <Notification />
      </Container>
    </>
  );
};

export default MorningPage;
