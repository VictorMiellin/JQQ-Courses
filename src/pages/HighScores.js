import React, {useState, useEffect } from 'react'
import { ScoreList, ScoreLI } from '../styled/HighScore';

export default function HighScores() {
    // display high those scores
    const [highScores, setHighScores] = useState([]);
    
    //use fetch API to call getHighScores function
    useEffect(() => {
        
        const loadHighScores = async() => {
            try {
                const res = await fetch('/.netlify/functions/getHighScore');
                const scores = await res.json();
                setHighScores(scores);
            }catch(err){
                console.error(err);
            }
        }
        loadHighScores();
    }, [])

    return (
        <div>
            <h1>High Scores</h1>
            <ScoreList>
                {highScores.map((score) => (
                    <ScoreLI key={score.id}>
                        {score.fields.Name} – {score.fields.Score}
                    </ScoreLI>
                ))}
            </ScoreList>
        </div>
    )
}
