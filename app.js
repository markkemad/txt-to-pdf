const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { jsPDF } = require('jspdf');
const app = express();
const port = 3001;

const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/convert', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, req.file.path);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        const doc = new jsPDF();
        doc.text(data, 10, 10);
        const pdfPath = path.join(__dirname, 'uploads', 'converted-text.pdf');
        doc.save(pdfPath);

        res.download(pdfPath, 'converted-text.pdf', (err) => {
            if (err) {
                return res.status(500).send('Error downloading file.');
            }

            fs.unlinkSync(filePath);
            fs.unlinkSync(pdfPath);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
