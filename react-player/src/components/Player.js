import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStepForward,
  faStepBackward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  songs,
  setSongs,
}) => {
  useEffect(() => {
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === currentSong.id,
        }
      })
    )
    
  }, [currentSong]);
  
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
      console.log("now playing")
    }
  };

  const iOSPlayback = () => {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      playPromise.then((audio) => {
        audioRef.current.play();
      });
    }
  }

  //States
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  

  function skip(direction) {
    // -1 or 1
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) {
      newIndex = songs.length - 1;
      
    } else if (newIndex >= songs.length) {
      newIndex = 0;
    }
    setCurrentSong(songs[newIndex]);

  }


  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faStepBackward}
          onClick={() => {skip(-1); iOSPlayback()}}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faStepForward}
          onClick={() => {skip(1); iOSPlayback()}}
        />
      </div>
      <audio
        onLoadedData={autoPlayHandler}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </div>
  );
};

export default Player;
