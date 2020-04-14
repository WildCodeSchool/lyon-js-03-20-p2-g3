import React from 'react';
import './Card.css'


function Card ({ heroe, addToDeck }) {
    return (
        <div className={heroe.name + ' card'} onClick={addToDeck}>
          <section className={heroe.name + ' pw'}>
            {heroe.power} PW
          </section>
          <img className={heroe.name + ' imageCard'} src={heroe.img} alt={heroe.name}/>
         {/*  <section className={heroe.name + ' name'}>{heroe.name}</section> */}
          <section className={heroe.name + ' containerBottom'}>
            <div className={heroe.name + ' atk'}><p className={heroe.name}>{heroe.atk}</p></div>
            <div className={heroe.name + ' hp'}><p className={heroe.name}>{heroe.hp}</p></div>
          </section>
        </div>
    )
}

export default Card;