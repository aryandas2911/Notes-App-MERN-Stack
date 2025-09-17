import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { useAuth } from "../context/ContextProvider";

const Home = () => {
  const { user } = useAuth(); 
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes, setFilteredNote] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
      setFilteredNote([]);
    }
  }, [user]);

  useEffect(() => {
    setFilteredNote(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
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
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => {
            return (
              <NoteCard note={note} onEdit={onEdit} deleteNote={deleteNote} />
            );
          })
        ) : (
          <p>No Notes</p>
        )}
      </div>

      <button
        onClick={() => {
          setCurrentNote(null);
          setModelOpen(true);
        }}
        className="fixed right-4 bottom-4 bg-teal-500 text-white text-2xl font-bold p-4 rounded-full cursor-pointer"
      >
        +
      </button>
      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
