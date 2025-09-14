import React, { useState } from "react";

const NoteModel = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <h2>Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Note title"
          />
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)}
            placeholder="Note description"></textarea>
            <button type="submit">Add Note</button>
        </form>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default NoteModel;
