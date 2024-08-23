import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useEffect, useState } from "react";
import axios from "axios";
const Team = () => {
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

  const rows = studentsData.uniqueStudents.map((studentId, index) => ({
    id: studentId,
    name: `Student ${index + 1}` // You can replace this with actual student names if available
  }));
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;