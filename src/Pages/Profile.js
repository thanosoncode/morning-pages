import { useState, useRef, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Auth from "./Auth";
import { useGlobalContext } from "../context";
import { signOut } from "firebase/auth";
import { doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { VscChromeClose } from "react-icons/vsc";
import {
  Container,
  Section,
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
    pagesCollectionRef,
  } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let navigate = useNavigate();
  const inputEl = useRef();

  const handleLogOutClick = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const handleUpdateGoalClick = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "users", user.email), {
        wordGoal: inputEl.current.value,
      });
    } catch (error) {
      console.log(error);
    }
    setWordGoal(inputEl.current.value);
    setIsModalOpen(false);

    // setIsNotificationOpen(true);
  };

  const handleDeleteAllData = async () => {
    const data = await getDocs(pagesCollectionRef);
    const allPages = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const userPages = allPages.filter((doc) => doc.user === user.email);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure? This is irreversible and will remove all your pages and log you out."
      )
    ) {
      await deleteDoc(doc(db, "users", user.email));
      await signOut(auth);
      navigate("/");
    }
  };

  if (user) {
    return (
      <>
        <Navbar />
        <Container>
          <Section>
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
                <p>{wordGoal}</p>
              </div>
              <Button color="#212b36" onClick={() => setIsModalOpen(true)}>
                Change
              </Button>
            </Flex>
          </Section>
          <Section>
            <h1>Security &amp; Privacy</h1>
            <Flex>
              <div>
                <p>Delete All Data</p>
                <p>
                  Please keep in mind, that everything you created or imported
                  in this app will be irreversibly deleted.
                </p>
              </div>
              <Button color="#ff5e3c" onClick={handleDeleteAllData}>
                Delete All Data
              </Button>
            </Flex>
            <Flex>
              <div>
                <p>Delete All Data</p>
                <p>
                  Please keep in mind, that everything you created or imported
                  in this app will be irreversibly deleted.
                </p>
              </div>
              <Button color="#ff5e3c" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </Flex>
          </Section>
          <ModalContainer display={isModalOpen ? "flex" : "none"}>
            <Modal>
              <h3>Change words goal</h3>
              <form onSubmit={handleUpdateGoalClick}>
                <label htmlFor="words-goal">Words Goal</label>
                <input
                  type="number"
                  id="words-goal"
                  defaultValue={wordGoal}
                  ref={inputEl}
                />
                <button type="submit">Update Words Goal</button>
              </form>
              <span>
                <VscChromeClose />
              </span>
            </Modal>
          </ModalContainer>
        </Container>
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
