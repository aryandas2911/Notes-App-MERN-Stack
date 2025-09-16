import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note(
      {
        title,
        description,
        userId: req.user.id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await newNote.save();

    return res
      .status(200)
      .json({ success: true, message: "Note created successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in adding note" });
  }
});

export default router;
