package config

import "os"

type Config struct {
	FirebaseProjectID string
	ServiceAccountKey string
	EncryptionKey     string
}

func Load() Config {
	return Config{
		FirebaseProjectID: os.Getenv("FIREBASE_PROJECT_ID"),
		ServiceAccountKey: os.Getenv("FIREBASE_SERVICE_ACCOUNT"),
		EncryptionKey:     os.Getenv("ENCRYPTION_KEY"),
	}
}
