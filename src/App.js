import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Editor } from "./components/Editor";
import { database } from "./firebaseConfig";

export default function App() {
  return (
    <div className="app">
      <h1>Notes</h1>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home database={database} />} />
        <Route path="/editor/:id" element={<Editor database={database} />} />
      </Routes>
    </div>
  );
}
