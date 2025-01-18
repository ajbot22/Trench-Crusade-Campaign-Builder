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
    { id: 1, name: "Attrition", description: "Gain VP equal to slain unit value/100 (counting 1gp as 30 ducats) and an additional +1 per unit" },

    { id: 2, name: "Take & Hold", description: `Each player adds 1d4-1 objective markers to the board which must be placed 8in away from another and 8 in away from the edge.  
      When the game ends, earn 1vp per objective with more of your units inside than opponents and the winner is the player with the most objectives`},

    { id: 3, name: "Sabotage", description: `Each player adds 1d4-1 objective markers to the board which must be placed 8in away from another and 8 in away from the edge. 
      Then players roll to decide attacker/defenders. Attackers can place a charge on an objective with a melee attack that ends activation.
      If the planter moves 3in from the objective, the charge detonates giving an injury roll to any units in the objective.
      If the planter is taken out of action, the charge fizzles out.
      The winner is the player with the most destroyed objectives or the defender who has a score of the total objectives remaining.
      Each player also gains 1vp per objective kept/lost.`, restrictions: "Infiltrators must be deployed as normal troops in this scenario." },

    { id: 4, name: "Over the Top", description: `All players place/designate 4 8in trench sections atleast 3in from another trench. Players earn 1vp per friendly trench with no enemies and 1vp per enemy trench held.
      The winner is the player who collected the most VP this way.` , restrictions: "Chance encounter deployment cannot be used as the deployment type for this scenario."}, 

    { id: 5, name: "Breakthrough", description: "Each player selects an edge for their opponent to escape from. gain VP equal to escaped unit value/100 (counting 1gp as 30 ducats) and +1 per unit, the highest scorer wins"},

    { id: 6, name: "Retrieve", description: `The table center has an objective marker acting as a relic. A unit which ends its turn touching the marker is carrying the relic and cannot dash or use special movement.
      The relic can be passed to another unit within 1in at the end of activation. If the carrying unit is taken out of action, the relic is thrown 1d6in in a direction of their choice.
      If a unit holding the relic moves to the table edge, that player wins gaining double the normal VP for this win.`, restrictions: "Infiltrators must be deployed as normal troops in this scenario."},
  ]);
  
  const [gloryPoints, setGloryPoints] = useState([
    { id: 1,  description: "Take atleast 3 enemy models out of action with your actions" },
    { id: 2,  description: "Take an enemy unit out of action from long range while they are in cover. This excludes weapons which automatically hit and grenades and Blast weapons" },
    { id: 3,  description: "Inflict 6 blood markers on an enemy unit" },
    { id: 4,  description: "Retreat from melee and hit the unit you retreated from with a ranged attack" },
    { id: 5,  description: "Expend 2 blood markers on a foe to decrease their dice by 2" },
    { id: 6,  description: "Take two enemies out of combat with ranged attacks on one activation" },
    { id: 7,  description: "Succeed in 2 risky actions on one activation with a single model" },
    { id: 8,  description: "Retreat from melee combat twice with one unit in a match" },
    { id: 9,  description: "Take two enemies out of combat with ranged attacks on one activation" },
    { id: 10,  description: "Successfully charge an enemy you cannot see" },
    { id: 11,  description: "Make an enemy unit take an injury marker from falling due to your action" },
    { id: 12,  description: "Retreat from melee combat from a foe who is downed" },

  ]);
  
  const [maps, setMaps] = useState([
    { id: 1, name: "City Ruins"},
    { id: 2, name: "TC 2x4 Reupload"},
    { id: 3, name: "Calm Before the Storm"},
    { id: 4, name: "Road Passing"},
    { id: 5, name: "Claim no mans land"},
    { id: 6, name: "House of Horrors"},
    { id: 7, name: "Blizzard at Ultima"},
    { id: 8, name: "Burning Trenches"},
    { id: 9, name: "Urban Brawl"},
    { id: 10, name: "Forest Road"},
    { id: 11, name: "Large City Map"},
    { id: 12, name: "Jungle Temple"},
    { id: 13, name: "Arabian Village"},
    { id: 14, name: "City in Winter"},
    { id: 15, name: "Vokrat"},
    { id: 16, name: "Viridis"},
    { id: 17, name: "Egyptian Museum"},
    { id: 18, name: "Hacir Nohe"},
    { id: 19, name: "Volcanic Cavern"},
    { id: 20, name: "The Pit"},
    { id: 21, name: "Heretic Shores"},
    { id: 22, name: "Udvin"},
    { id: 23, name: "Offshore"},
    { id: 24, name: "City at war"},
    { id: 25, name: "Container Ship"},
    { id: 26, name: "Rocky Coast"},
    { id: 27, name: "Normandy Landing"},
    { id: 28, name: "Foxhole Logistics Port"},
    { id: 29, name: "Glacier Fort"},
    { id: 30, name: "River and Castle"},
  ]);

  const [deploymentTypes, setDeploymentTypes] = useState([
    { id: 1, name: "Chance Encounter", description: "Players roll to decide who picks a table edge. Both warbands are deployed in halves at the edges, the rest of the warband appears on the second turn"},
    { id: 2, name: "Standard Deployment", description: "Players roll to decide who picks a table edge. Both warbands are deployed in full in their deployment zones (24in or 1/5 of the map area, whichever is lower)"},
    { id: 3, name: "Flank Attack", description: "Players roll to decide who picks a table corner. Both warbands are deployed in full in a quadrant of the board with a 6in gap between the corners of each quadrant acting as non-depoyable zones"},
    { id: 4, name: "Long Distance", description: "Players roll to decide who picks a table corner. Both warbands are deployed in full in a 12in triangle area from the corner"},
    { id: 5, name: "Tunnels", description: "Players place a tunnel marker anywhere further than 6in from the table's center. Half of hte warband is deployed as standard, the rest enters somewhere 6in from the tunnel marker but cannot dash on their first turn and cannot enter in melee combat", restrictions: "Infiltrators must be deployed as normal troops in this scenario"},
    { id: 6, name: "Fog of War", description: "Players deploy half their warband in standard style, for the other half, each activated unit you roll a d6. 1-4 correspond to the NESW edges of the table, 5 your opponent decides and 6 you decide", restrictions: "Models cannot be deployed directly into melee combat" },
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
