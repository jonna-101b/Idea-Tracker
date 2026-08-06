import mongoose from "mongoose";
export interface IIdea {
    _id: string;
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ideaSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId;
    createdAt?: {};
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId;
    createdAt?: {};
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId;
    createdAt?: {};
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    updatedAt: NativeDate;
    title: string;
    description: string;
    owner: mongoose.Types.ObjectId;
    createdAt: {};
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=ideaSchema.d.ts.map