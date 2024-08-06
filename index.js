// Import libraries
const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

// Multer configuration to save uploaded files in the "uploads" directory with a unique filename.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer middleware to handle file uploads.
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

// Endpoint to handle file uploads. Multer middleware will automatically save the uploaded file to the "uploads" directory.
app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

// Start the server
app.listen(PORT, () => console.log("Server started at PORT:8000"));
