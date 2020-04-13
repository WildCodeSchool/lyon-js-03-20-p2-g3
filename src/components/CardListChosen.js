import React from 'react';
import './CardListChosen.css'

const CardListChosen = props => {
    const {name, atk, hp} = props.heroechoice
    return(
        <div className="cardlistchosen">
            <p> {name} <span>{atk} / {hp}</span> </p>
        </div>
    )
}

export default CardListChosen;