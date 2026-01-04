type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

export default function NoteList({ notes, onEdit, onDelete }: Props) {
  if (notes.length === 0) {
    return (
      <p className="text-center text-slate-500">
        📝 No notes yet. Create your first one above.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onEdit(note)}
          className="cursor-pointer
                     rounded-xl border border-slate-200 bg-white
                     shadow-sm hover:shadow-md transition
                     h-40 overflow-hidden
                     flex flex-col p-4"
        >
          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 truncate">
            {note.title}
          </h3>

          {/* Content preview (LOCKED HEIGHT) */}
          <p className="mt-2 text-sm text-slate-600 line-clamp-3 flex-1">
            {note.content}
          </p>

          {/* Footer (always bottom) */}
          <div className="mt-auto flex items-center justify-between">
            

            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note);
                }}
                className="px-2 py-1 rounded-md text-sm
                           bg-blue-50 text-blue-700
                           hover:bg-blue-100 transition"
              >
                ✏️
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note);
                }}
                className="px-2 py-1 rounded-md text-sm
                           bg-red-50 text-red-700
                           hover:bg-red-100 transition"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
