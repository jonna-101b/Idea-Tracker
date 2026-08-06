import mongoose from "mongoose";
import { type IIdea } from "./ideaSchema.js";
declare const Idea: mongoose.Model<IIdea, {}, {}, {}, mongoose.Document<unknown, {}, IIdea, {}, mongoose.DefaultSchemaOptions> & IIdea & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
}, any, IIdea>;
export default Idea;
//# sourceMappingURL=ideaModel.d.ts.map