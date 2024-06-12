import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors());
const port = 8000

app.get('/hey', (req, res) => {
  res.send({
    message: "Hello World from Express API backend!"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})