const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// ใช้ CORS
app.use(cors());

// ตั้งค่าการอ่านข้อมูลจากฟอร์ม
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ให้เซิร์ฟเวอร์เข้าถึงโฟลเดอร์ uploads
app.use('/uploads', express.static('uploads'));

// ตั้งค่า multer สำหรับอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// รับข้อมูลจากฟอร์มและอัปโหลดไฟล์
app.post('/upload', upload.single('image'), (req, res) => {
  const { title, social, table, message } = req.body;
  const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : '';

  const formData = {
    title,
    social,
    table,
    message,
    imageUrl
  };

  // เขียนข้อมูลลงใน data.json
  fs.readFile('data.json', (err, data) => {
    let jsonData = [];

    if (!err) {
      jsonData = JSON.parse(data);
    }

    jsonData.push(formData);

    // เขียนข้อมูลใหม่ลงไปใน data.json
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
    res.send('✅ ส่งข้อมูลเรียบร้อยแล้ว!');
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
