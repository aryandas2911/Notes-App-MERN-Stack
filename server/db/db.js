import mongoose from "mongoose";

const connectToMongo= async ()=>{
    try {
        await mongoose.connect("mongodb+srv://aryandas2911:Aryan%402006@notesapp.b5hmnte.mongodb.net/notes_app");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }
};

export default connectToMongo;