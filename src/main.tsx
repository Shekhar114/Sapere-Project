import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";  // ✅ App import karo
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);