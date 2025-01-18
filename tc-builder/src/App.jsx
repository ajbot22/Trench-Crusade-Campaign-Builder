import React, { useState } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([""]); // Initialize with one empty player

  // Handler to add a new player input field
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
      <header className="header">
        <h1>Trench Crusade Campaign Builder</h1>
        <p>
          <a href="https://github.com/your-repo-link">GitHub Repo</a> | ajbotcs@gmail.com
        </p>
      </header>

      <main className="main-content">
        <div className="upper-half">
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
        </div>
        <div className="lower-half">Lower Content</div>
      </main>

      <footer className="footer">
        <button className="generate-button">Generate Campaign</button>
      </footer>
    </div>
  );
}

export default App;
