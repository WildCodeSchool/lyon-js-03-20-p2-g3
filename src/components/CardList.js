import React from 'react';
import Card from './Card';
import './CardList.css';

function CardList ({ heroes, addToDeck, heroesChosen }) {
  return (
    <main className='cardList'>
      {heroes.map(heroe => {
        return (
          <Card key={heroe.name} heroe={heroe} heroesChosen={heroesChosen} addToDeck={addToDeck} />
        );
      }
      )}
    </main>
  );
}

export default CardList;
