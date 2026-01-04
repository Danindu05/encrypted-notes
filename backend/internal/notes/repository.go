package notes

import (
	"context"

	"encrypted-notes-backend/internal/firebase"

	"cloud.google.com/go/firestore"
)

func collection(userID string) string {
	return "users/" + userID + "/notes"
}

func Save(ctx context.Context, note Note) error {
	_, err := firebase.DB.Collection(collection(note.UserID)).
		Doc(note.ID).
		Set(ctx, map[string]interface{}{
			"title":   note.Title,
			"content": note.Content,
		})
	return err
}

func GetAll(ctx context.Context, userID string) ([]Note, error) {
	docs, err := firebase.DB.Collection(collection(userID)).Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	notes := []Note{}

	for _, d := range docs {
		n := Note{
			ID:      d.Ref.ID,
			Title:   d.Data()["title"].(string),
			Content: d.Data()["content"].(string),
			UserID:  userID,
		}
		notes = append(notes, n)
	}

	return notes, nil
}

func Delete(ctx context.Context, userID, id string) error {
	_, err := firebase.DB.Collection(collection(userID)).Doc(id).Delete(ctx)
	return err
}

func Update(ctx context.Context, note Note) error {
	_, err := firebase.DB.Collection(collection(note.UserID)).
		Doc(note.ID).
		Update(ctx, []firestore.Update{
			{Path: "title", Value: note.Title},
			{Path: "content", Value: note.Content},
		})
	return err
}

func DeleteByID(ctx context.Context, userID, id string) error {
	_, err := firebase.DB.Collection(collection(userID)).Doc(id).Delete(ctx)
	return err
}
