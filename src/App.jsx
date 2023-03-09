import "./App.css";
import React, { createContext, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Podcast from "./pages/Podcast";
import EpisodeDetails from "./components/EpisodeDetails";
import { Container } from "@mui/material";

export const AppContext = createContext();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [navigationLoading, setNavigationLoading] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setNavigationLoading(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  // navigationLoading state is to not return "false" if the navigation has been completed, but not the fetch and data load,
  // so the spinner on header still appearing
  useEffect(() => {
    if (navigationLoading) {
      setNavigationLoading(false);
    }
  }, [prevLoc]);

  return (
    <AppContext.Provider value={{ loading, navigationLoading, setLoading }}>
      <Container maxWidth="lg">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<Podcast />}>
            <Route path="episode/:episodeId" element={<EpisodeDetails />} />
          </Route>
        </Routes>
      </Container>
    </AppContext.Provider>
  );
};

export default App;
