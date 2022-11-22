import {
  CircularProgress,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  makeStyles,
} from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { useMutation, useSubscription } from "@apollo/client";
import { GET_SONGS } from "../graphql/subscriptions";
import React from "react";
import { SongContext } from "../App";
import { Pause } from "@material-ui/icons";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
}));
const SongList = () => {
  const { loading, data, error } = useSubscription(GET_SONGS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    <div>Error fetching songs</div>;
  }

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
};

function Song({ song }) {
  const { id } = song;
  const { title, artist, thumbnail } = song;
  const classes = useStyles();
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);
  const { state, dispatch } = React.useContext(SongContext);
  const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false);

  React.useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

  function handleTogglePlay() {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  }

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleTogglePlay} size="small" color="primary">
              {currentSongPlaying ? <Pause /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size="small"
              color="primary"
            >
              <BookmarkIcon color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
