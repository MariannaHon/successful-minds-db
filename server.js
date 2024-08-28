import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import cookieParser from 'cookie-parser';


import { env } from './src/utils/env.js'


const PORT = Number(env('PORT', '3090'));


export const setupServer = () => {
    const app = express();

    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json',],
        limit: '100kb',
    }));

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(cookieParser());

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
