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

  return (
    <div className='aside'>
      <div type='text' id='player_indicator'>
        Player 1
      </div>
      <div className='deck_aside'>
        <h3 id='title_deck_chosen_cards'>Deck</h3><span onClick={props.removeDeck}><i class="fas fa-times"></i></span>
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
