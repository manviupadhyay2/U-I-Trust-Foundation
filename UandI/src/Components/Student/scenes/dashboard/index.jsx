import { useState, useMemo } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {};

  const [openDialog, setOpenDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [date, setDate] = useState("");
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleClickOpen = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSubmit = () => {
    const newFeedback = { date, mentor: "Volunteer", course, feedback, rating };
    setFeedbacks([...feedbacks, newFeedback]);
    setDate("");
    setCourse("");
    setFeedback("");
    setRating(0);
    handleCloseDialog();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const emojiOptions = [
    { emoji: "😞", score: 2, label: "Very Unsatisfied" },
    { emoji: "😐", score: 4, label: "Unsatisfied" },
    { emoji: "😐", score: 6, label: "Neutral" },
    { emoji: "😊", score: 8, label: "Satisfied" },
    { emoji: "😍", score: 10, label: "Very Satisfied" }
  ];

  const averageRatings = useMemo(() => {
    const ratingsByCourse = {};
    feedbacks.forEach(({ course, rating }) => {
      if (!ratingsByCourse[course]) {
        ratingsByCourse[course] = { total: 0, count: 0 };
      }
      ratingsByCourse[course].total += rating;
      ratingsByCourse[course].count += 1;
    });

    return Object.entries(ratingsByCourse).map(([course, { total, count }]) => ({
      course,
      average: total / count,
    }));
  }, [feedbacks]);

  const ratingDistribution = useMemo(() => {
    const distribution = {};
    feedbacks.forEach(({ course, rating }) => {
      if (!distribution[course]) {
        distribution[course] = 0;
      }
      distribution[course] += rating;
    });

    return {
      labels: Object.keys(distribution),
      datasets: [
        {
          data: Object.values(distribution),
          backgroundColor: [
            colors.greenAccent ? colors.greenAccent[400] : '#4caf50',
            colors.blueAccent ? colors.blueAccent[400] : '#2196f3',
            colors.redAccent ? colors.redAccent[400] : '#f44336',
            colors.yellowAccent ? colors.yellowAccent[400] : '#ffeb3b',
            colors.orangeAccent ? colors.orangeAccent[400] : '#ff9800',
          ],
          borderWidth: 1,
        }
      ]
    };
  }, [feedbacks, colors]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="STUDENT DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            onClick={handleClickOpen}
            sx={{
              backgroundColor: colors.blueAccent ? colors.blueAccent[700] : '#1e88e5',
              color: colors.grey ? colors.grey[100] : '#ffffff',
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Student Feedback
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date (mm/dd/yyyy)"
            type="date"
            fullWidth
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            margin="dense"
            id="course"
            label="Course"
            type="text"
            fullWidth
            variant="outlined"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <TextField
            margin="dense"
            id="feedback"
            label="Your Feedback"
            type="text"
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Typography component="legend">Rating</Typography>
          <Box display="flex" justifyContent="space-around" mt={2}>
            {emojiOptions.map((option, index) => (
              <Box
                key={index}
                onClick={() => setRating(option.score)}
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                  borderRadius: "50%",
                  padding: "10px",
                  backgroundColor: rating === option.score ? (colors.blueAccent ? colors.blueAccent[700] : '#1e88e5') : "transparent",
                  color: rating === option.score ? (colors.grey ? colors.grey[100] : '#ffffff') : "inherit",
                  transition: "background-color 0.3s",
                }}
              >
                <Typography variant="h3">{option.emoji}</Typography>
                <Typography variant="body2">{option.label}</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Feedback submitted successfully!"
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />

      <Typography variant="h6" gutterBottom>Students' Progress</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Mentor Name</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((fb, index) => (
              <TableRow key={index}>
                <TableCell>{fb.date}</TableCell>
                <TableCell>{fb.mentor}</TableCell>
                <TableCell>{fb.course}</TableCell>
                <TableCell>{fb.feedback}</TableCell>
                <TableCell>{fb.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Box
          flex={1}
          mr={1}
          p={2}
          sx={{ border: `1px solid ${colors.grey ? colors.grey[300] : '#e0e0e0'}`, borderRadius: '8px' }}
        >
          <Typography variant="h6" gutterBottom>Average Rating by Course</Typography>
          <Box height={250}>
            <Bar
              data={{
                labels: averageRatings.map(item => item.course),
                datasets: [{
                  label: 'Average Rating',
                  data: averageRatings.map(item => item.average),
                  backgroundColor: colors.blueAccent ? colors.blueAccent[400] : '#2196f3',
                }]
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 10,
                  }
                },
                maintainAspectRatio: false,
              }}
            />
          </Box>
        </Box>

        <Box
          flex={1}
          ml={1}
          p={2}
          sx={{ border: `1px solid ${colors.grey ? colors.grey[300] : '#e0e0e0'}`, borderRadius: '8px' }}
        >
          <Typography variant="h6" gutterBottom>Rating Distribution</Typography>
          <Box height={250}>
            <Pie
              data={ratingDistribution}
              options={{
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((acc, val) => acc + val, 0);
                        const currentValue = dataset.data[tooltipItem.dataIndex];
                        const percentage = ((currentValue / total) * 100).toFixed(2);
                        return `${dataset.label}: ${percentage}%`;
                      }
                    }
                  }
                },
                maintainAspectRatio: false,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

