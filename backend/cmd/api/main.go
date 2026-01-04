package api

import (
	"log"
	"net/http"

	"encrypted-notes-backend/internal/config"
	"encrypted-notes-backend/internal/firebase"
	"encrypted-notes-backend/routes"

	"github.com/joho/godotenv"
)

func Start() {
	// Load .env once at startup
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment")
	}

	cfg := config.Load()

	firebase.Init(cfg)

	r := routes.Setup()

	log.Println("Backend running on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
