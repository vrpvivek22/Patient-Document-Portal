import axios from "axios";

export default async function UploadDocumentApi(formData) {
  const response = await axios.post(
    "http://localhost:5000/api/v1/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getAllDocumentsApi() {
  const response = await axios.get("http://localhost:5000/api/v1/documents", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function downloadDocumentApi(id) {
  const response = await axios.get(
    `http://localhost:5000/api/v1/documents/${id}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
}

export async function deleteDocumentApi(id) {
  const response = await axios.delete(
    `http://localhost:5000/api/v1/documents/${id}`
  );

  return response.data;
}
