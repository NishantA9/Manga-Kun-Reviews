import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { Link, useLocation } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import Button from 'react-bootstrap/Button';


export default function Home() {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [orderAsc, setOrderAsc] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState({ open: false, id: null, title: "" });
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    const fetchBooks = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("rating", { ascending: false });

      if (!mounted) return;
      if (error) {
        console.error(error);
      } else {
        setBooks(data || []);
      }
      setIsLoading(false);
    };

    fetchBooks();
    return () => { mounted = false; };
  }, []);

  // Show toast if navigated with state (add/edit)
  useEffect(() => {
    // first try sessionStorage (more reliable), then fallback to location.state
    try {
      const p = sessionStorage.getItem("pending_toast");
      if (p) {
        const parsed = JSON.parse(p);
        setToast({ message: parsed.message, type: parsed.type || "success" });
        sessionStorage.removeItem("pending_toast");
        setTimeout(() => setToast(null), 2800);
        return;
      }
    } catch {
      // ignore parsing errors
    }

    if (location && location.state && location.state.toast) {
      const id = setTimeout(() => {
        setToast({ message: location.state.toast, type: location.state.type || "success" });
        setTimeout(() => setToast(null), 2800);
      }, 0);
      const rid = setTimeout(() => window.history.replaceState({}, document.title), 0);
      return () => { clearTimeout(id); clearTimeout(rid); };
    }
    return;
  }, [location]);

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setToast({ message: "Failed to delete", type: "error" });
      setTimeout(() => setToast(null), 2500);
    } else {
      setBooks((prev) => prev.filter((book) => book.id !== id));
      setToast({ message: "Deleted", type: "success" });
      setTimeout(() => setToast(null), 2200);
    }
  };

  const openConfirm = (id, title) => setConfirm({ open: true, id, title });
  const closeConfirm = () => setConfirm({ open: false, id: null, title: "" });
  const confirmDelete = async () => {
    if (!confirm.id) return;
    await handleDelete(confirm.id);
    closeConfirm();
  };
  // derive sorted list
  const sortedBooks = useMemo(() => {
    const list = [...books];
    list.sort((a, b) => {
      let av = a[sortBy];
      let bv = b[sortBy];
      if (sortBy === "read_on") {
        av = av ? new Date(av).getTime() : 0;
        bv = bv ? new Date(bv).getTime() : 0;
      }
      if (sortBy === "rating") {
        av = Number(av) || 0;
        bv = Number(bv) || 0;
      }
      if (av === bv) return 0;
      return orderAsc ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
    return list;
  }, [books, sortBy, orderAsc]);

  return (
    <>
      <div className="page-container">
        <h1 className="nish">Manga-Kun Reviews</h1>
        <p className="nish1">Hi there! Welcome to Manga-Kun Reviews. Find reviews, add your own, and grade manga you love.</p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center", margin: "18px 0" }}>
          <Link to="/add"><Button variant="success">+ New Book</Button></Link>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ color: "inherit" }}>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">Rating</option>
              <option value="read_on">Date read</option>
            </select>
            <Button variant="secondary" onClick={() => setOrderAsc((v) => !v)}>{orderAsc ? "⬆️ Asc" : "⬇️ Desc"}</Button>
          </div>
        </div>

        <div className="book-grid">
          {isLoading && Array.from({ length: 6 }).map((_, i) => (
            <div className="book-card skeleton" key={"skel-" + i}>
              <div className="s-img" />
              <div className="s-line short" />
              <div className="s-line" />
              <div className="s-line" />
            </div>
          ))}

          {!isLoading && sortedBooks.length === 0 && (
            <div className="empty-state">
              <h3>No reviews yet</h3>
              <p>Looks like you haven't added any books. Start by adding your first review.</p>
              <Link to="/add" className="btn-green">Add your first book</Link>
            </div>
          )}

          {!isLoading && sortedBooks.map((book) => (
            <div key={book.id} className="book-card">
              <Link to={`/book/${book.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={book.cover_url} alt={book.title} />
                <div className="book-title">{book.title}</div>
                <div>By: {book.author}</div>
                <div className="book-description">{book.description ? `${book.description.substring(0, 100)}...` : ""}</div>
                <div>Read on: {book.read_on}</div>
                <div className="book-rating">⭐ {book.rating}</div>
              </Link>
              <div className="card-buttons">
                <div className="button-group">
                  {/* <button onClick={() => openConfirm(book.id, book.title)} className="btn-red"> Delete </button> */}
                  {/* <Link to={`/edit/${book.id}`} className="btn-blue">Edit</Link> */}
                  <Button onClick={() => openConfirm(book.id, book.title)} variant="danger">Delete</Button>
                  <Link to={`/edit/${book.id}`}><Button variant="primary">Edit</Button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* toast container */}
      <div className="toast-container">
        {toast && (
          <div className={`toast ${toast.type === "success" ? "success" : "error"}`}>
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}