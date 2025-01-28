import mongoose from 'mongoose';
import { hashPassword } from '../middleware/hashPassword.js';


const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        Country: {
            type: String,
        },
        order:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Use save ho na sa phala hash passward ho ga phir user save ho ga 
UserSchema.pre('save', hashPassword);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User