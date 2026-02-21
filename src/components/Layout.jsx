import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "../styles/main.css";
import Button from 'react-bootstrap/Button';


export default function Layout() {
  return (
    <>
      <Header />
      <main className="page-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
