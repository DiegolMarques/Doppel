import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const conversationRouter = Router();
const prisma = new PrismaClient();

conversationRouter.get("/conversation", async (req: Request, res: Response) => {
  try {
    const conversations = await prisma.conversation.findMany();
    res.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

conversationRouter.delete("/conversation/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.conversation.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

conversationRouter.post("/conversation", async (req: Request, res: Response) => {
  const { name, conversationString } = req.body;
  try {
    const newConversation = await prisma.conversation.create({
      data: {
        name,
        conversationString,
        uploadStatus: "SUCCESS", // Assuming you want to set it as successful upon creation
      },
    });
    res.status(201).json(newConversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default conversationRouter;