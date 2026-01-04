package notes

import (
	"encoding/json"
	"net/http"

	"encrypted-notes-backend/internal/middleware"

	"github.com/go-chi/chi/v5"
)

func CreateNote(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(string)

	var note Note
	json.NewDecoder(r.Body).Decode(&note)
	note.UserID = userID

	if err := Create(r.Context(), note); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
func GetNotes(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(string)

	notes, err := ReadAll(r.Context(), userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// 🔒 GUARANTEE array, never null
	if notes == nil {
		notes = []Note{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(notes)
}

func UpdateNoteHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(string)
	id := chi.URLParam(r, "id")

	var note Note
	json.NewDecoder(r.Body).Decode(&note)
	note.ID = id
	note.UserID = userID

	if err := UpdateNote(r.Context(), note); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func DeleteNoteHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value(middleware.UserIDKey).(string)
	id := chi.URLParam(r, "id")

	if err := DeleteNote(r.Context(), userID, id); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
