import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

const App = () => {

  const [players, setPlayers] = useState([""]); // Initialize with one empty player
  const [games, setGames] = useState(12); // Number of games
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Asymetric"); // Default algorithm
  const [algorithmDescription, setAlgorithmDescription] = useState(
    "Games with even player counts will default to random selection, ensuring each player fights one another as evenly as possible."
  );
  
  const algorithms = {
    "Asymetric": "Battle generation will allow battles between players with different field strength; but, it will prioritize close matchups.",
    "Three Way Fight": "Three way battles will be added to each cycle to avoid field strength disparity.",
    "Collective Rank Up": "Players do not gain field strength per battle fought, instead all players fight each other player and then all players collectively gain field strength.",
    "By Round": "One player each cycle is not assigned a fight.",
    "Third Party Battle": "One player each cycle is assigned a third party battle. This battle is conducted with a player in or outside of the campaign with a warband no higher than your current threshold value.",
  };

  const addPlayer = () => {
    setPlayers([...players, ""]);
  };

  // Handler to update player input
  const updatePlayer = (index, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  // Handler for dropdown selection
  const handleAlgorithmChange = (event) => {
    const selected = event.target.value;
    setSelectedAlgorithm(selected);
    setAlgorithmDescription(algorithms[selected]);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="upper-half">
          {/* Wrap players list and game settings in a flex container */}
          <div className="upper-flex-container">
            {/* Left Section: Player Input */}
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

            {/* Right Section: Game Settings */}
            <div className="game-settings-container">
              <h2>Game Settings</h2>

              {/* Number of Games */}
              <label htmlFor="games-input">Number of Games:</label>
              <input
                id="games-input"
                type="number"
                min="1"
                value={games}
                onChange={(e) => setGames(Number(e.target.value))}
              />

              {/* Odd Number Algorithm Dropdown */}
              <label htmlFor="algorithm-dropdown">Odd Number Algorithm:</label>
              <select
                id="algorithm-dropdown"
                value={selectedAlgorithm}
                onChange={handleAlgorithmChange}
              >
                {Object.keys(algorithms).map((algorithm, index) => (
                  <option key={index} value={algorithm}>
                    {algorithm}
                  </option>
                ))}
              </select>

              {/* Algorithm Description */}
              <div className="algorithm-description">
                <h3>Algorithm Description</h3>
                <p>{algorithmDescription}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="lower-half">
          <p>Placeholder for lower half content</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};


export default App
