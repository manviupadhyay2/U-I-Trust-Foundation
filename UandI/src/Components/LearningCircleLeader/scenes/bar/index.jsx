import { Box } from "@mui/material";
import Header from "../../LearningCircleLeader/Header";
import BarChart from "../../LearningCircleLeader/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
