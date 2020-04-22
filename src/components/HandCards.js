import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function HandCards (props) {
  const threeFirstCards = props.randomizeHeroesChosen(props.heroesChosen, 3);
  return (
    <div>
      {threeFirstCards.map(heroe => {
        heroe.position = 'hand';
        return (
          <CardOfDeckBoard heroe={heroe} key={(heroe.atk) * (heroe.hp)} HandleHandToBoard={props.HandleHandToBoard} />
        );
      })}
    </div>
  );
}
export default HandCards;
