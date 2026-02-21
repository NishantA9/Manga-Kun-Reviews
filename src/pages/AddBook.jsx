import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    rating: "",
    read_on: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coverUrl = `https://covers.openlibrary.org/b/isbn/${formData.isbn}-M.jpg`;

    const { error } = await supabase.from("books").insert([
      {
        ...formData,
        rating: Number(formData.rating),
        cover_url: coverUrl
      }
    ]);

    if (error) {
      console.error(error);
      try { sessionStorage.setItem("pending_toast", JSON.stringify({ message: "Failed to add book", type: "error" })); } catch {error("Failed to set toast in sessionStorage", e); }
      navigate("/");
    } else {
      try { sessionStorage.setItem("pending_toast", JSON.stringify({ message: "Book added", type: "success" })); } catch {error("Failed to set toast in sessionStorage", e); }
      navigate("/");
    }
  };

  return (
<div className="page-container">
  <div className="form-wrapper">
    <h2>Add New Book</h2>

    <form onSubmit={handleSubmit}>
      <label style={{ textAlign: 'left', display: 'block', marginBottom: 6 }}>📘 Title</label>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

      <label style={{ textAlign: 'left', display: 'block', marginBottom: 6 }}>✍️ Author</label>
      <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />

      <label style={{ textAlign: 'left', display: 'block', marginBottom: 6 }}>🔢 ISBN</label>
      <input name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} required />
      <small style={{ display: 'block', marginBottom: 10, opacity: 0.8 }}>Cover will be fetched from OpenLibrary when possible.</small>

      <label style={{ textAlign: 'left', display: 'block', marginBottom: 6 }}>📝 Description</label>
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

      <label style={{ textAlign: 'left', display: 'block', marginBottom: 6 }}>⭐ Rating (0 - 10)</label>
      <input name="rating" type="number" step="0.1" min="0" max="10" placeholder="Rating (0 - 10)" value={formData.rating} onChange={handleChange} required />

      <label style={{ textAlign: 'left', display: 'block', marginBottom: 6 }}>📅 Read on</label>
      <input name="read_on" type="date" value={formData.read_on} onChange={handleChange} required />

    <div className="button-group2">
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <button type="submit" className="btn-green">Add Book</button>
      </div>
      <Link to="/"><Button variant="warning">Back Home </Button></Link>
      </div>
    </form>
  </div>
</div>
  );
}
