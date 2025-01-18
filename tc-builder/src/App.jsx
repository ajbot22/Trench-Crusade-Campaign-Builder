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
  const [specialRules, setSpecialRules] = useState("");

  const [objectives, setObjectives] = useState([
    { id: 1, name: "Objective 1", description: "Default description", restrictions: "None" },
    { id: 2, name: "Objective 2", description: "Another description", restrictions: "Some restrictions" },
  ]);
  
  const [gloryPoints, setGloryPoints] = useState([
    { id: 1, name: "Glory Point 1", description: "Default description" },
    { id: 2, name: "Glory Point 2", description: "Another description" },
  ]);
  
  const [maps, setMaps] = useState([
    { id: 1, name: "Map 1", description: "Default description", restrictions: "None" },
    { id: 2, name: "Map 2", description: "Another description", restrictions: "Some restrictions" },
  ]);

  const [deploymentTypes, setDeploymentTypes] = useState([
    { id: 1, name: "Deployment 1", description: "Default deployment", restrictions: "None" },
    { id: 2, name: "Deployment 2", description: "Another deployment", restrictions: "Some restrictions" },
  ]);
  
  
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState("");
  const [newEntry, setNewEntry] = useState({ name: "", description: "", restrictions: "" });
  
  const openPopup = (table) => {
    setCurrentTable(table);
    setPopupOpen(true);
  };
  
  const closePopup = () => {
    setPopupOpen(false);
    setNewEntry({ name: "", description: "", restrictions: "" });
  };
  
  const addEntry = () => {
    const id = Date.now();
    const entry = { id, ...newEntry };
  
    if (currentTable === "Objectives") {
      setObjectives([...objectives, entry]);
    } else if (currentTable === "Glory Points") {
      setGloryPoints([...gloryPoints, entry]);
    } else if (currentTable === "Maps") {
      setMaps([...maps, entry]);
    } else if (currentTable === "Deployment Type"){
      setDeploymentTypes([...deploymentTypes, entry]);
    }
    
  
    closePopup();
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
        {/* Flex Container for Upper Section */}
        <div className="upper-flex-container">
          {/* Left Section: Player Input + Rules */}
          <div className="player-section">
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

            {/* Rules Box */}
            <div className="rules-container">
              <label htmlFor="rules-box">Special Rules:</label>
              <textarea
                id="rules-box"
                className="rules-box"
                value={specialRules}
                onChange={(e) => setSpecialRules(e.target.value)}
                placeholder="Write any special rules for the game here..."
              ></textarea>
            </div>
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



        <div className="bottom-half">
  <div className="bottom-grid-container">
    {/* Objectives Table */}
    <div className="table-container">
      <h2>Objectives</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Restrictions</th>
          </tr>
        </thead>
        <tbody>
          {objectives.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.description}</td>
              <td>{entry.restrictions || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openPopup("Objectives")}>Add Entry</button>
    </div>

    {/* Glory Points Table */}
    <div className="table-container">
      <h2>Glory Points</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {gloryPoints.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openPopup("Glory Points")}>Add Entry</button>
    </div>

    {/* Maps Table */}
    <div className="table-container">
      <h2>Maps</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Restrictions</th>
          </tr>
        </thead>
        <tbody>
          {maps.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.description}</td>
              <td>{entry.restrictions || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openPopup("Maps")}>Add Entry</button>
    </div>

    {/* Deployment Type Table */}
    <div className="table-container">
      <h2>Deployment Type</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Restrictions</th>
          </tr>
        </thead>
        <tbody>
          {deploymentTypes.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.description}</td>
              <td>{entry.restrictions || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => openPopup("Deployment Type")}>Add Entry</button>
    </div>
  </div>

  {/* Popup for Adding Entries */}
  {popupOpen && (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Add Entry to {currentTable}</h3>
        <label>Name:</label>
        <input type="text" value={newEntry.name} onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })} />
        <label>Description:</label>
        <textarea value={newEntry.description} onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}></textarea>
        {currentTable !== "Glory Points" && (
          <>
            <label>Restrictions:</label>
            <input type="text" value={newEntry.restrictions} onChange={(e) => setNewEntry({ ...newEntry, restrictions: e.target.value })} />
          </>
        )}
        <div className="popup-buttons">
          <button onClick={addEntry}>Save</button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</div>

      </main>
      <Footer />
    </div>
  );
};


export default App
