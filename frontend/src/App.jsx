import { Toaster } from "react-hot-toast";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1000,
          style: {
            animation: "toast-slide-left 0.3s ease",
          },
        }}
      />
      <Dashboard />
    </>
  );
}

export default App;
