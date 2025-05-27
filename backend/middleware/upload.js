import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

dotenv.config(); // Load environment variables

// Ensure Cloudinary credentials exist
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary credentials in .env file");
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    console.log(`Uploading: ${file.originalname} - Field: ${file.fieldname}`);

    const uploadConfig = {
      image: {
        folder: "furnify/image",
        resource_type: "auto",
        allowed_formats: ["png", "jpg", "jpeg", "mp4", "mov", "avi", "mkv","svg"],
      },
    };

    if (!uploadConfig[file.fieldname]) {
      throw new Error(`Invalid filefieldname: ${file.fieldname}`);
    }

    return uploadConfig[file.fieldname];
  },
});

const upload = multer({ storage });

export { upload };