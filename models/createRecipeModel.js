// This is the schema
import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [],
        required: true,
    },
    likes: {
        type: [],
        required: false,
        
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    tags: {
        type: String,
        required: true,
    },
    similar: {
       type: String, //[{String}]
    },
    author: {
        type: String,
       // required: true,
    },
    comments: {
        type: String,
    },

},
    {
        timestamps: true
    }
)

export const CreateRecipe = mongoose.model("CreateRecipe", recipeSchema)