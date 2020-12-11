import React from "react";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  darkMode
}) => {
  const updatedSongs = () => {
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === song.id,
        };
      })
    );
  };

  const songSelectHandler = () => {
    setCurrentSong(song);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  };

  const handleTheme = () => {
return "selected"
  }

  return (
    <div
      className={`${darkMode ? "library-song-dark-mode":"library-song"} ${song.active && !darkMode ? "selected" : song.active && darkMode ? "dark-mode-selection":""}`}
      onClick={() => {
        songSelectHandler();
        updatedSongs();
      }}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
