import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import PodcastDetails from "./components/PodcastDetails";
import EpisodeDetails from "./components/EpisodeDetails";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetails />}>
          <Route path="episode/:episodeId" element={<EpisodeDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
