import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import Logo from '../assets/tkp-logo.png';

const Header = () => {
  return (
    <AppBar position='fixed' color='primary'>
      <Toolbar>
        {/* <AlbumIcon /> */}
        <img src={Logo} alt='tkp-logo' width='50px' />
        <Typography variant='h6' component='h1'>
          The K-Playlist
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
