import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import allRoutes from './routes';
import { portInUseErrorLogs } from './utils/showErrorLogs';

// dotenv

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

const server = express();

// middleware
server.use(morgan('tiny'));
server.use(express.json());

// routes
server.use('/api', allRoutes);

server
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      portInUseErrorLogs(PORT);
      process.exit(1);
    }
  });
