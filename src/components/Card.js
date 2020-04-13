import React from 'react';
import './Card.css'


function Card ({ heroe }) {
    return (
        <div className="card">
          <section className="pw">
            {heroe.power} PW
          </section>
          <img className="imageCard" src={heroe.img} alt={heroe.name}/>
          <section className="name">{heroe.name}</section>
          <section className="containerBottom">
            <div className="atk"><p>{heroe.atk}</p></div>
            <div className="hp"><p>{heroe.hp}</p></div>
          </section>
        </div>
    )
}

export default Card;