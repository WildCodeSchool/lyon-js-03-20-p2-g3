import React from 'react';
import './CardListChosen.css'

const CardListChosen = props => {
    const {name, atk, hp} = props.heroechoice
    return(
        <div className="cardlistchosen">
            <p className='para_chosen_card'> {name} 
            <br/>
            <span>{atk}/{hp}</span> </p>
        </div>
    )
}

export default CardListChosen;