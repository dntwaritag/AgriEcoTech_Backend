import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import booksRoute from './routes/booksRoute.js';
import soilRoute from './routes/soilRoutes.js';
import deseaseRoute from './routes/deseaseRoute.js';
import waterRoute from './routes/waterRoute.js';
import remedieRoute from './routes/RemedieRoute.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer-Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

// Middleware for parsing request body
app.use(express.json());
app.use(bodyParser.json());

// Middleware for handling CORS POLICY
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send();
});

app.use('/books', booksRoute);
app.use('/soil', soilRoute);
app.use('/desease', deseaseRoute);
app.use('/water', waterRoute);
app.use('/remedie', remedieRoute);

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  console.log("Database connected");
  app.listen(process.env.PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`);
  });
}).catch((error) => {
  console.log(error);
});

export default app;
