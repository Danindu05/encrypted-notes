import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import { getNotes, createNote, updateNote, deleteNote } from "../api/notes";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  // 🔑 ESC key closes modals
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setEditingNote(null);
        setDeletingNote(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function loadNotes() {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  async function addNote(title: string, content: string) {
    await createNote(title, content);
    loadNotes();
  }

  async function saveEdit() {
    if (!editingNote) return;
    await updateNote(editingNote.id, editingNote.title, editingNote.content);
    setEditingNote(null);
    loadNotes();
  }

  async function confirmDelete() {
    if (!deletingNote) return;
    await deleteNote(deletingNote.id);
    setDeletingNote(null);
    loadNotes();
  }

  const filteredNotes = notes.filter((note) =>
    (note.title + note.content)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <p>Loading notes…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
<div className="min-h-screen bg-slate-100">

  <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      
  
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
          🔐
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Encrypted Notes
          </h1>
          <p className="text-xs text-slate-500">
            Private & secure
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <button
        onClick={() => signOut(auth)}
        className="inline-flex items-center gap-2
                   px-4 py-2 rounded-lg
                   text-sm font-medium
                   text-red-600
                   hover:bg-red-50
                   transition"
      >
        Logout
      </button>
    </div>
  </header>


      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <NoteForm onAdd={addNote} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <input
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg
                       border border-slate-200
                       focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <NoteList
            notes={filteredNotes}
            onEdit={setEditingNote}  
            onDelete={setDeletingNote}
          />
        </div>
      </main>


      {editingNote && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setEditingNote(null)}  
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="font-bold text-lg">📝 View / Edit Note</h2>

            <input
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({ ...editingNote, title: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />

            <textarea
              value={editingNote.content}
              onChange={(e) =>
                setEditingNote({ ...editingNote, content: e.target.value })
              }
              rows={6}
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setDeletingNote(editingNote)}
                className="text-red-600"
              >
                🗑️ Delete
              </button>

              <div className="flex gap-2">
                <button onClick={() => setEditingNote(null)}>Close</button>
                <button
                  onClick={saveEdit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {deletingNote && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setDeletingNote(null)}
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold text-lg">🗑️ Delete Note</h2>
            <p>Are you sure you want to delete this note?</p>

            <div className="flex justify-end gap-2">
              <button onClick={() => setDeletingNote(null)}>Cancel</button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
