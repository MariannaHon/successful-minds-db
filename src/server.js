import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import path from 'path';

import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3090'));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    })
  );

  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://waterapp-07.netlify.app', 'https://water-app-success.netlify.app/', 'https://mariannahon.github.io'],                    //////////////////////////////////////після тесту повернути, як було
    credentials: true,
  }));
  
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.use(express.static(path.resolve('src', 'uploads')));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
