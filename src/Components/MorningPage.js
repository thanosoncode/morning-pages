import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "./Context";
import { useParams } from "react-router-dom";
import HeaderPage from "./HeaderPage";
import { Container, TextArea } from "./styles/MorningPage.styled";
import { placeHolders } from "../data/placeholders";

const MorningPage = () => {
  let { id } = useParams();
  const textAreaElement = useRef();
  const { newPageContent, setNewPageContent } = useGlobalContext();

  const random = Math.floor(Math.random() * placeHolders.length);

  useEffect(() => {
    textAreaElement.current.focus();
  }, []);
  return (
    <>
      <HeaderPage id={id}></HeaderPage>
      <Container>
        {" "}
        <TextArea
          ref={textAreaElement}
          placeholder={placeHolders[random]}
          value={newPageContent}
          onChange={(e) => setNewPageContent(e.target.value)}
        />
      </Container>
    </>
  );
};

export default MorningPage;
