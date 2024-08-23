import React, { useState } from 'react';
import FileUpload from '../Components/file-upload';
import axios from 'axios';
import { API_URL } from '../utils/baseUrl';

const StudentPage = () => {
    const [files, setFiles] = useState([]);

    const handleFileUpload = (files) => {
        setFiles(files);
    };

    const handleSubmit = async () => {

        console.log(files);

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('file', file);
        });
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user.token);
        await axios.post(API_URL+'/api/up/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`,
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div>
            <FileUpload
            accept={{ 'image/*': [] }}
                maxFiles={3}
                onChng={handleFileUpload}
                className="ax-w-52 max-h-28"
            >
                <span>Upload Profile Picture</span>
            </FileUpload>
            <button onClick={handleSubmit}>Submit Files</button>
        </div>
    );
};

export default StudentPage;