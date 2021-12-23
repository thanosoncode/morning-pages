import Header from "./Header";
import Calendar from "./Calendar";
import History from "./History";
import { Grid } from "./styles/Dashboard.style";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Grid>
        <Calendar />
        <History />
      </Grid>
    </>
  );
};

export default Dashboard;
