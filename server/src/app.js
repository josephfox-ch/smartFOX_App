import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from './config/passport.js'
import userRoutes from './api/routes/userRoutes.js';
// import homeRoutes from './api/routes/homeRoutes.js';
import authRoutes from './api/routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/homes', homeRoutes);
app.use('/api/v1/auth',authRoutes);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;
