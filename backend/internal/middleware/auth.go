package middleware

import (
	"context"
	"net/http"
	"strings"

	"encrypted-notes-backend/internal/firebase"
)

type ctxKey string

const UserIDKey ctxKey = "userId"

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "missing token", http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		token, err := firebase.AuthClient.VerifyIDToken(context.Background(), tokenString)
		if err != nil {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, token.UID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
