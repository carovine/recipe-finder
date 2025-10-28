import express from "express";
import dotenv from "dotenv";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favouritesTable } from "./db/schema.js";
import { eq, and } from "drizzle-orm";
import job from "./config/cron.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = ENV.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (ENV.NODE_ENV === "production") {
  job.start();
}

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Recipe Finder API is running");
});

app.get("/api/favourites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const favourites = await db
      .select()
      .from(favouritesTable)
      .where(eq(favouritesTable.userId, userId));
    res.status(200).json(favourites);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/favourites", async (req, res) => {
  try {
    const { userId, recipeId, title, imageUrl, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title || !imageUrl || !cookTime || !servings) {
      return res.status(400).json({ error: "Missing required fields" });
    } else {
      const newFav = await db
        .insert(favouritesTable)
        .values({ userId, recipeId, title, imageUrl, cookTime, servings })
        .returning();
      res.status(201).json(newFav);
    }
  } catch (error) {
    console.error("Error adding favourite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/favourites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    await db
      .delete(favouritesTable)
      .where(
        and(
          eq(favouritesTable.userId, userId),
          eq(favouritesTable.recipeId, Number(recipeId))
        )
      );
    res.status(200).json({ message: "Favourite deleted successfully" });
  } catch (error) {
    console.error("Error deleting favourite:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
