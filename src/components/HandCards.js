import React from 'react';
import CardOfDeckBoard from './CardOfDecKBoard';
import './Card.css';

function HandCards ({ heroesChosen }) {
  // Choisir 3 cartes parmi celles du deck ? Quid du mec qui ne veut prendre que 2 cartes

  const arrayOfRandomNumbers = [];
  const numberOfRandomNumbersWanted = heroesChosen.length;
  while (arrayOfRandomNumbers.length < numberOfRandomNumbersWanted) {
    const randomNumber = Math.floor(Math.random() * numberOfRandomNumbersWanted) + 1;
    if (arrayOfRandomNumbers.indexOf(randomNumber) === -1) {
      arrayOfRandomNumbers.push(randomNumber);
    }
  }
  return (
    <div>
      <p>Helllllllo</p>
      {heroesChosen.map(heroe => <CardOfDeckBoard heroe={heroe} key={heroe.id} />)}
    </div>
  );
}

export default HandCards;
