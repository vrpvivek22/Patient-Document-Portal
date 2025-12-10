import { useState } from "react";
import UploadDocumentApi from "../services/documents";
import toast from "react-hot-toast";

export default function UploadDocument() {
  const [document, setDocument] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (document) {
      try {
        const formData = new FormData();
        formData.append("file", document);

        const res = await UploadDocumentApi(formData);
        setDocument(res);
        toast.success(res.message);
        setDocument(null);
      } catch (err) {
        console.error(err);
        if (err?.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Failed to upload PDF file");
        }
      }
    }
  }

  return (
    <div className="flex flex-col justify-center h-full items-center">
      {!document && (
        <p className="text-2xl text-gray-600 font-semibold mb-8">
          Choose a File below to Upload
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white/50 shadow-lg border-4 items-center border-amber-700 rounded-xl px-6 py-6"
      >
        {!document && (
          <div className="text-center">
            <p className="text-gray-600 text-lg pb-8">No file chosen</p>
            <input
              id="pdfInput"
              className="hidden"
              type="file"
              accept="application/pdf"
              onChange={(e) => setDocument(e.target.files[0])}
            />

            <label
              htmlFor="pdfInput"
              className="px-35 py-3 bg-blue-600 font-semibold hover:bg-blue-500 text-white rounded cursor-pointer text-center"
            >
              Choose File
            </label>
          </div>
        )}
        {document && (
          <>
            <div className=" space-y-4 flex flex-col rounded text-center">
              <p className="text-gray-800 py-6 px-2 text-xl font-semibold">
                {document.name}
              </p>
              <button
                type="submit"
                className="px-35 py-3 bg-green-600 hover:bg-green-500 text-white rounded font-semibold"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setDocument(null)}
                className="px-35 py-3 bg-red-600 hover:bg-red-500 cursor-pointer z-20 text-white rounded font-semibold"
              >
                Remove
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
