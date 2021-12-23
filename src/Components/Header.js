import { StyledHeader, StyledLogoDiv } from "./styles/Header.styled";
import logo from "../images/logo.png";
import personIn from "../images/personin.png";
import { useGlobalContext } from "./Context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  const { user } = useGlobalContext();

  return (
    <StyledHeader>
      <StyledLogoDiv onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="logo" />
        <div>
          <p>Morning Pages</p>
          <p>Online</p>
        </div>
      </StyledLogoDiv>
      <div onClick={() => navigate("/profile")}>
        <p>{user?.email}</p>
        <img src={personIn} alt="profile" />
      </div>
    </StyledHeader>
  );
};

export default Header;
