import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "@prisma/client/runtime/library";

const conversationRouter = Router();
const prisma = new PrismaClient();

conversationRouter.get("/conversation", async (req: Request, res: Response) => {
  const userId = req.query.userId as string; // Assuming you'll pass userId as a query parameter
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId: userId },
    });
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
  const { name, conversationString, userId } = req.body;
  try {
    const newConversation = await prisma.conversation.create({
      data: {
        name,
        conversationString,
        uploadStatus: "SUCCESS", // Assuming you want to set it as successful upon creation
        userId,
        doppelId: '',
      },
    });
    res.status(201).json(newConversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

conversationRouter.patch("/conversation/addDoppel", async (req: Request, res: Response) => {
  const { conversationId, doppelId } = req.body;
  try {
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        doppel: {
          connect: { id: doppelId },
        },
        doppelId: doppelId,
      },
      include: {
        doppel: true,
      },
    });
    res.status(201).json(updatedConversation);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



export default conversationRouter;