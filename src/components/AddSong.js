import React from 'react';
import { Link, AddBoxOutlined } from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  makeStyles,
} from '@material-ui/core';
import ReactPlayer from 'react-player';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  urlInput: {
    margin: theme.spacing(1),
  },
  addSongButton: {
    margin: theme.spacing(1),
  },
  dialog: {
    textAlign: 'center',
  },
  thumbnail: {
    width: '90%',
  },
}));

const DEFAULT_SONG_INFO = { duration: 0, title: '', artist: '', thumbnail: '' };

const AddSong = () => {
  const classes = useStyles();
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [url, setUrl] = React.useState('');
  const [playable, setPlayable] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [song, setSong] = React.useState(DEFAULT_SONG_INFO);

  // To check if the url can be played or not
  React.useEffect(() => {
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  function handleChangeSongInfo(event) {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }

  function handleCloseDialog() {
    setDialog(false);
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  }

  async function handleAddSong() {
    try {
      const { url, thumbnail, duration, title, artist } = song;

      await addSong({
        variables: {
          url: url.length > 0 ? url : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          duration: duration > 0 ? duration : null,
          title: title.length > 0 ? title : null,
          artist: artist.length > 0 ? artist : null,
        },
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG_INFO);
      setUrl('');
    } catch (error) {
      console.log('Error adding song', error);
    }
  }

  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  }

  function getSoundCloudInfo(player) {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnial: songData.artwork_url.replace('-large', '-t500x500'),
          });
        }
      });
    });
  }

  function handleSongInputError(field) {
    return error?.graphQLErrors[0]?.extensions?.path?.includes(field);
  }

  const { title, artist, thumbnail } = song;

  return (
    <div className={classes.container}>
      <Dialog
        open={dialog}
        onClose={handleCloseDialog}
        className={classes.dialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img src={thumbnail} alt="thumbnail" className={classes.thumbnail} />
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={title}
            onChange={handleChangeSongInfo}
            error={handleSongInputError('title')}
            helperText={handleSongInputError('title') && 'Fill out title field'}
          />
          <TextField
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            value={artist}
            onChange={handleChangeSongInfo}
            error={handleSongInputError('artist')}
            helperText={
              handleSongInputError('artist') && 'Fill out artist field'
            }
          />
          <TextField
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            value={thumbnail}
            fullWidth
            onChange={handleChangeSongInfo}
            error={handleSongInputError('thumbnail')}
            helperText={
              handleSongInputError('thumbnail') && 'Fill out thumbnail field'
            }
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button color="primary" variant="outlined" onClick={handleAddSong}>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        placeholder="Add Youtube or Soundcloud URL"
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!playable}
        className={classes.addSongButton}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
        onClick={() => setDialog(true)}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden={true} onReady={handleEditSong} />
    </div>
  );
};

export default AddSong;
