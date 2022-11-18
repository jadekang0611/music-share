import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";

function App() {
  return (
    <div className="App">
      <Header />
      <AddSong />
      <SongList />
      <SongPlayer />
    </div>
  );
}

export default App;
