import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        title: {
            type: String,
            required: false,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        Category: {
            type: String,
            required: true,
        },
        Price: {
            type: Number,
            required: true,
        },
        DescountPer: {
            type: Number,
            required: true,
        },

        delivery: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


export default mongoose.model('Product', UserSchema);