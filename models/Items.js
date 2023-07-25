import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    contactName: {type: String, required: true},
    contactNumber: {type: String, required: true},
    itemOwner: {type: mongoose.Schema.Types.ObjectId, ref:"users", required: true},
})

export const ItemModel = mongoose.model("items", ItemSchema)
