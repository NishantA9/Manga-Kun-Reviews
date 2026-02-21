import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    rating: "",
    read_on: ""
  });

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setFormData(data);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("books")
      .update(formData)
      .eq("id", id);

    if (!error) {
      try {
        sessionStorage.setItem("pending_toast", JSON.stringify({ message: "Book updated", type: "success" }));
      } catch {
        /* ignore */
      }
      navigate("/");
    }
  };

  return (
    <div className="page-container">
    <div className="form-wrapper">
      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="author" value={formData.author} onChange={handleChange} />
        <input name="isbn" value={formData.isbn} onChange={handleChange} />
        <textarea name="description" value={formData.description} onChange={handleChange} />
        <input name="rating" type="number" step="0.1" min="0" max="10" value={formData.rating} onChange={handleChange} />
        <input type="date" name="read_on" value={formData.read_on} onChange={handleChange} />
        <div className="button-group2">
          <Button variant="info" type="submit">Update Book</Button>
          <Link to="/"><Button variant="warning">Back Home </Button></Link>
        </div>
      </form>
    </div>
    </div>
  );
}
