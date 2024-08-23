import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import StatBox from "../../components/StatBox";
import { Link } from 'react-router-dom';

// Mock data for students
const mockStudents = [
  { id: 1, name: "Tejeswar Pokuri" },
  // Add more mock students as needed
];

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [studentsData, setStudentsData] = useState({
    uniqueStudents: [],
    attendance: 0,
    attendancePercentage: 0
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/stu', {
          lclId: '66a59149cd3c38442b82dd7b'
        });
        setStudentsData(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Link to={`/student/${params.row.id}`}>
          <Button
            variant="contained"
            color="primary"
            size="small"
          >
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  // const rows = studentsData.uniqueStudents.map((studentId, index) => ({
  //   id: studentId,
  //   name: `Student ${index + 1}` // You can replace this with actual student names if available
  // }));
  const rows = studentsData.uniqueStudents.slice(0, 1).map((studentId, index) => ({
    id: studentId,
    name: `Student ${index + 1}` // You can replace this with actual student names if available
  }));

  return (
    <Box m="20px">
      <Header title="STUDENTS" subtitle="Managing the Students" />

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mb="20px"
      >
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${studentsData.uniqueStudents.length}`}
            subtitle="Total Students"
            icon={
              <PersonOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${studentsData.attendancePercentage.toFixed(2)}%`}
            subtitle="Attendance Percentage"
            icon={
              <CalendarTodayOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${studentsData.attendance}`}
            subtitle="Active Courses"
            icon={
              <SchoolOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Students;