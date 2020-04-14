import React from 'react';
import NavBarDeckChoice from './NavBarDeckChoice';
import DeckList from './DeckList';
import CardList from './CardList';

function DeckChoice ({ heroes,heroesChosen,addToDeck }) {
    return (
        <div>
          <NavBarDeckChoice heroes={heroes}/>
          <DeckList heroes={heroes} heroesChosen={heroesChosen} />
          <CardList heroes={heroes} heroesChosen={heroesChosen} addToDeck={addToDeck}/>
        </div>
    )
}

export default DeckChoice;