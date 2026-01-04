import { useState } from "react";

type NoteFormProps = {
  onAdd: (title: string, content: string) => void | Promise<void>;
};

export default function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAdd(title, content);
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          ➕ New Note
        </h2>
        <p className="text-sm text-slate-500">
          Write something you want to keep encrypted
        </p>
      </div>

      {/* Title input */}
      <input
        placeholder="📝 Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg
                   border border-slate-200
                   text-sm outline-none
                   focus:border-blue-600
                   focus:ring-4 focus:ring-blue-100"
      />

      {/* Content textarea */}
      <textarea
        placeholder="🔐 Your secret note…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full px-4 py-2.5 rounded-lg
                   border border-slate-200
                   text-sm outline-none resize-none
                   focus:border-blue-600
                   focus:ring-4 focus:ring-blue-100"
      />

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2
                     px-5 py-2.5 rounded-xl
                     bg-blue-600 text-white
                     font-semibold text-sm
                     hover:bg-blue-700
                     active:scale-[0.97]
                     transition"
        >
          ➕ Add Note
        </button>
      </div>
    </form>
  );
}
