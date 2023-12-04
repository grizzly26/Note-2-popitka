import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ViewNote.css"; 

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNote(data);
      })
      .catch((error) => {
        console.error("Error fetching note details:", error);
      });
  }, [id]);

  const handleDeleteNote = async () => {
    try {
      await fetch(`http://localhost:5001/notes/${id}`, {
        method: "DELETE",
      });

      navigate("/notes");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (    
  <div>
    <div className="home-links-container">
    <Link to="/Home" className="home-link">
      Home
    </Link>
    <Link to="/Notes" className="home-link">
      Notes
    </Link>
    <Link to="/Login" className="home-link">
      Log out
    </Link>
  </div>
    <div className="container">
      <h2>View note</h2>
      {note ? (
        <div className="note-details">
          <p>ID: {note.id}</p>
          <p>Title: {note.title}</p>
          <p>Content: {note.text}</p>
          <Link to={`/notes/edit/${id}`} className="edit-link">Edit ✍️</Link>
          <button onClick={handleDeleteNote} className="delete-button">Delete 🗑</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <Link to="/notes" className="back-link">Back to Notes</Link>
    </div>
    </div>
  );
};

export default ViewNote;
