import React from 'react';
import HandCards from './HandCards';
import './DeckBoard.css';
import Board from './Board';
import HiddenCards from './HiddenCards';
import heroes from './heroes';

class DeckBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      playerTurn: true,
      heroesChosen: this.props.heroesChosen,
      cardsAvalaibleForIA: heroes.map(heroe => {
        return {
          name: heroe.name,
          img: heroe.image.url,
          atk: parseInt(heroe.powerstats.combat, 10),
          hp: parseInt(heroe.powerstats.durability, 10),
          power: parseInt(heroe.powerstats.power, 10),
          position: 'deck'
        };
      })
    };
  }

  componentDidMount () {
    this.randomizeHeroesChosen(this.state.heroesChosen);
    this.randomizeHeroesChosen(this.state.cardsAvalaibleForIA);
  }

  componentWillUnmount () {
    this.setState({ heroesChosen: [] });
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

  handleHandToBoardIa = () => {
    const newIaDeck = this.state.cardsAvalaibleForIA;
    const randomNumber = Math.floor(Math.random() * newIaDeck.filter(heroe => heroe.position === 'hand').length);
    newIaDeck.filter(heroe => heroe.position === 'hand')[randomNumber].position = 'board';
    this.setState({ cardsAvalaibleForIA: newIaDeck });
  }

  randomizeHeroesChosen = (deck) => {
    const newHeroesChosen = deck;
    const heroesChosenRandomized = [];
    const arrayOfRandomNumbers = [];
    while (arrayOfRandomNumbers.length < newHeroesChosen.length) {
      const randomNumber = Math.floor(Math.random() * newHeroesChosen.length);
      if (arrayOfRandomNumbers.indexOf(randomNumber) === -1) {
        arrayOfRandomNumbers.push(randomNumber);
      }
    }

    for (let i = 0; i < newHeroesChosen.length; i++) {
      heroesChosenRandomized.push(newHeroesChosen[arrayOfRandomNumbers[i]]);
    }

    for (let i = 0; i < heroesChosenRandomized.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (heroesChosenRandomized.indexOf(heroesChosenRandomized[i]) === arrayOfRandomNumbers[j]) {
          heroesChosenRandomized[i].position = 'hand';
        }
      }
    }

    this.setState({ deck: heroesChosenRandomized });
  }

  handleDraw = (deck) => {
    const newHeroesChosen = deck;
    if (newHeroesChosen.filter(heroe => heroe.position === 'deck').length !== 0) {
      const randomNumber = Math.floor(Math.random() * newHeroesChosen.filter(heroe => heroe.position === 'deck').length);
      newHeroesChosen.filter(heroe => heroe.position === 'deck')[randomNumber].position = 'hand';
      this.setState({ deck: newHeroesChosen });
    }
  }

  attackCardIa = () => {
    const newDeckIa = this.state.cardsAvalaibleForIA;
    const newHeroesChosen = this.state.heroesChosen;
    for (let i = 0; i < newDeckIa.filter(heroe => heroe.position === 'board').length; i++) { // boucle pour chaque carte sur le board de l'IA
      window.setTimeout(() => {
        const cardBoardIa = newDeckIa.filter(heroe => heroe.position === 'board');
        const cardBoardPlayer = newHeroesChosen.filter(heroe => heroe.position === 'board');
        const randomNumber = Math.floor(Math.random() * newHeroesChosen.filter(heroe => heroe.position === 'board').length);
        console.log(randomNumber);
        if (cardBoardPlayer.length !== 0) {
          newDeckIa.filter(heroe => heroe.position === 'board')[i].hp -= cardBoardPlayer[randomNumber].atk; // enlève la vie de la carte de l'IA
          newHeroesChosen.filter(heroe => heroe.position === 'board')[randomNumber].hp -= cardBoardIa[i].atk; // enlève la vie de la carte du joueur
          if (newDeckIa.filter(heroe => heroe.position === 'board')[i].hp <= 0) { // si les hp de la carte de l'IA est inferieur a 0, enleve la carte du board
            newDeckIa.filter(heroe => heroe.position === 'board')[i].position = 'dead';
          }
          if (newHeroesChosen.filter(heroe => heroe.position === 'board')[randomNumber].hp <= 0) { // si les hp de la carte de du joueur est inferieur a 0, enleve la carte du board
            newHeroesChosen.filter(heroe => heroe.position === 'board')[randomNumber].position = 'dead';
          }
        }
        this.setState({ cardsAvalaibleForIA: newDeckIa, heroesChosen: newHeroesChosen });
      }, 1000 * i);
    }
  }

  handleIaTurn = () => {
    this.setState({ playerTurn: false });
    const attackTime = 1000 * this.state.cardsAvalaibleForIA.filter(heroe => heroe.position === 'board').length;
    window.setTimeout(() => this.handleDraw(this.state.cardsAvalaibleForIA), 1000);
    window.setTimeout(() => this.handleHandToBoardIa(), 4000);
    window.setTimeout(() => this.attackCardIa(), 5000);
    window.setTimeout(() => this.setState({ playerTurn: true }), 6000 + attackTime);
    window.setTimeout(() => this.handleDraw(this.state.heroesChosen), 6000 + attackTime);
  }

  render () {
    return (
      <div className='deckBoard'>
        <div className='leftBoardContainer'>
          <a className='button-config' id='button-rageQuit' href='http://localhost:3000/'>Rage Quit</a>
        </div>
        <div className='centerBoardContainer'> {/* Board Total */}
          <div className='iahand'> {/* hand of computer */}
            <HandCards heroesChosen={this.state.cardsAvalaibleForIA} randomizeHeroesChosen={this.randomizeHeroesChosen} />
          </div>
          <div className='boardContainer'>
            <div className='boardia'> {/* board of computer */}
              <Board heroesChosen={this.state.cardsAvalaibleForIA} />
            </div>
            <div className='boardPlayer1'> {/* board of Player1 */}
              <Board heroesChosen={this.state.heroesChosen} />
            </div>
          </div>
          <div className='player1hand'> {/* hand of Player1 */}
            <HandCards heroesChosen={this.state.heroesChosen} onHandleHandToBoard={this.handleHandToBoard} playerTurn={this.state.playerTurn} />
          </div>
        </div>
        <div className='rightBoardContainer'> {/* right board container : decks, timer, "End Turn" button, pseudos */}
          <div className='deckia'>
            <HiddenCards deck={this.state.cardsAvalaibleForIA} />
          </div>
          <div className='timerAndEndTurn'>
            <p>59 s</p>
            <button onClick={this.state.playerTurn ? this.handleIaTurn : ''}>End Turn</button>
          </div>
          <div className='deckplayer1'>
            <HiddenCards deck={this.state.heroesChosen} />
          </div>
        </div>

      </div>
    );
  }
}

export default DeckBoard;
