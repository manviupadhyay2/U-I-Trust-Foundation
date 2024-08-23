const multer = require('multer');
const { uploadFile, getPublicUrl, getAllFiles } = require('../config/supabase');
const exp = require('express');
const { verifyToken } = require('../middlewares/AuthToken');
const router = exp.Router();

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });

router.use('/file-storage', exp.static('file-storage'));

router.post('/upload',verifyToken, upload.array('file'), async (req, res) => {
  const files = req.files; // Changed from req.body.file to req.files
  console.log('Files received:', files);
  if (!files || files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const user = req.user;
  console.log('User:', user);

  try {
    const uploadPromises = files.map(async (file) => {
      const { data, error } = await uploadFile('uni', `${user.role}/${user.id}/${file.originalname}`, file);
      if (error) {
        console.error(`Error uploading file: ${file.originalname}`, error);
        throw new Error(error.message);
      }
      console.log(`File uploaded: ${file.originalname}`);
      return data;
    });

    const results = await Promise.all(uploadPromises);
    res.send(results);
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).send(error.message);
  }
});
router.get("/getPublicUrl", (req, res) => {
    const bucketName = req.query.bucketName;
    const fileName = req.query.fileName;
    getPublicUrl(bucketName, fileName)
        .then((data) => {
        res.send(data);
        })
        .catch((error) => {
        console.error('Error getting public URL:', error);
        res.status(500).send(error.message);
        });
});
router.get("/allFiles", (req, res) => {
    const bucketName = 'uni';
    const fileName = req.body.fileName;
    getAllFiles(bucketName, fileName)
        .then((data) => {
          console.log(data);
        res.send(data);
        })
        .catch((error) => {
        console.error('Error getting public URL:', error);
        res.status(500).send(error.message);
        });
});
router.get("/", (req, res) => {
  console.log("GET request received");
  res.status(200).json({ message: "operational" });
});

module.exports = router;
