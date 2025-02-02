const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "project_images", // Set the folder to project_images
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });

// Middleware to handle single thumbnail image and multiple additional images
const projectUpload = {
  singleThumbnail: upload.single('thumbnailImage'),
  multipleImages: upload.array('additionalImages', 10) // Handle up to 10 additional images
};

module.exports = projectUpload;
