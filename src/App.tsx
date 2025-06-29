import "./App.css";
import Timer from "./Timer";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app flex items-center justify-center h-screen text-center">
        <Timer />
      </div>
    </BrowserRouter>
  );
}
