import {
  Container,
  Flex,
  Header,
  StyledLogoDiv,
} from "../Components/styles/Home.styled";
import logo from "../images/logo-removebg.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <Flex>
        <StyledLogoDiv onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
          <div>
            <p>Morning Pages</p>
            <p></p>
          </div>
        </StyledLogoDiv>
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
