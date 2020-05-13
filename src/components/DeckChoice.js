import React from 'react';
import NavBarDeckChoice from './NavBarDeckChoice';
import DeckList from './DeckList';
import CardList from './CardList';
import './DeckChoice.css';

function DeckChoice ({ heroes, heroesChosen, addToDeck, removeDeck, maxPower }) {
  return (
    <div>
      <NavBarDeckChoice heroesChosen={heroesChosen} />
      <div id='container-deck-card'>
        <DeckList heroes={heroes} heroesChosen={heroesChosen} addToDeck={addToDeck} removeDeck={removeDeck} maxPower={maxPower} />
        <CardList heroes={heroes} heroesChosen={heroesChosen} addToDeck={addToDeck} />
      </div>
    </div>
  );
}

export default DeckChoice;
