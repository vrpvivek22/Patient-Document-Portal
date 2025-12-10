import fs from "fs";
import path from "path";

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const originalName = req.file.originalname;
    const savedName = req.file.filename;
    const filepath = req.file.path;
    const filesize = req.file.size;

    const result = await global.db.run(
      `INSERT INTO documents (filename, filepath, filesize) VALUES (?, ?, ?)`,
      [originalName, filepath, filesize]
    );

    res.status(201).json({
      message: "Document uploaded successfully!",
      document: {
        id: result.lastID,
        filename: originalName,
        filepath: filepath,
        filesize: filesize,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upload failed" });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const documents = await global.db.all(
      `SELECT * FROM documents ORDER BY created_at ASC`
    );

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await global.db.get(
      `SELECT * FROM documents WHERE id = ?`,
      [id]
    );

    if (!document) return res.status(404).json({ error: "Document not found" });

    const filePath = path.resolve(document.filepath);
    if (!fs.existsSync(filePath))
      return res.status(404).json({ error: "File not found" });

    res.download(filePath, document.filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download document" });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await global.db.get(
      `SELECT * FROM documents WHERE id = ?`,
      [id]
    );

    if (!document) return res.status(404).json({ error: "Document not found" });

    const filePath = path.resolve(document.filepath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await global.db.run(`DELETE FROM documents WHERE id = ?`, [id]);

    res.json({ message: "Document deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete document" });
  }
};
