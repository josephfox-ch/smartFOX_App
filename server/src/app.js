import Express from "express";
import cors from "cors";
import morgan from "morgan";
import User from './api/models/user.js'

const app = Express();

app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello my new World')
  })

export default app;