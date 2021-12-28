import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";
import NavbarWriting from "../Components/NavbarWriting";
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
      </Container>
    </>
  );
};

export default MorningPage;
