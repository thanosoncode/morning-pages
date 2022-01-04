import { Container, StyledNav, StyledLogoDiv } from "./styles/Navbar.styled";
import logo from "../images/logo.png";
import personIn from "../images/personin.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

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
          <img src={personIn} alt="profile" />
        </div>
      </StyledNav>
    </Container>
  );
};

export default Navbar;
