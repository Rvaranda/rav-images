import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Showcase from "./pages/Showcase";
import Create from "./pages/Create";

// <div className="grid grid-cols-4 place-content-center gap-4">

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Showcase />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
