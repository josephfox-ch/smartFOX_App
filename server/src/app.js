import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './api/routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api/v1/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
