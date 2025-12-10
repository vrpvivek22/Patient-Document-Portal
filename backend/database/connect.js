import sqlite3 from "sqlite3";
import { open } from "sqlite";

const connectDB = async () => {
  try {
    global.db = await open({
      filename: "./documents.db",
      driver: sqlite3.Database,
    });

    await global.db.exec(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        filepath TEXT NOT NULL,
        filesize INTEGER NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("SQLite database connected successfully.");
  } catch (error) {
    console.error("SQLite connection error:", error);
    throw error;
  }
};

export default connectDB;
