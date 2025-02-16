import express from "express";
import Joke, { IJoke } from "../models/joke";

const router = express.Router();

// Fetch a random joke
router.get("/joke", async (req, res) => {
  try {
    const jokes = await Joke.find();
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json(randomJoke);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Submit a vote
router.post("/joke/:id", async (req: any, res: any) => {
  try {
    const { label } = req.body;
    const joke = await Joke.findById(req.params.id);

    if (!joke) return res.status(404).json({ message: "Joke not found" });

    const vote = joke.votes.find((v) => v.label === label);
    if (vote) {
      vote.value += 1;
    } else {
      joke.votes.push({ value: 1, label });
    }

    await joke.save();
    res.json(joke);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;



// router.get("/joke/count", async (req, res) => {
//   try {
//     const totalCount = await Joke.aggregate([
//       { $group: { _id: null, total: { $sum: "$fetchCount" } } },
//     ]);

//     res.json({ totalJokesFetched: totalCount[0]?.total || 0 });
//   } catch (error) {
//     console.error("Error getting joke count:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

