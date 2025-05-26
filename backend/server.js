import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server as SocketIoServer } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productRoutes from './router/product.js';
import adminRoutes from './router/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// ✅ Proper CORS settings
const io = new SocketIoServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser()); // ✅ Required for handling cookies
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// ✅ Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Routes
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);

// ✅ Start server after MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
