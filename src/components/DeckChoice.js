import React from 'react';
import NavBarDeckChoice from './NavBarDeckChoice';
import DeckList from './DeckList';
import CardList from './CardList';

function DeckChoice ({ heroes,heroesChosen }) {
    return (
        <div>
          <NavBarDeckChoice heroes={heroes}/>
          <DeckList heroes={heroes}/>
          <CardList heroes={heroes} heroesChosen={heroesChosen}/>
        </div>
    )
}

export default DeckChoice;