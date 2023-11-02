import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    if (notes) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

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

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }
 function deleteNote(e, noteId){
    e.stopPropagation()
  setNotes(prevNotes => {
    return prevNotes.filter((note)=> {
      return note.id !== noteId
    })
  })
   
 }


  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
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
