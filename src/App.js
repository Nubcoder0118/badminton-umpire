
import "./App.css";
// import racketData from "./rackets.json";
import React, { useState, useEffect } from "react";

function App() {
    // game score
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    // const [mode, setMode] = useState("singles");

    // team names
    const [team1Name, setTeam1] = useState([]);
    const [team2Name, setTeam2] = useState([]);
    
    // overall score in the series
    const [team1OverAll, setTeam1OverAll] = useState(0);
    const [team2OverAll, setTeam2OverAll] = useState(0);

    
    const [history, setHistory] = useState([]);

    useEffect(() => {
      if (scoreA >= 21 && scoreA - scoreB >= 2) {
        setTeam1OverAll(prev => prev + 1);
        reset();
      } else if (scoreB >= 21 && scoreB - scoreA >= 2){
        setTeam2OverAll(prev => prev + 1);
        reset();
      }
    }, [scoreA, scoreB])

    function addPoint(team){
        if (team === 'A' && scoreA < 30) {
            setScoreA(prev => {
              const newScore = prev + 1;
              setHistory(prevHistory => [...prevHistory, { team: "A", previousScore: prev}]);
              return newScore;
            });
           
        } else if (team === 'B' && scoreB < 30) {
            setScoreB(prev => {
               const newScore = prev + 1
               setHistory(prevHistory => [...prevHistory, { team: "B", previousScore: scoreB}]);
               return newScore;
            });     
        }
    }

    function reset() {
        setScoreA(0);
        setScoreB(0);
    }

    function undoLastPoint(){
      const lastMove = history[history.length - 1];
      if (history.length === 0) return;

      if (lastMove.team === "A") {
        setScoreA(lastMove.previousScore);
      } else {
        setScoreB(lastMove.previousScore);
      }
      // never mutate directly in react
      // creates a new array but gets rid of the last element
      setHistory(prev => prev.slice(0, -1));
      
    }

  
    // future function
    // function log() {
    //   if (scoreA > 20 && (scoreA >= scoreB + 2)){
    //     setHistory("a")
    //   }
    // }
    return (
    <div>
      <h1 className = "title">Badminton Score Panel</h1>
      <div className = "scoreboard">
        
        <div className = "teams">
          <div className="team-row">
             <input 
            className = "team1"
            placeholder="Team 1"
            value={team1Name}
            onChange={(e) => setTeam1(e.target.value)}
            />
            <span className="overall-score">{team1OverAll}</span>
            
          </div>
          <p className="score">{scoreA}</p>
          <button onClick={() => addPoint("A")}>+1 Team A</button>
      
        </div>

        <div className = "teams">
          <div className="team-row">
             <span className="overall-score">{team2OverAll}</span>
            <input
            className="team2"
            placeholder="Team 2"
            value={team2Name}
            onChange={(e)=> setTeam2(e.target.value)}
            />
           
          </div>

          <p className="score">{scoreB}</p>
          <button onClick={() => addPoint("B")}>+1 Team B</button>
          
        </div>
      </div>

      <div className = "functions"style={ {marginTop : "20px"}}>
              <button className = "reset" onClick={reset}>Reset</button>
              <button className = "undo" onClick={undoLastPoint} >Undo Last Point</button>
      </div>

    </div>
)

}


export default App;

