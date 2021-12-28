import React, { useEffect, useCallback, useState } from "react";
import { db } from "../firebase";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  Container,
  Actions,
  SwitchContainer,
  SwitchHandle,
  Controls,
  Insights,
} from "./styles/HistoryPage.styled";

const HistoryPage = ({ content }) => {
  let navigate = useNavigate();
  const {
    editingId,
    month,
    year,
    selectedDay,
    pagesCollectionRef,
    setEditingContent,
    newPage,
    setNewPage,
    setEditing,
    setLoading,
    newPageContent,
    insightWords,
    writingTime,
  } = useGlobalContext();

  const [showInsights, setShowInsights] = useState(false);

  const handleEdit = async () => {
    setEditing(true);

    navigate(`/pages/${month + 1}-${selectedDay}-${year}`);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const userDoc = doc(db, "pages", editingId);
      await deleteDoc(userDoc);
      setNewPage(!newPage);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDoc = useCallback(async () => {
    const data = await getDocs(pagesCollectionRef);
    const allPages = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const page = allPages.filter((doc) => doc.id === editingId);
    setEditingContent(page[0]?.content);
  }, [editingId, setEditingContent, pagesCollectionRef]);

  useEffect(() => {
    getDoc();
  }, [editingId, getDoc]);

  return (
    <Container>
      <Controls>
        <SwitchContainer>
          <span onClick={() => setShowInsights(false)}>Text</span>
          <span onClick={() => setShowInsights(true)}>Insights</span>
          <SwitchHandle
            onClick={() => setShowInsights(!showInsights)}
            move={showInsights ? "100%" : "0"}
          >
            {showInsights ? "Insights" : "Text"}
          </SwitchHandle>
        </SwitchContainer>
        <Actions>
          <span onClick={handleEdit}>
            <FiEdit />
          </span>
          <span onClick={handleDelete}>
            <FiTrash />
          </span>
        </Actions>
      </Controls>
      {showInsights ? (
        <Insights>
          <div>
            <span>Words</span>
            <span>{insightWords}</span>
          </div>
          <div>
            <span>Writing Time</span>
            <span>{writingTime} minutes</span>
          </div>
        </Insights>
      ) : (
        <p>{content}</p>
      )}
    </Container>
  );
};

export default HistoryPage;
