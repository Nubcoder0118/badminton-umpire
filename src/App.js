
import "./App.css";
// import racketData from "./rackets.json";
import React, { useState } from "react";

function App() {
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);

    // const [mode, setMode] = useState("singles");

    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    function addTeamMembers(team, playerName){
      if (team === 'A') {
        setTeam1([...team1, playerName])
      } else {
        setTeam2([...team2, playerName])
      }
    }

    // function resetTeamMembers(team, playerName){
    //   setTeam1([]);
    //   setTeam2([]);
    // }

    function addPoint(team){
        if (team === 'A' && scoreA < 21) {
            setScoreA(scoreA + 1);
        } else if (team === 'B' && scoreB < 21) {
            setScoreB(scoreB + 1);
        }
    }

    function reset() {
        setScoreA(0);
        setScoreB(0);
    }
    return (
    <div>
      <h1 className = "title">Badminton Score Panel</h1>
      <div className = "teams">
        <h2 className = "team1">Team 1</h2>
        <button onClick={() => addTeamMembers("A", "player")}>Add player T1</button>
        <h2 className = "team2">Team 2</h2>
        <button onClick={() => addTeamMembers("B", "player")}>Add Player T2</button>
      </div>

      
      <p>Team A: {scoreA}</p>
      <p>Team B: {scoreB}</p>
      <button onClick={() => addPoint("A")}>+1 Team A</button>
      <button onClick={() => addPoint("B")}>+1 Team B</button>
      <button onClick={reset}>Reset</button>
    </div>
)

}


export default App;

