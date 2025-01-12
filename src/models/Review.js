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
        Product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    },
    {
        timestamps: true,
    }
);


export default mongoose.model('Review', UserSchema);