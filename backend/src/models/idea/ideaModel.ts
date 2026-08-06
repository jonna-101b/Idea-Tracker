import mongoose from "mongoose";
import { ideaSchema, type IIdea } from "./ideaSchema.js";

const Idea = mongoose.model<IIdea>("Idea", ideaSchema);

export default Idea;