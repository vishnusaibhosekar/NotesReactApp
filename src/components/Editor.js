import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import {
  updateDoc,
  collection,
  doc,
  onSnapshot
} from 'firebase/firestore';

export function Editor({ database }) {
  let params = useParams();
  // console.log(params.id);
  const [editorData, setEditorData] = useState("");

  const getEditorData = (value) => {
    setEditorData(value);
  }

  useEffect(() => {
    const updateNoteData = setTimeout(() => { console.log(editorData) }, 2000)
    return () => clearTimeout(updateNoteData)
}, [editorData]);

  return (
  <div>
    <ReactQuill theme="snow" value={editorData} onChange={getEditorData} />
  </div>
  );
}
