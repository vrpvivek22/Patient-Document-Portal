import { useEffect, useState } from "react";
import UploadDocument from "../components/upload-docment";
import GetDocuments from "../components/get-documents";
import { MdDescription } from "react-icons/md";

export function Dashboard() {
  const [active, setActive] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHide(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {hide ? (
        <div className=" bg-gradient-to-br from-indigo-100 to-blue-100 min-h-screen flex flex-col">
          <header className="bg-gradient-to-t shadow-xl z-50 from-indigo-800 to-blue-700 text-center ">
            <h1 className="text-4xl text-white p-8 justify-center gap-3 flex flex-row items-center font-semibold">
              <MdDescription className="text-5xl" />
              Patient Document Portal
            </h1>
          </header>
          <div className="flex flex-row flex-1">
            <div className="bg-gradient-to-b from-blue-300 to-indigo-300 border-r border-indigo-300 w-xs p-8 flex flex-col space-y-4">
              <button
                type="button"
                className={`px-6 py-2  rounded-sm font-semibold ${
                  active
                    ? "bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-700 border-2  border-blue-500"
                    : " bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg cursor-pointer"
                }`}
                onClick={() => setActive(true)}
              >
                Upload Documents
              </button>
              <button
                type="button"
                className={`px-6 py-2  rounded-sm font-semibold ${
                  active
                    ? " bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg cursor-pointer"
                    : "bg-gradient-to-r from-indigo-100 to-blue-100 text-blue-700 border-2 border-blue-500"
                }`}
                onClick={() => setActive(false)}
              >
                View Documents
              </button>
            </div>
            <div className="w-full shadow-[inset_2px_0_8px_rgba(0,0,0,0.1)] shadow-gray-500">
              {active ? <UploadDocument /> : <GetDocuments />}
            </div>
          </div>
          <footer className="bg-gray-800 text-gray-200 p-4 text-center">
            &copy; 2025 Patient Document Portal
          </footer>
        </div>
      ) : (
        <div
          className={`flex flex-col min-h-screen justify-center pb-15 items-center bg-gradient-to-b from-indigo-700 to-blue-600 text-white transition-opacity duration-700
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <p className="text-7xl font-bold py-6"> Patient Document Portal</p>
          <p className="text-lg font-semibold">
            Securely upload, view, and manage all your medical documents in one
            place.
          </p>
        </div>
      )}
    </>
  );
}
