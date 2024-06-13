import { Router, RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get("/user", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default userRouter;