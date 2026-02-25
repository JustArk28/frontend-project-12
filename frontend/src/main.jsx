import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/style.css";
// import App from "./components/App.jsx";
import init from "./init";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

const app = async () => {
  createRoot(document.getElementById("root")).render(await <StrictMode>{init()}</StrictMode>)
};

app();
