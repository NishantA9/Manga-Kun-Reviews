import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

const handleDelete = async () => {
  const { error } = await supabase
    .from("books")
    .delete()
    .eq("id", id);
  if (!error) {
    navigate("/");
  }
};

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) {
        setBook(data);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="book-detail">
      <div style={{ textAlign: "center" }}>
        <img src={book.cover_url} alt={book.title} style={{ height: "300px" }} />
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Rating:</strong> {book.rating} / 10</p>
        <p><strong>Read on:</strong> {book.read_on}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>
        <div style={{ marginTop: "20px" }}>
          <div className="button-group">
            <Button onClick={() => handleDelete(book.id)} variant="danger">Delete</Button>
            <Link to={`/edit/${book.id}`}><Button variant="primary">Edit</Button></Link>
            <Link to="/"><Button variant="warning">Back Home </Button></Link>
          </div>
        </div>
      </div>
</div>
);
}