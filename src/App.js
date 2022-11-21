import React from "react";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import songReducer from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: "7f4a522a-05a9-424b-94dd-a4223b8c4c65",
    title: "F.I.A - 충만 (피아버전) | Filled (FIA.ver)",
    artist: "FIA",
    thumbnail: "http://img.youtube.com/vi/rMflpTyb97U/0.jpg",
    url: "https://www.youtube.com/watch?v=rMflpTyb97U&list=RDrMflpTyb97U&start_radio=1",
    duration: 251,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = React.useContext(SongContext);
  const [state, dispatch] = React.useReducer(songReducer, initialSongState);
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={2}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? { position: "fixed", width: "100%", right: 0, top: 70 }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
