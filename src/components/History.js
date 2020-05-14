import React from 'react';
import CardHistory from './CardHistory';

function History ({ history }) {
  return (
    <>
      <h2 className='graveyardTitle'>Graveyard</h2>
      <div className='historyContainer'>
        {history.map(deadHeroe => {
          return (
            <CardHistory key={`${deadHeroe.name} ${deadHeroe.iaDeck}`} deadHeroe={deadHeroe} />
          );
        })}
      </div>
    </>
  );
}

export default History;
