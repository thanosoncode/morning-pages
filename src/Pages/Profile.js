import { useState } from "react";
import Navbar from "../Components/Navbar";
import Auth from "./Auth";
import { useGlobalContext } from "../context";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { VscChromeClose } from "react-icons/vsc";
import {
  StyledProfile,
  Flex,
  Button,
  ModalContainer,
  Modal,
} from "../Components/styles/Profile.styled";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {
    user,
    wordGoal,
    setWordGoal,
    setIsNotificationOpen,
    userCollectionRef,
  } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let navigate = useNavigate();

  const handleLogOutClick = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const handleUpdateGoalClick = async () => {
    setIsModalOpen(false);

    setIsNotificationOpen(true);
  };

  const handleChangeWordsClick = async () => {
    setIsModalOpen(true);
    await updateDoc(doc(db, "users", user.email), {
      wordGoal: 300,
    });
  };
  if (user) {
    return (
      <>
        <Navbar />
        <StyledProfile>
          <h1>Profile Settings</h1>
          <Flex>
            <div>
              <p>Email</p>
              <p>{user?.email}</p>
            </div>
            <Button color="#ff5e3c" onClick={handleLogOutClick}>
              Log Out
            </Button>
          </Flex>
          <Flex>
            <div>
              <p>Words Goal</p>
              <p>500</p>
            </div>
            <Button color="#212b36" onClick={handleChangeWordsClick}>
              Change
            </Button>
          </Flex>
          <ModalContainer display={isModalOpen ? "flex" : "none"}>
            <Modal>
              <h3>Change words goal</h3>
              <label htmlFor="words-goal">Words Goal</label>
              <input
                type="number"
                id="words-goal"
                value={wordGoal}
                onChange={(e) => setWordGoal(e.target.value)}
              />
              <button onClick={handleUpdateGoalClick}>Update Words Goal</button>
              <span>
                <VscChromeClose />
              </span>
            </Modal>
          </ModalContainer>
        </StyledProfile>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Auth />
    </>
  );
};

export default Profile;
