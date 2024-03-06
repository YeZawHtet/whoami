import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav className="container py-3">
        <Link className="nav-link fs-3" to="/code">Play</Link>
      </nav>
      <Outlet />
    </div>
  );
}
