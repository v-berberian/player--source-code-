import React, { useEffect, useRef } from "react";

import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from '@material-ui/icons/Close';

const Library = ({
  songs,
  setCurrentSong,
  setSongs,
  audioRef,
  isPlaying,
  libraryStatus,
  setLibraryStatus,
  darkMode,
  setDarkMode,
}) => {
  let libraryRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!libraryRef.current.contains(e.target)) {
        setLibraryStatus(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={libraryRef}
      className={`library ${libraryStatus ? "visible" : ""}  ${darkMode ? "dark-background": "light-background"} `}
    >
      <div className={`library-header ${darkMode ? "dark-background": "light-background"}`}>
        <h2>up next</h2>
        <CloseIcon
        className="close-window"
        onClick={() => setLibraryStatus(false)}/>
        {/* <FontAwesomeIcon
          className="close-window"
          size="2x"
          icon={faTimes}
          onClick={() => setLibraryStatus(false)}
        /> */}
        
      </div>

      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            song={song}
            key={song.id}
            setCurrentSong={setCurrentSong}
            songs={songs}
            audioRef={audioRef}
            isPlaying={isPlaying}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;

// return (
//   <Transition in={libraryStatus} timeout={300}>
//     {(state) => {
//       console.log(state);
//       return (
//         <div
//           className="library"
//           style={{
//             ...defaultStyle,
//             ...transitionStyles[state],
//           }}
//         >
//           <div className="library-header">
//             <h2>Library</h2>
//             <FontAwesomeIcon
//               className="close-window"
//               size="2x"
//               icon={faTimes}
//               onClick={() => setLibraryStatus(!libraryStatus)}
//             />
//           </div>

//           <div className="library-songs">
//             {songs.map((song) => (
//               <LibrarySong
//                 setSongs={setSongs}
//                 song={song}
//                 key={song.id}
//                 setCurrentSong={setCurrentSong}
//                 songs={songs}
//                 audioRef={audioRef}
//                 isPlaying={isPlaying}
//               />
//             ))}
//           </div>
//         </div>
//       );
//     }}
//   </Transition>
// );
// };
