package firebase

import (
	"context"
	"log"

	"encrypted-notes-backend/internal/config"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
)

var (
	App        *firebase.App
	AuthClient *auth.Client
	DB         *firestore.Client
)

func Init(cfg config.Config) {
	ctx := context.Background()

	opt := option.WithCredentialsFile(cfg.ServiceAccountKey)

	app, err := firebase.NewApp(ctx, &firebase.Config{
		ProjectID: cfg.FirebaseProjectID,
	}, opt)
	if err != nil {
		log.Fatal(err)
	}

	App = app

	AuthClient, err = app.Auth(ctx)
	if err != nil {
		log.Fatal(err)
	}

	DB, err = app.Firestore(ctx)
	if err != nil {
		log.Fatal(err)
	}
}
