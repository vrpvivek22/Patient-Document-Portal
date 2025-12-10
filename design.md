# 1. Tech Stack Choices

## Q1. What frontend framework did you use and why?

### I used React.js for the frontend because:

- It provides fast, component-based UI development.

- React integrates well with REST APIs.

- It allows building responsive dashboards quickly using Tailwind CSS.

- React was ideal for building a clean, interactive interface for uploading and managing documents.

---

## Q2. What backend framework did you choose and why?

### I used Node.js with Express.js for the backend because:

- Express is lightweight, fast, and easy to structure.

- Works extremely well with REST APIs.

- Handles file uploads efficiently using middleware like multer.

- Express was the best fit for creating simple CRUD endpoints for documents.

---

## Q3. What database did you choose and why?

### I chose SQLite / SQLite3 because:

- Lightweight & zero-configuration — it doesn't need a separate database server.

- Perfect for small to medium applications, assessments, prototypes, or single-user systems.

- File-based storage — the entire database is stored in a single .sqlite file, making it portable.

- Fast performance for simple CRUD operations like saving document metadata.

- Great for offline development or deployments where full databases like PostgreSQL/MySQL are unnecessary.

---

## Q4. If you were to support 1,000 users, what changes would you consider?

### To handle around 1,000 users, I would make a few upgrades:

- Switch to a stronger database like MongoDB or PostgreSQL for better performance.

- Use cloud storage (S3 or Cloudinary) to store files safely and handle more uploads.

- Add a load balancer so the backend can manage more traffic smoothly.

- Use caching (like Redis) to speed up repeated requests.

- Improve security with rate limiting and proper authentication (JWT).

---

# 2. Architecture Flow

### 1. Frontend (React)

- User uploads a file via the form.

- Sends a request to backend using the REST API.

### 2. Backend (Node.js / Express)

- Receives the request from frontend.

- Validates file.

- Saves PDF to file storage.

- Saves metadata ( id , filename , filepath , filesize , createdAt ) in the database.

- Sends success response back to frontend.

### 3. Database (SQLite)

- Stores document metadata only ( id , filename , filepath , filesize , createdAt ).

- Does NOT store the actual PDF.

### 4. File Storage (Local folder)

- Stores the actual PDF files.

---

# 3. API Specification

## 1. Upload Document

**URL :** /documents/upload

**Method :** POST

**Sample Request :** Form Data - Resume-2.pdf

**Sample Response :**

{

    "message": "Document uploaded successfully!",
    "document": {
        "id": 65,
        "filename": "Resume-2.pdf",
        "filepath": "uploads\\file-1765373477992.pdf",
        "filesize": 80131
    }

}

**Description :** Upload a PDF document to the server.

---

## 2. List All Documents

**URL :** /documents

**Method :** GET

**Sample Request :** No body required

**Sample Response :**  
 {

    {
        "id": 56,
        "filename": "Resume.pdf",
        "filepath": "uploads\\file-1765353164162.pdf",
        "filesize": 860220,
        "created_at": "2025-12-10 07:52:44"
    },
    {
        "id": 57,
        "filename": "Document.pdf",
        "filepath": "uploads\\file-1765353346042.pdf",
        "filesize": 181961,
        "created_at": "2025-12-10 07:55:46"
    },
    {
        "id": 58,
        "filename": "Details.pdf",
        "filepath": "uploads\\file-1765353876104.pdf",
        "filesize": 860220,
        "created_at": "2025-12-10 08:04:36"
    },

}

**Description :** Fetch and return a list of all uploaded documents from the server.

---

## 3. Download a File

**URL :** /documents/ : id

**Method :** GET

**Sample Request :** Send the document ID in the URL. No request body required.

**Sample Response :** The file is downloaded directly to the user's device , no JSON body is returned.

**Description :** Download a specific document by its ID. The endpoint sends the file as the response, triggering a download on the client side.

---

## 4. Delete a File

**URL :** /documents/ : id

**Method :** DELETE

**Sample Request :** Send the document ID in the URL. No request body required.

**Sample Response :**

{

    "message": "Document deleted successfully!"

}

**Description :** Delete the document from the server and remove its record from the database.

---

## End points

| Endpoint          | Method | Description        |
| ----------------- | ------ | ------------------ |
| /documents/upload | POST   | Upload a PDF       |
| /documents        | GET    | List all documents |
| /documents/:id    | GET    | Download a file    |
| /documents/:id    | DELETE | Delete a file      |

---

# 4. Data Flow Description

## Q5. Step-by-step process for File Upload

### Upload Process :

1. User selects a PDF file in the frontend.

2. React sends the file to backend using a POST request (multipart/form-data).

3. Backend receives file using Multer and stores it locally (e.g., in an uploads/ folder).
4. Backend stores metadata in a SQLite database using the sqlite3 driver via the sqlite wrapper ( id , filename , filepath , filesize , createdAt )
5. Backend returns a success response to frontend.
6. Frontend refreshes the document list to show the newly uploaded file.

### Download Process :

1.  User clicks the “Download” button for a specific file on the frontend.

2.  React sends a GET request to the backend with the file ID (via downloadDocumentApi(id)).

3.  Backend retrieves the file metadata from the SQLite database.

4.  Backend locates the actual file in the uploads/ folder and sends it as a binary response.

5.  Frontend receives the file as a blob.

6.  Frontend triggers the browser to download the file using JavaScript:

        Creates a URL with window.URL.createObjectURL(blob)

        Creates an <a> element with the download attribute

        Programmatically clicks the link to start download

        Removes the temporary link

7.  User’s browser downloads the PDF to their local device.

---

# 5. Assumptions

## Q6. While building this document portal, the following assumptions I made

**File Size Limit :**

- Maximum file size is 10 MB per document to prevent very large uploads.

**Concurrency :**

- Multiple users can upload and download documents simultaneously.
- No strict rate limiting is implemented, assuming moderate local usage.

**Storage :**

- Documents are stored on the server in an uploads/ folder, with unique filenames to avoid conflicts.
- Metadata ( id , filename , filepath , filesize , createdAt ) is stored in the database.

**Error Handling :**

- Users are notified if they upload a file exceeding the size limit or an invalid file type.

**File Access :**

- All uploaded files are publicly accessible; no authentication or authorization is implemented
