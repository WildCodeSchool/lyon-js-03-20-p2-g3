import React from 'react';
import './Card.css';

function CardDeckRecap ({ heroe }) {
  return (
    <div className='card'>
      <section className='pw'>
        {heroe.power} PW
      </section>
      <img className='imageCard' src={heroe.img} alt={heroe.name} />
      <section className='containerBottom'>
        <div className='atk'><p className={heroe.name}>{heroe.atk}</p></div>
        <div className='hp'><p className={heroe.name}>{heroe.hp}</p></div>
      </section>
    </div>
  );
}

export default CardDeckRecap;
