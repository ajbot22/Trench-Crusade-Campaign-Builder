import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

const App = () => {

  const [players, setPlayers] = useState([""]); // Initialize with one empty player

  const addPlayer = () => {
    setPlayers([...players, ""]);
  };

  // Handler to update player input
  const updatePlayer = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };


  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <section className="upper-half">
        <div className="player-list-container">
            <h2>Players</h2>
            <div className="player-list">
              {players.map((player, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Player ${index + 1}`}
                  value={player}
                  onChange={(e) => updatePlayer(index, e.target.value)}
                />
              ))}
            </div>
            <button className="add-player-button" onClick={addPlayer}>
              Add Player
            </button>
          </div>
          <div className="right-content">Right Content</div>
        </section>
        <section className="lower-half">
          <p>Placeholder for lower half content</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};


export default App
