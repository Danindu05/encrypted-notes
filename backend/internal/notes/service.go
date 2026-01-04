package notes

import (
	"context"
	"errors"
	"os"

	"encrypted-notes-backend/internal/crypto"

	"github.com/google/uuid"
)

func encryptionKey() []byte {
	return []byte(os.Getenv("ENCRYPTION_KEY"))
}

func Create(ctx context.Context, note Note) error {
	key := encryptionKey()
	if len(key) != 32 {
		return errors.New("invalid encryption key length")
	}

	note.ID = uuid.NewString()

	var err error
	note.Title, err = crypto.Encrypt(key, note.Title)
	if err != nil {
		return err
	}

	note.Content, err = crypto.Encrypt(key, note.Content)
	if err != nil {
		return err
	}

	return Save(ctx, note)
}

func ReadAll(ctx context.Context, userID string) ([]Note, error) {
	key := encryptionKey()
	if len(key) != 32 {
		return nil, errors.New("invalid encryption key length")
	}

	notes, err := GetAll(ctx, userID)
	if err != nil {
		return nil, err
	}

	for i := range notes {
		notes[i].Title, _ = crypto.Decrypt(key, notes[i].Title)
		notes[i].Content, _ = crypto.Decrypt(key, notes[i].Content)
	}

	return notes, nil
}

func UpdateNote(ctx context.Context, note Note) error {
	key := encryptionKey()
	if len(key) != 32 {
		return errors.New("invalid encryption key length")
	}

	var err error
	note.Title, err = crypto.Encrypt(key, note.Title)
	if err != nil {
		return err
	}

	note.Content, err = crypto.Encrypt(key, note.Content)
	if err != nil {
		return err
	}

	return Update(ctx, note)
}

func DeleteNote(ctx context.Context, userID, id string) error {
	return DeleteByID(ctx, userID, id)
}
