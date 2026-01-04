package routes

import (
	"net/http"

	"encrypted-notes-backend/internal/middleware"
	"encrypted-notes-backend/internal/notes"

	"github.com/go-chi/chi/v5"
)

func Setup() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.CORS)
	r.Use(middleware.Auth)

	r.Post("/notes", notes.CreateNote)
	r.Get("/notes", notes.GetNotes)
	r.Put("/notes/{id}", notes.UpdateNoteHandler)
	r.Delete("/notes/{id}", notes.DeleteNoteHandler)

	return r
}
