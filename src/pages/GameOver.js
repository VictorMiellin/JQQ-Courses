import React from 'react'
import { useScore } from '../Context/ScoreContext'
import { StyledLink } from '../styled/Navbar';

export default function GameOver( {history} ) {
    const [score] = useScore();

    if(score === -1) {
        history.push('/');
    }

    return (
        <div>
            <h1>Game-Over</h1>
            <p>{score}</p>
            <StyledLink to="/">Go Home</StyledLink>
            <StyledLink to="/Game">Play again ?</StyledLink>
        </div>
    )
}
