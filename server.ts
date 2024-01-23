import { errorHandler } from './src/utils/errorHandler';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    console.log('Uncaught exception! Shutting down...');
    process.exit(1);
  }
});
process.on('unhandledRejection', (error: Error) => {
  console.log('Unhandled Rejection! Shutting down.....');
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    console.log('Uncaught exception! Shutting down...');
    server.close(() => {
      process.exit(1);
    });
  }

});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. SHUTTING DOWN GRACEFULLY...');
  server.close(() => {
    console.log('PROCESS TERMINATED...');
  });
});
