import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Home({ database }) {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [notesData, setNotesData] = useState([]);
  let userEmail = localStorage.getItem("userEmail");
  let databaseCollection = collection(database, "notes-data");
  let auth = getAuth();
  let navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  const addNote = () => {
    addDoc(databaseCollection, {
      title: title,
      author: userEmail,
      body: ""
    })
      .then((response) => {
        toast.success("Note created", { autoClose: 1000 });
        setIsAdd(false);
        setTitle("");
      })
      .catch(() => {
        toast.error("Could not create Note", { autoClose: 1000 });
      });
  };

  const openEditor = (id) => {
    navigate(`/editor/${id}`);
  };

  useEffect(() => {
    onSnapshot(databaseCollection, (data) => {
      setNotesData(
        data.docs.map((notes) => {
          return { ...notes.data(), id: notes.id };
        })
      );
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="logout-container">
        <Button variant="contained" color="error" onClick={logout}>
          Log Out
        </Button>
      </div>
      <Button
        onClick={() => setIsAdd(!isAdd)}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add Note
      </Button>
      {isAdd ? (
        <div className="title-input">
          <input
            className="add-title"
            placeholder="Add a Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <Button variant="contained" onClick={addNote}>
            Add
          </Button>{" "}
        </div>
      ) : (
        <></>
      )}
      <div className="grid-main">
        {notesData.map((note) => {
          return (
            <div key={note.title} className="grid-child" onClick={() => openEditor(note.id)}>
              <h3>{note.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
