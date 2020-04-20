import React from 'react';
import HandCards from './HandCards';

class DeckBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heroesChosen: props.heroesChosen

    };
  }

  render () {
    console.log(this.state.heroeschosen);
    return (
      <div>
        <HandCards heroesChosen={this.state.heroesChosen} />
      </div>

    );
  }
}

export default DeckBoard;
