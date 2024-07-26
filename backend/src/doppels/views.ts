import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const doppelsRouter = Router();
const prisma = new PrismaClient();

doppelsRouter.post("/doppel", async (req: Request, res: Response) => {
  const { name, gender, age, race, nationality, city, occupation, personality, bio, userId } = req.body;
  try {
    const newDoppel = await prisma.doppel.create({
      data: {
        name: name,
        gender: gender,
        age: age,
        race: race,
        nationality: nationality,
        city: city,
        occupation: occupation,
        personality: personality,
        bio: bio,
        userId: userId
      }
    });
    res.status(201).json(newDoppel);
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

doppelsRouter.post("/manydoppels", async (req: Request, res: Response) => {
  const doppelsList: any[][] = req.body;
  
  try {
    const createdDoppels = await Promise.all(doppelsList.map(async (doppelData) => {
      const [name, gender, ageString, race, nationality, city, occupation, personality, bio, userId] = doppelData;
      
      // Convert age from string to integer
      const age = parseInt(ageString, 10);

      // Check if age is a valid number
      if (isNaN(age)) {
        throw new Error(`Invalid age value: ${ageString}`);
      }

      return await prisma.doppel.create({
        data: {
          name,
          gender,
          age,  // Now using the converted integer
          race,
          nationality,
          city,
          occupation,
          personality,
          bio,
          userId
        },
      });
    }));

    res.status(201).json(createdDoppels);
  } catch (error) {
    console.error('Error creating doppels:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default doppelsRouter