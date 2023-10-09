//mongodb+srv://upxload:upxload@cluster0.bk3mbp1.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
const path = require("path");

// Connect to MongoDB (Make sure MongoDB is running)
mongoose.connect(
  "mongodb+srv://upxload:upxload@cluster0.bk3mbp1.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB Schema
const FileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  size: Number,
  mimetype: String,
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", FileSchema);

// Multer configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Upload route
app.post("/upload", upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files;

    // Save metadata to MongoDB using the provided schema
    const savedFiles = await File.create(
      files.map((file) => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
      }))
    );

    // Respond with saved files metadata
    res.json(savedFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
