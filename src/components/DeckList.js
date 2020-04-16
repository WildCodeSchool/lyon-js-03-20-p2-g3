import React from 'react';
import CardListChosen from './CardListChosen';
import './DeckList.css';

function DeckList (props) {
    const PowerMax = 300;
    function SumPower () {
    let totalPower = 0;
    const powerArray = props.heroesChosen.map(heroe => heroe.power);
    for (let i = 0; i < powerArray.length; i = i + 1) {
      totalPower += powerArray[i];
    }
    if (totalPower > PowerMax) {
      return 'Please lower your deck power';
    } else {
      return totalPower;
    }
  }
  
  return (
    <div className='aside'>
      <div type='text' id='player_indicator'>
        Player 1
      </div>
      <div className='deck_aside'>
        <h3 id='title_deck_chosen_cards'>Deck</h3>
        <div className='cardlistdeck'>
          {props.heroesChosen.map(heroe => <CardListChosen heroechoice={heroe} />)}
        </div>
      </div>
      <div type='text' id='total_power_indicator'>
        <span>Total Power</span> <span>{SumPower()} / 300</span>
      </div>
    </div>
  );
}

export default DeckList;
