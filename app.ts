import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieparser from 'cookie-parser';
import rootRouter from './src/routes/index'; 
import {errorHandler} from './src/utils/errorHandler';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
const app = express();

app.use(
  cors({
    origin: '*', // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);

//SECURITY MIDDLEWARE
//CONTENT SECURITY POLICY DISABLED FOR TESTING
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(bodyParser.json({ limit: '28mb' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(async (err: Error, _req: Request, _res: Response, next: NextFunction) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleError(err);
 });
// Parse COOKIES and ADD COOKIE INTO REQUEST BODY
app.use(cookieparser());
app.use(express.json());
app.use('/api', rootRouter);

export default app;
