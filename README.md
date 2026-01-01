# 📄Patient Document Portal

A simple **full-stack web application** for managing patient documents (PDFs).  
This project allows users to upload, view, download, and delete PDF documents securely.

Built as part of a **Full Stack Developer Intern Assessment**.

---

## 📸 Screenshots

![Dashboard Screenshot](./frontend/src/assets/Screenshot%202026-01-01%201013.png)
![Dashboard Screenshot](./frontend/src/assets/Screenshot%202026-01-01%20101313.png)

---

## 🛠 Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios, Vite  
**Backend:** Node.js, Express.js, Multer, CORS  
**Database:** SQLite (for storing document metadata)  
**File Storage:** Local `uploads/` folder (PDFs saved here during runtime)

---

## ⚡ Features

- Upload PDF documents (with file type and size validation)
- View a list of all uploaded documents
- Download specific documents directly to the user’s device
- Delete documents when no longer needed
- Simple and clean UI with React

---

## 🏗 Architecture Overview

```
       ┌─────────────────┐
       │   Frontend      │
       │  (React + Vite) │
       └─────────────────┘
                │
                │ REST API requests (GET, POST, DELETE)
                ▼
       ┌─────────────────┐
       │   Backend       │
       │  (Node.js +     │
       │   Express.js)   │
       └─────────────────┘
         │             │
         │ Metadata    │ File storage
         ▼             ▼
   ┌─────────────┐  ┌───────────────┐
   │  SQLite DB  │  │ Local uploads/│
   │(document    │  │  folder       │
   │ metadata)   │  │ (PDF files)   │
   └─────────────┘  └───────────────┘

```

**Flow:**

1. Frontend sends API requests to backend.
2. Backend stores files in `uploads/` and metadata in SQLite.
3. Frontend fetches metadata to display document list.
4. Users can download or delete documents directly.

---

## 📌 API Specification

| Endpoint            | Method | Description                  |
| ------------------- | ------ | ---------------------------- |
| `/documents/upload` | POST   | Upload a PDF document        |
| `/documents`        | GET    | List all uploaded documents  |
| `/documents/:id`    | GET    | Download a specific document |
| `/documents/:id`    | DELETE | Delete a specific document   |

### Sample Request for Upload (Form Data)

- Field: `file`
- File Type: PDF
- Max Size: 10 MB

### Sample Response for Upload

```json
{
  "message": "Document uploaded successfully!",
  "document": {
    "id": 65,
    "filename": "Resume-2.pdf",
    "filepath": "uploads/file-1765373477992.pdf",
    "filesize": 80131
  }
}
```

---

## ⚙️ Local Setup

### Backend

```
cd backend
npm install
npm start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 📂 Folder Structure

```
Patient-Document-Portal/
├── backend/
│   ├── controller/
│   │   └── document.js
│   ├── database/
│   │   └── connect.js
│   ├── middleware/
│   │   └── document-upload.js
│   ├── routes/
│   │   └── document.js
│   ├── uploads/          # Created at runtime, stores uploaded PDFs
│   ├── .gitignore
│   ├── app.js
│   ├── document.db       # SQLite database
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── get-documents.jsx
│   │   │   └── upload-document.jsx
│   │   ├── pages/
│   │   │   └── dashboard.jsx
│   │   ├── services/
│   │   │   └── document.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── design.md
└── README.md

```

### uploads/ folder is empty in repo; it is created automatically during runtime.

---

## ⚠️ Assumptions

- Only PDF files are allowed for upload.

- Maximum file size: 10 MB per document.

- Multiple users can upload/download simultaneously (moderate traffic assumed).

- All files are publicly accessible; no authentication implemented.

- Metadata stored in SQLite database (id, filename, filepath, filesize, created_at).

---

## 🔧 Notes

- Node modules are ignored via .gitignore

- Database and uploads folder are not included in the repo

- Tested locally on Windows 11, Node.js 20+, React 18

---

## 📄 Author

**Vivek** – Full Stack Developer Intern Assessment
