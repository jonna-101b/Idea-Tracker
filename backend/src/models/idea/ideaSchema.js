import mongoose from "mongoose";
export const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Idea title is required"],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Idea description is required'],
        trim: true,
        minlength: [5, 'Description must be at least 5 characters long'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Owner is required'],
    },
    createdAt: {},
}, { timestamps: true });
//# sourceMappingURL=ideaSchema.js.map