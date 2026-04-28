import express from 'express';

import usersRouter from './routes/users.routes.js';
import petsRouter from './routes/pets.routes.js';
import adoptionsRouter from './routes/adoptions.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);

app.use(errorMiddleware);

export default app;