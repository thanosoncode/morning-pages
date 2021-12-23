import Header from "./Header";
import { useGlobalContext } from "./Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { StyledProfile, Flex, Button } from "./styles/Profile.styled";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useGlobalContext();
  let navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/auth");
  };
  return (
    <>
      <Header />
      <StyledProfile>
        <h1>Profile Settings</h1>
        <Flex>
          <div>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>
          <Button color="#ff5e3c" onClick={handleLogOut}>
            Log Out
          </Button>
        </Flex>
        <Flex>
          <div>
            <p>Words Goal</p>
            <p>500</p>
          </div>
          <Button color="#212b36">Change</Button>
        </Flex>
      </StyledProfile>
    </>
  );
};

export default Profile;
