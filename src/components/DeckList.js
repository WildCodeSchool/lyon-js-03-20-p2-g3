import React from 'react';
import CardListChosen from './CardListChosen';
import './DeckList.css'

function CardList(props) {
    // const {name, atk, hp } = props.heroes[1]

    return (
        <div className ='aside'>
            <button type="text" className="player_button" id="player_btn"> Player 1</button>
            <div className="deck_aside">
                <h3 id="title_deck_chosen_cards">Deck</h3>
                <div className="cardlist">
                    {props.heroesChosen.map(heroe => <CardListChosen heroechoice={heroe} />)}
                </div>
            </div>
                <button type="text" className="pw_button" id="pw_btn"> Power: 000/300 </button>
        </div>
    )   
}

export default CardList;