import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const shippingaddress = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        Address: {
            Country: {
                type: String,
            },
            City: {
                type: String,
            },
            Street: {
                type: String,
            }
        }
    }
)

const billingaddress = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        Address: {
            Country: {
                type: String,
            },
            City: {
                type: String,
            },
            Street: {
                type: String,
            }
        }
    }
)

const AddressSchema = new Schema(
    {
        Shippingaddress: shippingaddress,
        Billingaddress: billingaddress
    },
    {
        timestamps: true,
    }
);


export default mongoose.model('Address', AddressSchema);