import React from 'react';
import CardListChosen from './CardListChosen';
import './DeckList.css';

function DeckList(props) {
    const PowerMax = 300;

    function SumPower() {
        
        let totalPower = 0;
        const powerArray = props.heroesChosen.map(heroe => heroe.power);
        for (let i = 0; i < powerArray.length; i = i + 1) {
            totalPower += powerArray[i]
        }
        if (totalPower > PowerMax) {
            return "Please lower your deck power"
        } else {
            return totalPower;
        }
    }

    return (
        <div className='aside'>
            <button type="text" className="player_button" id="player_btn"> Player 1</button>
            <div className="deck_aside">
                <h3 id="title_deck_chosen_cards">Deck</h3>
                <div className="cardlist">
                    {props.heroesChosen.map(heroe => <CardListChosen heroechoice={heroe} />)}
                </div>
            </div>
            <button type="text" className="pw_button" id="pw_btn"> Power: {SumPower()} / {PowerMax} </button>
        </div>
    )

}

export default DeckList;