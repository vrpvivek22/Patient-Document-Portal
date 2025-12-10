import { useEffect } from "react";
import { useState } from "react";
import {
  deleteDocumentApi,
  downloadDocumentApi,
  getAllDocumentsApi,
} from "../services/documents";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function GetDocuments() {
  const [documents, setDocuments] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await getAllDocumentsApi();
        setDocuments(res);
      } catch (error) {
        console.log(error);

        if (err?.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Failed to fetch documents");
        }
      }
    }
    load();
  }, []);

  async function handleDownload(id, filename) {
    try {
      const blob = await downloadDocumentApi(id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);

      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to download PDF file");
      }
    }
  }

  async function handleDelete(id) {
    try {
      const res = await deleteDocumentApi(id);
      setDocuments((prev) => prev.filter((b) => b.id !== id));
      setOpenModal(false);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to delete the file");
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-15 py-6">
      {documents.length > 0 ? (
        <table className="w-full border-separate border-spacing-y-4 ">
          <thead className="bg-blue-500 text-center shadow-md text-lg text-white font-semibold h-14">
            <tr className=" rounded-lg">
              <td className="rounded-l-lg px-1">No.</td>
              <td>File Name</td>
              <td>Size</td>
              <td>Uploaded</td>
              <td className="rounded-r-lg">Actions</td>
            </tr>
          </thead>
          <tbody>
            {documents.map((d, index) => (
              <tr
                key={d.id}
                className="text-center bg-white rounded-lg shadow-md"
              >
                <td className="rounded-l-lg">{index + 1}</td>
                <td className="truncate max-w-[120px] px-2">{d.filename}</td>
                <td>
                  {d.filesize < 1024
                    ? d.filesize + " B"
                    : d.filesize < 1024 * 1024
                    ? (d.filesize / 1024).toFixed(1) + " KB"
                    : (d.filesize / (1024 * 1024)).toFixed(1) + " MB"}
                </td>
                <td>{new Date(d.created_at).toLocaleDateString()}</td>
                <td className="space-x-5 w-72 rounded-r-lg py-3 px-2">
                  {" "}
                  <button
                    onClick={() => handleDownload(d.id, d.filename)}
                    className=" text-gray-500 rounded-md font-semibold hover:text-gray-600 cursor-pointer"
                  >
                    <span className="flex flex-row items-center gap-2">
                      <FiDownload />
                      Download
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="px-2 text-red-600 rounded-md font-semibold hover:text-red-700 cursor-pointer"
                  >
                    <span className="flex flex-row items-center gap-2">
                      <FiTrash2 />
                      Delete
                    </span>
                  </button>
                </td>
                {openModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-500">
                    <div className="bg-white dark:bg-gray-800 p-6 space-y-8 rounded-lg w-sm text-center">
                      <p className="text-gray-600 font-semibold dark:text-gray-300">
                        Are you sure you want to delete this Document?
                      </p>

                      <div className="flex justify-center gap-6">
                        <button
                          onClick={() => setOpenModal(false)}
                          className="px-8 py-2 rounded bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-500 hover:text-white hover:dark:bg-gray-500 "
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => handleDelete(d.id)}
                          className="px-8 py-2 rounded bg-red-500 hover:bg-red-600 cursor-pointer text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex w-full h-[70vh] justify-center items-center">
          <p className="text-center text-gray-500 text-2xl font-semibold">
            No documents uploaded yet
          </p>
        </div>
      )}
    </div>
  );
}
