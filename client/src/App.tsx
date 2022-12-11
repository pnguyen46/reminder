import { Routes, Route } from "react-router-dom"
import './App.css';

//Pages
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
