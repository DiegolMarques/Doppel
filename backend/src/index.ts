import express from 'express';
import cors from 'cors';
import userRouter from './users/views'; // Import the userRouter module
import conversationRouter from './conversations/views';
import doppelsRouter from './doppels/views';


const app = express()


app.use(cors());
app.use(express.json());
const port = 8000


app.use("/users", userRouter);
app.use("/conversations", conversationRouter);
app.use("/doppels", doppelsRouter);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
