import Express from "express";

const app = Express();

app.get('/', (req, res) => {
    res.send('Hello my new World')
  })

export default app;