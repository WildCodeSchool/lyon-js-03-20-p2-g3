import React from 'react';
import './Card.css';

function CardOfDeckBoard ({ heroesChosen }) {
  return (
    <div className='card'>
      <section className='pw'>
        {heroesChosen.power} PW
      </section>
      <img className='imageCard' src={heroesChosen.img} alt={heroesChosen.name} />
      <section className='containerBottom'>
        <div className='atk'><p className={heroesChosen.name}>{heroesChosen.atk}</p></div>
        <div className='hp'><p className={heroesChosen.name}>{heroesChosen.hp}</p></div>
      </section>
    </div>
  );
}

export default CardOfDeckBoard;
