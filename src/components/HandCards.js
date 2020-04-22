import React from 'react';
import CardOfDeckBoard from './CardOfDeckBoard';
import './CardList.css';
import './Card.css';

function HandCards (props) {
  return (
    <div>
      {props.heroesChosen.filter(heroe => heroe.position === 'hand').map(heroe => {
        return (
        <CardOfDeckBoard heroe={heroe} key={(heroe.atk) * (heroe.hp)} handleHandToBoard={props.handleHandToBoard} />
      )})
       }
    </div>
  ) ;  
}
export default HandCards;
