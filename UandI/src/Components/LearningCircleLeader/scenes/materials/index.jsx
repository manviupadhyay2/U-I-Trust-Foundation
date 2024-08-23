import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../LearningCircleLeader/Header';
import axios from 'axios';  // Make sure to import axios
import { API_URL } from '../../../../utils/baseUrl'; // Replace with your actual API URL

const Form = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append('subjectName', values.subjectName);
    formData.append('serialNumber', values.serialNumber);

    if (values.file instanceof File) {
        formData.append('file', values.file);
    } else {
        console.error('File is not a valid file object');
        return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
        const response = await axios.post(API_URL+'/api/up/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`,
            }
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Upload Material" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={uploadSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Subject Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.subjectName}
                name="subjectName"
                error={!!touched.subjectName && !!errors.subjectName}
                helperText={touched.subjectName && errors.subjectName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Serial Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.serialNumber}
                name="serialNumber"
                error={!!touched.serialNumber && !!errors.serialNumber}
                helperText={touched.serialNumber && errors.serialNumber}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                onBlur={handleBlur}
                onChange={(event) => {
                  setFieldValue('file', event.currentTarget.files[0]);
                }}
                name="file"
                error={!!touched.file && !!errors.file}
                helperText={touched.file && errors.file}
                sx={{ gridColumn: 'span 4' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Upload Material
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const uploadSchema = yup.object().shape({
  subjectName: yup.string().required('Subject Name is required'),
  serialNumber: yup.string().required('Serial Number is required'),
  file: yup.mixed().required('A file is required'),
});

const initialValues = {
  subjectName: '',
  serialNumber: '',
  file: null,
};

export default Form;
