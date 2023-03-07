import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import PodcastDetail from "./components/PodcastDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
      </Routes>
    </div>
  );
}

export default App;
