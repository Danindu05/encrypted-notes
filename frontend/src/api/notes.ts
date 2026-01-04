import { auth } from "../firebase/firebase";

const API_URL = "localhost:8080";

async function authHeader() {
  const user = auth.currentUser;
  if (!user) return null;

  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getNotes() {
  const headers = await authHeader();
  if (!headers) return [];

  const res = await fetch(`${API_URL}/notes`, { headers });
  if (!res.ok) throw new Error("Failed to fetch notes");

  return res.json();
}

export async function createNote(title: string, content: string) {
  const headers = await authHeader();
  if (!headers) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) throw new Error("Failed to create note");
}

export async function updateNote(
  id: string,
  title: string,
  content: string
) {
  const headers = await authHeader();
  if (!headers) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) throw new Error("Failed to update note");
}

export async function deleteNote(id: string) {
  const headers = await authHeader();
  if (!headers) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) throw new Error("Failed to delete note");
}
