import {
  Container,
  StyledNav,
  StyledLogoDiv,
  Links,
} from "./styles/Navbar.styled";
import logo from "../images/logo.png";
import personIn from "../images/personin.png";
import personOut from "../images/personout.png";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import star from "../images/star.png";
import starActive from "../images/star-active.png";
import add from "../images/add.png";
import addActive from "../images/add-active.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user } = useGlobalContext();
  let navigate = useNavigate();
  let { pathname } = useLocation();

  return (
    <Container>
      <StyledNav>
        <StyledLogoDiv onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <div>
            <p>Morning Pages</p>
            <p>Online</p>
          </div>
        </StyledLogoDiv>
        <Links>
          <img
            src={pathname === "/dashboard" ? addActive : add}
            alt=""
            onClick={() => navigate("/dashboard")}
          />
          <img
            src={pathname === "/badges" ? starActive : star}
            alt=""
            onClick={() => navigate("/badges")}
          />
        </Links>
        <div onClick={() => navigate("/profile")}>
          <img src={user ? personIn : personOut} alt="profile" />
        </div>
      </StyledNav>
    </Container>
  );
};

export default Navbar;
