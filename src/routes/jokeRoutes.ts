import express from "express";
import Joke from "../models/joke";

const router = express.Router();

const countVotes = [
  { value: 0, label: "😂" },

  { value: 0, label: "👍" },

  { value: 0, label: "❤️" },
];

/**
 * Fetch a joke from TeeHee API and store it in MongoDB
 * @route POST /api/fetch-joke
 */
router.get("/fetch-joke", async (req: any, res: any) => {
  try {
    // Fetch joke from TeeHee API
     const response = await fetch("https://teehee.dev/api/joke");
     const data = await response.json();

    // Check if joke already exists in DB
    const existingJoke = await Joke.findOne({ id: data.id });
    if (existingJoke) {
      return res.json(existingJoke);
    }

    // Save joke to MongoDB
    const newJoke = new Joke({
      id: data.id,
      question: data.question,
      answer: data.answer,
      permalink: data.permalink,
      votes: countVotes, 
      availableVotes: ["😂", "👍", "❤️"], // Default emoji reactions
    });

    await newJoke.save();

    res.status(201).json(newJoke);
  } catch (error) {
    console.error("Error fetching joke:", error);
    res.status(500).json({ message: "Failed to fetch joke" });
  }
});

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
    const jokeId = req.params.id;
    // console.log("label_>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", label);
    const joke = await Joke.findOne({ id: jokeId });

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


/**
 * Update a joke by ID
 * @route PUT /api/joke/:id
 */
router.put("/joke/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const updatedJoke = await Joke.findOneAndUpdate(
      {id: id},
      { question, answer },
      { new: true } // Return the updated document
    );

    if (!updatedJoke) {
      return res.status(404).json({ message: "Joke not found" });
    }

    res.json(updatedJoke);
  } catch (error) {
    console.error("Error updating joke:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;

