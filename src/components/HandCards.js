import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function HandCards (props) {
  // props.randomizeHeroesChosen(props.heroesChosen);
  return (
    <div>
      {props.player1Hand.map(heroe => <CardOfDeckBoard heroe={heroe} key={(heroe.atk) * (heroe.hp)} />)}
    </div>
  );
}
export default HandCards;
