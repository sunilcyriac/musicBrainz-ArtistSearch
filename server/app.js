import setMiddlewares from './src/middlewares/index.js';
import express from 'express';

const app = express();
setMiddlewares(app);

let server;

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || ''

if (process.env.NODE_ENV !== 'test') {
  server = (app.listen(PORT, () => {
    console.log(`Server running @ http://${HOST ? HOST : 'localhost'}:${PORT}`)
  }));
}

export default function() { app };