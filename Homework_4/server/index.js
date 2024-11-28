import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

const app = express();
const port = 3000;

// get static files from public directory
app.use(express.static(path.join(process.cwd(), "public")));

// get file list from the current directory
app.get("/files", (req, res) => {
  fs.readdir(process.cwd(), (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to scan directory" });
    }
    res.json(files);
  });
});

// upload file in the upload directory
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", file: req.file });
});

// run the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
