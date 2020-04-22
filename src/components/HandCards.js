import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';
import './HandCards.css';

function HandCards (props) {
  return (
    <React.Fragment>
      {props.heroesChosen.filter(heroe => heroe.position === 'hand').map(heroe => {
        return (
          <CardOfDeckBoard heroe={heroe} key={(heroe.atk) * (heroe.hp)} onHandleHandToBoard={props.onHandleHandToBoard} />
        );
      })}
    </React.Fragment>
  );
}
export default HandCards;
