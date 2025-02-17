import mongoose, { Schema, Document } from "mongoose";

interface IVote {
  value: number;
  label: string;
}

export interface IJoke extends Document {
  question: string;
  answer: string;
  votes: IVote[];
  availableVotes: string[];
}

const JokeSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  votes: [
    {
      value: Number,
      label: String,
    },
  ],
  availableVotes: [String],
});

export default mongoose.model<IJoke>("Joke", JokeSchema);
