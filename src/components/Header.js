import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import AlbumIcon from "@material-ui/icons/Album";

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <AlbumIcon />
        <Typography variant="h6" component="h1" className={classes.title}>
          JK Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
