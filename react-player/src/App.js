import React, { useState, useRef } from "react";

import "../src/styles/app.scss";

import Player from "./components/Player";
import Song from "./components/Song";
import chillHop from "./tracks";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [darkMode, setDarkMode] = useState(false)

  const audioRef = useRef(null);


  return (
    <div className={`App ${darkMode ? "dark-background": "light-background"}`}>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} setLibraryStatus={(libraryStatus, setLibraryStatus)} />
      <div className="main">
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      </div>
      <Library
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
      />
    </div>
  );
}

export default App;
