import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";

function App() {
  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <div className="App">
      <>
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
      </>
    </div>
  );
}

export default App;
