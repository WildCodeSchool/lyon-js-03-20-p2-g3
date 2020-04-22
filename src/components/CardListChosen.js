import React from 'react';
import './CardListChosen.css';

const CardListChosen = props => {
  const { name, atk, hp } = props.heroechoice;
  return (
    <div className='cardlistchosen'>
      <p className='para_chosen_card'> {name}
        <br />
        <span>{atk}/{hp}</span>
        <button className={name} onClick={props.addToDeck}>X</button>
      </p>
    </div>
  );
};

export default CardListChosen;
