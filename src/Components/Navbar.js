import { Container, StyledNav, StyledLogoDiv } from "./styles/Navbar.styled";
import logo from "../images/logo.png";
import personIn from "../images/personin.png";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const { user } = useGlobalContext();

  return (
    <Container>
      <StyledNav>
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
      </StyledNav>
    </Container>
  );
};

export default Navbar;
