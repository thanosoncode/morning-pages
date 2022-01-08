import styled from "styled-components";
import { VscChromeClose } from "react-icons/vsc";
import { useGlobalContext } from "../context";

const Notification = () => {
  const { translateX, message, setTranslateX } = useGlobalContext();

  return (
    <StyledNotification transLateX={translateX}>
      {message}
      <span onClick={() => setTranslateX(0)}>
        <VscChromeClose />
      </span>
    </StyledNotification>
  );
};

export default Notification;

const StyledNotification = styled.div`
  position: absolute;
  top: 100px;
  right: -330px;
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  padding: 30px 20px;
  width: 300px;
  text-align: center;
  transition: 0.3s transform cubic-bezier(0, 0.46, 0.78, 1.88);
  transform: translateX(${({ transLateX }) => transLateX});

  span {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.3rem;
    cursor: pointer;
  }
`;
