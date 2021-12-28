import {
  Container,
  Background,
  Flex,
  Links,
  Header,
} from "../Components/styles/Home.styled";
import { StyledLogoDiv } from "../Components/styles/Navbar.styled";
import logo from "../images/logo-removebg.png";
import { useNavigate } from "react-router-dom";
import bg from "../images/morning-pages-bg.jpg";

const Home = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <Background>
        <img src={bg} alt="" />
      </Background>

      <Flex>
        <StyledLogoDiv onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="logo" />
          <div>
            <p>Morning Pages</p>
            <p>Online</p>
          </div>
        </StyledLogoDiv>
        <Links>
          <li>Feautures</li>
          <li>FAQS</li>
          <li>Blog</li>
          <li>Contact us</li>
        </Links>
      </Flex>

      <Header>
        <h1>Write what you can't say</h1>
        <h3>A simple morning routine that can change your entire day</h3>
        <button onClick={() => navigate("/dashboard")}>Start writing</button>
      </Header>
    </Container>
  );
};

export default Home;
