import React from 'react';
import HandCards from './HandCards';
import './DeckBoard.css';
import Board from './Board';
import HiddenCards from './HiddenCards';


class DeckBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroesChosen: props.heroesChosen,
      cardsAvalaibleForIA: props.heroes
    };
  }

  componentDidMount() {
    this.randomizeHeroesChosen();
  }

  handleHandToBoard = (heroeName) => {
    const newDeck = this.state.heroesChosen.map(heroe => {
      if (heroe.name === heroeName) {
        return { ...heroe, position: 'board' };
      } else {
        return heroe;
      }
    });
    this.setState({ heroesChosen: newDeck });
  }

  randomizeHeroesChosen = () => {
    const newHeroesChosen = this.state.heroesChosen;
    let heroesChosenRandomized = [];
    let arrayOfRandomNumbers = [];
    while (arrayOfRandomNumbers.length < newHeroesChosen.length) {
      const randomNumber = Math.floor(Math.random() * newHeroesChosen.length);
      if (arrayOfRandomNumbers.indexOf(randomNumber) === -1) {
        arrayOfRandomNumbers.push(randomNumber);
      }
    }
    
    for (let i=0;i<newHeroesChosen.length;i++) {
      heroesChosenRandomized.push(newHeroesChosen[arrayOfRandomNumbers[i]])
    }

    for (let i = 0; i < heroesChosenRandomized.length; i++) {
      for (let j = 0; j < 3 ; j++) {
        if (heroesChosenRandomized.indexOf(heroesChosenRandomized[i]) === arrayOfRandomNumbers[j]) {
          heroesChosenRandomized[i].position = 'hand';
        }
      }
    }

    this.setState({ heroesChosen: heroesChosenRandomized });
  }

  handleDraw = () => {
    const newHeroesChosen = this.state.heroesChosen;
    const randomNumber = Math.floor(Math.random() * newHeroesChosen.filter(heroe => heroe.position === 'deck').length);
    newHeroesChosen.filter(heroe => heroe.position === 'deck')[randomNumber].position = 'hand';
    this.setState({ heroesChosen: newHeroesChosen });
  }

  render() {
    return (
      <div className="deckboard">
        <div className="player1handboard">
        <HiddenCards deck={this.state.heroesChosen} />
        <button onClick={this.handleDraw}>draw</button>
          <div className='board'>
            board
            <Board heroesChosen={this.state.heroesChosen} />
          </div>
          <div className='player1hand'>
            <HandCards heroesChosen={this.state.heroesChosen} onHandleHandToBoard={this.handleHandToBoard} />
          </div>
        </div>
        {/*         <div className="iahand">
        Hello
        <HandCards heroesChosen={this.state.cardsAvalaibleForIA} randomizeHeroesChosen={this.randomizeHeroesChosen} />
        </div> */}
      </div>
    );
  }
}

export default DeckBoard;
