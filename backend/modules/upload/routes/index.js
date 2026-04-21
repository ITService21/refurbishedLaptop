const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const router = express.Router();

// Determine upload directory - save to frontend/public/image/products
const uploadDir = path.resolve(__dirname, "../../../../frontend/public/image/products");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `${uuidv4()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WebP and GIF images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// Upload multiple product images (max 10)
router.post("/upload/images", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const urls = req.files.map((file) => `/image/products/${file.filename}`);

    return res.status(200).json({
      success: true,
      message: `${req.files.length} image(s) uploaded successfully`,
      data: urls,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
});

module.exports = router;
