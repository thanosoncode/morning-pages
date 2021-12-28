import styled from "styled-components";
import { VscChromeClose } from "react-icons/vsc";
import { useGlobalContext } from "../context";

const Notification = () => {
  const { isNotificationOpen, setIsNotificationOpen } = useGlobalContext();

  return (
    <StyledNotification
      transform={isNotificationOpen ? "translateX(-360px)" : "translateX(0)"}
    >
      Your words goal was changed successfully
      <span onClick={() => setIsNotificationOpen(false)}>
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
  padding: 20px 30px;
  background-color: white;
  box-shadow: 0 2px 3px 0 rgb(22, 22, 22);
  border-radius: 6px;
  padding: 30px 20px;
  width: 300px;
  text-align: center;
  transition: 0.3s transform cubic-bezier(0, 0.46, 0.78, 1.88);

  /* transform: translateX(-360px); */
  transform: ${({ transform }) => transform};
  /* transform: translateX(calc(100% + 35px));
  transform: translateX(0); */

  span {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.3rem;
  }
`;
