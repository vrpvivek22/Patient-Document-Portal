import express from "express";
const router = express.Router();
import documentUploadMiddleware from "../middleware/document-upload.js";
import {
  uploadDocument,
  getAllDocuments,
  downloadDocument,
  deleteDocument,
} from "../controller/document.js";

router.post("/upload", documentUploadMiddleware.single("file"), uploadDocument);
router.get("/", getAllDocuments);
router.route("/:id").get(downloadDocument).delete(deleteDocument);

export default router;
