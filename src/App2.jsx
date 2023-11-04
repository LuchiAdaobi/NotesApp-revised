// USING LOCAL STORAGE



import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import { onSnapshot } from "firebase/firestore";
import { notesCollection } from "./firebase";

export default function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

//   FIREBASE
//   const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  // Local storage
  useEffect(() => {
    if (notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  // firebase db
//   useEffect(() => {
//     const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
//       // Sync up our local notes array with the snapshot data
//       const notesArr = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setNotes(notesArr);
//     });
//     return unsubscribe;
//   }, []);

  function createNewNote() {
    const newNote = {
          id: nanoid(),
        body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
}
// FIREBASE nEW NOTE
//  async function createNewNote() {
//    const newNote = {
//      body: "# Type your markdown note's title here",
//    };
//    const newNoteRef = await addDoc(notesCollection, newNote);
//    setCurrentNoteId(newNoteRef.id);
//  }

  // put the most recent note at the top
  function updateNote(text) {
    setNotes((prevNotes) => {
      const newArray = [];
      for (let i = 0; i < prevNotes.length; i++) {
        const prevNote = prevNotes[i];
        if (prevNote.id === currentNoteId) {
          newArray.unshift({ ...prevNote, body: text });
        } else {
          newArray.push(prevNote);
        }
      }
      return newArray;
    });
  }

  // this does not rearrange the notes
  // function updateNote(text) {
  //   setNotes((oldNotes) =>
  //     oldNotes.map((oldNote) => {
  //       return oldNote.id === currentNoteId
  //         ? { ...oldNote, body: text }
  //         : oldNote;
  //     })
  //   );
  // }

  function deleteNote(e, noteId) {
    e.stopPropagation();
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return note.id !== noteId;
      });
    });
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
