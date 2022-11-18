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
  let loading = false;

  const song = {
    title: "Bang Bang Bang",
    artist: "BIGBANG",
    thumbnail: "https://img.youtube.com/vi/2ips2mM7Zqw/sddefault.jpg",
  };
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

  return (
    <div>
      SongList
      {Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song song={song} />
      ))}
    </div>
  );
};

function Song({ song }) {
  const { title, artist, thumbnail } = song;
  const classes = useStyles();
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
            <IconButton size="small" color="primary">
              <PlayArrowIcon />
            </IconButton>
            <IconButton size="small" color="primary">
              <BookmarkIcon color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
