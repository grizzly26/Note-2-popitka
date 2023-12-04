import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditNote.css";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5001/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.text);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных заметки:", error);
      });
  }, [id]);

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = "Введите название заметки";
    }
    return errors;
  };

  const handleSaveNote = () => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      fetch(`http://localhost:5001/notes/${id}`, {
        method: 'PUT', // или 'PATCH' в зависимости от вашего API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          text: content,
        }),
      })
        .then(response => response.json())
        .then(updatedData => {
          console.log("Заметка сохранена:", updatedData);
          setTitle(updatedData.title);
          setContent(updatedData.text);
          navigate(`/notes/view/${id}`);
        })
        .catch(error => {
          console.error("Ошибка при обновлении заметки:", error);
        });
    } else {
      setErrors(errors);
    }
  };

  const handleBackToNotes = () => {
    navigate("/Notes");
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
        <h2>Edit note</h2>
        <button style={{ margin: "20px" }} onClick={handleSaveNote}>Save</button>
        <button style={{ margin: "20px" }} onClick={handleBackToNotes}>Cancel</button>

        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        <br />
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <br />
      </div>
    </div>
  );
};

export default EditNote;
