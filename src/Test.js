import React, { useState } from "react";
import styled from "styled-components";

const Test = () => {
  const [distance, setDistance] = useState(0);
  const moveNotification = () => {
    if (distance === 0) {
      setDistance("-100%");
      setTimeout(() => {
        setDistance(0);
      }, 3000);
    } else {
      setDistance(0);
    }
  };
  console.log("render");
  return (
    <Div>
      <button onClick={moveNotification}>move it</button>
      <Notification distance={distance}>this is a notification!!!</Notification>
    </Div>
  );
};

export default Test;

const Notification = styled.div`
  position: absolute;

  padding: 20px 50px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 600;
  box-shadow: 0 0 6px 1px;
  transform: translateX(${({ distance }) => distance});
  transition: 0.3s ease-out;
`;

const Div = styled.div`
  background-color: cyan;
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 20px;

  button {
    position: absolute;
    top: 200px;
    left: 50px;
    padding: 5px 15px;
    cursor: pointer;
  }
`;
