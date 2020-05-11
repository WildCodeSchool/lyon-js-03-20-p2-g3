import React from 'react';
import CardHistory from './CardHistory'

function History ({ history }) {
  return (
    <>
      {history.map(deadHeroe => {
        return(
          <CardHistory key={`${deadHeroe.name} ${deadHeroe.iaDeck}`} deadHeroe={deadHeroe}  />
        )
      })}
    </>   
  );
};

export default History;