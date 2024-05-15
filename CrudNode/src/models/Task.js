import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("task", taskSchema);