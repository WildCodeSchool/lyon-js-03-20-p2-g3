import React from 'react';
import CardListChosen from './CardListChosen';
import './CardList.css'

function CardList(props) {
    // const {name, atk, hp } = props.heroes[1]

    return (
        <div className ='aside'>
            <button type="text" className="player_button" id="player_btn"> Player 1</button>
            <div className="deck_aside">
                <h3>Deck</h3>
                <div className="cardlist">
                    {props.heroes.map(heroe => <CardListChosen heroechoice={heroe} />)}
                </div>
            </div>
                <button type="text" className="pw_button" id="pw_btn"> Power: 000/300 </button>
        </div>
    )   
}

export default CardList;