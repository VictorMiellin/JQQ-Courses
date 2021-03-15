import React, {useState, useEffect, useCallback} from 'react'
import { StyledCharacter, StyledGame, StyledScore, StyledTimer } from '../styled/Game'
import { Strong } from "../styled/Random";

export default function Game({history}) {
    const MaxSeconds = 90;
    const characters = "abcdefghijklmnopqrstuvwxyz"
    const [currentChar, setCurrentChar] = useState('')
    const [score, setScore] = useState(0);
    const [ms, setMs] = useState(0)
    const [seconds, setSeconds] = useState(MaxSeconds);
    
    
    const setRandomCharacter = () => {
        setCurrentChar(characters[Math.floor(Math.random() * 26)])
    }

    // lancer le jeu
    useEffect(() => {
        setRandomCharacter()
        const currentTime = new Date();
        const interval = setInterval(() => updateTime(currentTime), 1);
        return () => clearInterval(interval);
    }, []);

// verifier que l'input utilisateur est bon + gestion du score
    const keyUpHandler = useCallback((e) => {
        console.log(e.key)
        if (e.key === currentChar) {
            setScore((prevScore) => prevScore +1);
            setRandomCharacter()
        } else {
                if(score > 0) {setScore((prevScore) => prevScore -1 )}
        }        
    },[currentChar])

    // Ecoute les touche préssées par l'utilsateur
    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            document.removeEventListener('keyup', keyUpHandler)
        };
    }, [keyUpHandler]);

    // gestion du timer
    const updateTime = (startTime) =>{
        const endTime = new Date();
        const passedMs = endTime.getTime() - startTime.getTime();
        const updatedSeconds = MaxSeconds -  Math.floor(passedMs/1000) - 1;
        const updatedMs = 1000 - passedMs.toLocaleString().slice(-3)
        setSeconds (updatedSeconds.toLocaleString().padStart(2, '0'));
        setMs (updatedMs.toLocaleString().padStart(3, '0'))
    
    }

    // game over
    useEffect(()=> {
        if(seconds<= -1) {
            // Todo : save le score du joueur
            history.push('/gameOver')
        }

    }, [seconds, ms])

    return (
        <StyledGame>
            <StyledScore>Score : <Strong>{score}</Strong></StyledScore>
            <StyledCharacter>{currentChar}</StyledCharacter>
            <StyledTimer>Time : <Strong>{seconds}:{ms}</Strong></StyledTimer>
        </StyledGame>
    )
}
