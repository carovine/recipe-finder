import express from "express";
import dotenv from "dotenv";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favouritesTable } from "./db/schema.js";

dotenv.config();

const app = express();
const PORT = ENV.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Recipe Finder API is running");
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
