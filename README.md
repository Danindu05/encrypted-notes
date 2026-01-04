# 🔐 Encrypted Notes
Encrypted Notes is a secure full-stack web application designed for creating, storing, and managing personal notes with strong encryption. Notes are encrypted **server-side using AES-256-GCM** before being stored, ensuring privacy even if the database is compromised.

## 🌐 Frontend
- **Modern UI** — Clean, responsive interface built with React and Tailwind CSS
- **Authentication** — Email & password login and registration via Firebase Auth
- **Create Notes** — Add new encrypted notes with title and content
- **Edit Notes** — View and update notes using modal dialogs
- **Delete Notes** — Safely remove notes with confirmation
- **Search Notes** — Instantly filter notes by title or content

## 🛡️ Backend
- **Secure API** — REST API built with Go
- **AES-256-GCM Encryption** — Notes encrypted before storage
- **Decryption on Read** — Notes decrypted only for authenticated users
- **Firebase Admin SDK** — Secure access to Firestore
- **Access Control** — Each user can only access their own notes

## 🛠️ Technologies Used
- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Go
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Encryption**: AES-256-GCM

## 🔐 Security Model
- Notes are **never stored in plaintext**
- Encryption keys are managed via **environment variables**
- Frontend never has access to encryption keys

## 💻 Local Development

### 1. Clone the repository:
```sh
git clone https://github.com/Danindu05/encrypted-notes.git
cd encrypted-notes
```

### 2. Backend setup
```sh
cd backend
go mod tidy
export ENCRYPTION_KEY=Enter Your Encryption Key
export FIREBASE_SERVICE_ACCOUNT=/path/to/FireBaseKey.json
go run .
```
Backend: http://localhost:8080

### 3. Frontend setup
```sh
cd frontend
pnpm install
echo "VITE_API_URL=http://localhost:8080" > .env
pnpm dev
```
Frontend: http://localhost:5173
