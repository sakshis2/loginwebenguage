import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamesDetails from "./Components/GamesDetails";
import Home from "./Components/Home";
import Loginpage from "./login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game-details" element={<GamesDetails />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/" element={<GamesDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
