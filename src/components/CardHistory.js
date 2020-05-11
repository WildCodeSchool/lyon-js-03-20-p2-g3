import React from 'react';
import './CardHistory.css'

function CardHistory ({ deadHeroe }){
  return(
    <div className='historyCard'>
      <img className='historyImg' src={deadHeroe.img} alt={deadHeroe.name}></img>
      <p className='historyName'>{deadHeroe.name}</p>
    </div>
      
  )
};

export default CardHistory;