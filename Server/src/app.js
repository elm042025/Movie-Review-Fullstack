import express from 'express';

export const app = express()

//! middlewares
app.use(express.json())


//! routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})