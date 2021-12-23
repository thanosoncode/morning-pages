import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h1>Write what you can't say</h1>
      <h4>A simple morning routine that can change your entire day</h4>
      <button onClick={() => navigate("/dashboard")}>Start writing</button>
    </div>
  );
};

export default Home;
