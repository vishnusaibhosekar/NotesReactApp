import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore";
import Button from "@mui/material/Button";

export function Editor({ database }) {
  let databaseCollection = collection(database, "notes-data");
  let params = useParams();
  let navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");

  const getEditorData = (value) => {
    setEditorData(value);
  };

  useEffect(() => {
    const updateNoteData = setTimeout(() => {
      let noteToUpdate = doc(databaseCollection, params.id);

      updateDoc(noteToUpdate, {
        body: editorData
      })
        .then(() => {
          toast.success("Note saved", {
            autoClose: 2000
          });
        })
        .catch(() => {
          toast.error("Could not save note", {
            autoClose: 2000
          });
        });
    }, 2000);
    return () => clearTimeout(updateNoteData);
  }, [editorData]);

  useEffect(() => {
    const note = doc(databaseCollection, params.id);
    onSnapshot(note, (docs) => {
      setTitle(docs.data().title);
      setEditorData(docs.data().body);
    });
  }, []);

  return (
    <div>
      <div className="goback">
        <Button variant="contained" onClick={() => navigate("/home")}>
          Back
        </Button>
      </div>
      <ToastContainer />
      <h3>{title}</h3>
      <ReactQuill theme="snow" value={editorData} onChange={getEditorData} />
    </div>
  );
}
