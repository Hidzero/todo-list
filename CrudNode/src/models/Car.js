import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        marca: {
            type: String,
            required: true,
        },
        modelo: {
            type: String,
            unique: true
        },
        ano: {
            type: String,
            required: true
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

export default mongoose.model("car", carSchema);