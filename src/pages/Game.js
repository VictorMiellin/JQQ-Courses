import React, {useState, useEffect} from 'react'
import { StyledCharacter, StyledGame, StyledScore, StyledTimer } from '../styled/Game'
import { Strong } from "../styled/Random";

export default function Game({history}) {
    const [score, setScore] = useState(0);
    const MaxSeconds = 5;
    const [ms, setMs] = useState(0)
    const [seconds, setSeconds] = useState(MaxSeconds);

    useEffect(() => {
        const currentTime = new Date();
        const interval = setInterval(() => updateTime(currentTime), 1);
        return () => clearInterval(interval);
    }, []);

    const updateTime = (startTime) =>{
        const endTime = new Date();
        const passedMs = endTime.getTime() - startTime.getTime();
        const updatedSeconds = MaxSeconds -  Math.floor(passedMs/1000) - 1;
        const updatedMs = 1000 - passedMs.toLocaleString().slice(-3)
        setSeconds (updatedSeconds.toLocaleString().padStart(2, '0'));
        setMs (updatedMs.toLocaleString().padStart(3, '0'))
    
    }

    useEffect(()=> {
        if(seconds<= -1) {
            history.push('/gameOver')
        }

    }, [seconds, ms])

    return (
        <StyledGame>
            <StyledScore>Score : <Strong>{score}</Strong></StyledScore>
            <StyledCharacter>A</StyledCharacter>
            <StyledTimer>Time : <Strong>{seconds}:{ms}</Strong></StyledTimer>
        </StyledGame>
    )
}
