import React from 'react';
import { saveAs } from 'file-saver';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from 'axios'
import { API_URL } from '../../../utils/baseUrl';

const Material = ({ NoOfCourses }) => {
    const theme = useTheme();
    const primaryColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;
    const textPrimaryColor = theme.palette.text.primary;
    const textSecondaryColor = theme.palette.text.secondary;

    const handleDownload =async () => {
        const alldata = await axios.get(API_URL+'/api/up/allFiles',
            {data:{
                fileName:'66a568d85241c4c8b5692bc3'
            }}
        )
        console.log(alldata)
        alldata.data.forEach((item) => {
            saveAs(item.url+'/66a568d85241c4c8b5692bc3', 'dowload.pdf');
        });
    };

    return (
        <Paper
            elevation={4}
            sx={{
                gridColumn: "span 3",
                backgroundColor: primaryColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                p: 5,
                borderRadius: "12px",
                boxShadow: 5,
                maxWidth: "500px",
                mx: "auto",
                mt: 5,
            }}
        >
            <Typography variant="h3" color="inherit" gutterBottom>
                Curriculum Update
            </Typography>
            <Typography variant="h5" color={textSecondaryColor} gutterBottom>
                Download your curriculum
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    my: 3,
                    p: 2,
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    width: "100%",
                }}
            >
                <ArrowDownwardIcon sx={{ color: secondaryColor, fontSize: "60px", mb: 2 }} />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDownload}
                    sx={{ mt: 2 }}
                >
                    Download Curriculum
                </Button>
            </Box>
        </Paper>
    );
}

export default Material;
