import React from 'react';
import CardListChosen from './CardListChosen';
import './DeckList.css';

function DeckList (props) {
  function SumPower () {
    let totalPower = 0;
    const powerArray = props.heroesChosen.map(heroe => heroe.power);
    for (let i = 0; i < powerArray.length; i++) {
      totalPower += powerArray[i];
    }
    return totalPower;
  }
  const handleRemoveDeck = props.removeDeck;
  return (
    <div className='aside'>
      <div type='text' id='player_indicator'>
        Player 1
      </div>
      <div className='deck_aside'>
        <div className='deck_title_container'>
          <h3 id='title_deck_chosen_cards'>Deck</h3>
          <span className='cross_title_container' onClick={handleRemoveDeck}>
            <i className='fas fa-times' />
          </span>
        </div>

        <div className='cardlistdeck'>
          {props.heroesChosen.map(heroe => <CardListChosen key={heroe.name} heroechoice={heroe} addToDeck={props.addToDeck} />)}

        </div>
      </div>
      <div type='text' id='total_power_indicator'>
        <span>Total Power</span> <span>{SumPower()} / 300</span>
      </div>
    </div>
  );
}

export default DeckList;
