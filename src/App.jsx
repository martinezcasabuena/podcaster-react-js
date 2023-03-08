import "./App.css";
import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import PodcastDetails from "./components/PodcastDetails";
import EpisodeDetails from "./components/EpisodeDetails";
import { Container } from "@mui/material";

export const AppContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetails />}>
            <Route path="episode/:episodeId" element={<EpisodeDetails />} />
          </Route>
        </Routes>
      </Container>
    </AppContext.Provider>
  );
};

export default App;
