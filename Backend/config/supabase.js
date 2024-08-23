// import { createClient } from '@supabase/supabase-js';
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log(supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// Access Supabase storage
const storage = supabase.storage;

async function uploadFile(bucketName, fileName, file) {
    const { data, error } = await storage.from(bucketName).upload(fileName, file);
    if (error) {
        console.error('Error uploading file:', error);
        return error;
    } else {
        console.log('File uploaded successfully:', data);
        return data;
    }
}

// export async function downloadFile(bucketName: string, fileName: string) {
//     const { data, error } = await storage.from(bucketName).download(fileName);
//     if (error) {
//         console.error('Error downloading file:', error);
//     } else {
//         console.log('File downloaded successfully:', data);
//     }
// }

async function getPublicUrl(bucketName, fileName) {
    const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName)
    return data;
}
// async function deleteFile(bucketName: string, fileName: string) {
//     const { data, error } = await storage.from(bucketName).remove(fileName);
//     if (error) {
//         console.error('Error deleting file:', error);
//     } else {
//         console.log('File deleted successfully:', data);
//     }
// }

async function getAllFiles(bucketName, folder) {
    const { data, error } = await supabase
    .storage
    .from(bucketName)
    .list(folder,
        {
            limit: 100,
            sortBy: { column: 'name', order: 'asc' },
        }
    );
    if (error) {
        console.error('Error getting files:', error);
        return error;
    } else {
        console.log('Files retrieved successfully:', data);
        const publicUrls = data.map(file => supabase.storage.from(bucketName).getPublicUrl(file.name));
        return publicUrls;
    }
}

module.exports = {
    uploadFile,
    getPublicUrl,
    getAllFiles
};