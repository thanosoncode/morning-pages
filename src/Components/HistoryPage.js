import React, { useEffect } from "react";
import { db } from "../firebase";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./Context";
import styled from "styled-components";
import { FiEdit, FiTrash } from "react-icons/fi";

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
  } = useGlobalContext();

  const handleEdit = async () => {
    const userDoc = doc(db, "pages", editingId);
    navigate(`/pages/${month + 1}-${selectedDay}-${year}`);
  };
  const handleDelete = async () => {
    const userDoc = doc(db, "pages", editingId);

    await deleteDoc(userDoc);
    setNewPage(!newPage);
  };

  useEffect(() => {
    const getDoc = async () => {
      const data = await getDocs(pagesCollectionRef);
      const allPages = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const page = allPages.filter((doc) => doc.id === editingId);
      setEditingContent(page[0]?.content);
    };
    getDoc();
  }, [editingId]);
  return (
    <Container>
      <Flex>
        <span onClick={handleEdit}>
          <FiEdit />
        </span>
        <span onClick={handleDelete}>
          <FiTrash />
        </span>
      </Flex>
      <p>{content}</p>
    </Container>
  );
};

export default HistoryPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  p {
    width: 100%;
    margin: 0;
    padding: 0 30px;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-direction: row;
  padding-right: 20px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    margin: 0;
    color: #777;
    cursor: pointer;
    transition: 0.3s ease;
  }

  span:hover {
    color: #aaa;
  }

  span:last-child {
    margin-left: 20px;
  }
`;
