import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);

  const closeModel = () => {
    setModelOpen(false);
  };

  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        closeModel();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <button
        onClick={() => {
          setModelOpen(true);
        }}
        className="fixed right-4 bottom-4 bg-teal-500 text-white text-2xl font-bold p-4 rounded-full cursor-pointer"
      >
        +
      </button>
      {isModelOpen && <NoteModel closeModel={closeModel} addNote={addNote} />}
    </div>
  );
};

export default Home;
