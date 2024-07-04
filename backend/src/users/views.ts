import { Router, RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const userRouter = Router();
const prisma = new PrismaClient();


userRouter.get("/user", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

userRouter.post("/", async (req: Request, res: Response) => { 
  const { email, firebaseId } = req.body;

  const user = await prisma.user.create({
    data: {
      id: firebaseId,
      email: email,
    },
  });

  res.json(user);
});


export default userRouter;
