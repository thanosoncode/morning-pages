import Navbar from "../Components/Navbar";
import Calendar from "../Components/Calendar";
import History from "../Components/History";
import { Grid, Line } from "../Components/styles/Dashboard.style";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Grid>
        <Calendar />
        <Line />
        <History />
      </Grid>
    </>
  );
};

export default Dashboard;
