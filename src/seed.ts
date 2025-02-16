import mongoose from "mongoose";
import dotenv from "dotenv";
import Joke from "./models/joke";

dotenv.config();

const arrayVotes = ["😂", "👍", "❤️"]

  mongoose.connect(process.env.MONGO_URI as string);

const seedJokes = async () => {
  await Joke.deleteMany();
  await Joke.insertMany([
    {
      question: "Why did the developer go broke?",
      answer: "Because he used up all his cache!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Why do programmers prefer dark mode?",
      answer: "Because light attracts bugs!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Why did the JavaScript developer go to therapy?",
      answer: "Because he had too many callbacks!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Why did the database administrator break up with the developer?",
      answer: "Because he kept committing without checking!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Question: Why was the JavaScript developer sad?",
      answer: "Answer: Because he didn’t null his feelings!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Why don’t programmers like nature?",
      answer: "It has too many bugs!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Why did the frontend developer break up with the backend developer?",
      answer: "Because they had too many conflicts!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Why do Python developers hate shopping?",
      answer: "Because they prefer import over buy!",
      votes: [],
      availableVotes: arrayVotes,
    },
    {
      question: "Question: Why did the CSS developer go to therapy?",
      answer: "Answer: Because he had too many issues with alignment!",
      votes: [],
      availableVotes: arrayVotes,
    },
  ]);
  console.log("Jokes added!");
  mongoose.connection.close();
};

seedJokes();