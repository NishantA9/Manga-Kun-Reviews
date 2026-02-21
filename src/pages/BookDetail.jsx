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
      <div className="book-detail-container">
        <div className="book-detail-image">
          <img src={book.cover_url} alt={book.title} />
        </div>
        
        <div className="book-detail-content">
          <div className="book-detail-top">
            <div className="book-detail-title-section">
              <h1 className="book-detail-title">{book.title}</h1>
            </div>
            <div className="book-detail-meta-top">
              <div className="meta-left">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Rating:</strong> {book.rating} / 10</p>
              </div>
              <div className="meta-right">
                <p><strong>Read On:</strong> {book.read_on}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
              </div>
            </div>
          </div>

          <div className="book-detail-description">
            <h3>Review:</h3>
            <p>{book.description}</p>
          </div>

          <div className="button-group">
            <Link to="/"><Button variant="warning">Home</Button></Link>
            <Link to={`/edit/${book.id}`}><Button variant="primary">Edit</Button></Link>
            <Button onClick={() => handleDelete(book.id)} variant="danger">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}