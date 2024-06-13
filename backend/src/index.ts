import express from 'express';
import cors from 'cors';
import userRouter from './users/views'; // Import the userRouter module

const app = express()

app.use(cors());
const port = 8000

app.use("/users", userRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

