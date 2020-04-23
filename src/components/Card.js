import React from 'react';
import './Card.css';

function Card ({ heroe, addToDeck, heroesChosen }) {
  return (
    <div className={heroesChosen.filter(heroeDeck => heroeDeck.name === heroe.name).length === 0 ? 'card' : 'card selected'} onClick={() => addToDeck(heroe.name)}>
      <section className='pw'>
        {heroe.power} PW
      </section>
      <img className='imageCard' src={heroe.img} alt={heroe.name} />
      <section className='containerBottom'>
        <div className='atk'><p>{heroe.atk}</p></div>
        <div className='hp'><p>{heroe.hp}</p></div>
      </section>
    </div>
  );
}

export default Card;
