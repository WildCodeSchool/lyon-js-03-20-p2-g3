import React from 'react';
import CardListChosen from './CardListChosen';
import './DeckList.css'

function DeckList({heroesChosen}) {
    // const {name, atk, hp } = props.heroes[1]

    return (
        <div className ='aside'>
            <div type="text"  id="player_indicator"> Player 1</div>
            <div className="deck_aside">
                <h3 id="title_deck_chosen_cards">Deck</h3>
                <div className="cardlistdeck">
                    {heroesChosen.map(heroe => <CardListChosen heroechoice={heroe} />)}
                </div>
            </div>
                <div type="text" id="total_power_indicator"> Power: 000/300 </div>
        </div>
    )   
}

export default DeckList;