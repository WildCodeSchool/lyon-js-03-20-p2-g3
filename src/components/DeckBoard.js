import React from 'react';
import HandCards from './HandCards';
import './DeckBoard.css';
import Board from './Board';
import HiddenCards from './HiddenCards';
import heroes from './heroes';
import Button from './Button';

class DeckBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroesChosen: props.heroesChosen,
      cardsAvalaibleForIA: heroes.map(heroe => {
        return {
          name: heroe.name,
          img: heroe.image.url,
          atk: parseInt(heroe.powerstats.combat, 10),
          hp: parseInt(heroe.powerstats.durability, 10),
          power: parseInt(heroe.powerstats.power, 10),
          position: 'board',
          selected: false,
          iaDeck: true
        };
      })
    };
  }

  componentDidMount() {
    this.randomizeHeroesChosen(this.state.heroesChosen);
    this.randomizeHeroesChosen(this.state.cardsAvalaibleForIA);
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

  handleDraw = () => {
    const newHeroesChosen = this.state.heroesChosen;
    const randomNumber = Math.floor(Math.random() * newHeroesChosen.filter(heroe => heroe.position === 'deck').length);
    newHeroesChosen.filter(heroe => heroe.position === 'deck')[randomNumber].position = 'hand';
    this.setState({ heroesChosen: newHeroesChosen });
  }

  handleSelectedCard = (nameSelected) => {

    const newHeroesChosen = this.state.heroesChosen.map(
      heroe => {
        if (heroe.name === nameSelected && !heroe.iaDeck) {
          return { ...heroe, selected: true };
        } else {
          return { ...heroe, selected: false };
        }
      });
    this.setState({ heroesChosen: newHeroesChosen });
  }

  handleAttackIaCard = (name) => {
    console.log('coucou')
    const heroesChosen = this.state.heroesChosen
    const cardsAvalaibleForIA = this.state.cardsAvalaibleForIA
    const playerCardSelected = heroesChosen.filter(heroe => heroe.selected === true)
    if (playerCardSelected.length !== 0) {
      cardsAvalaibleForIA.map(heroeIa => {
        if (heroeIa.name === name) {
          // on veut récupérer l'attaque de la carte sélectionnée et la vie de l'attaque adverse. Et en déduire le nombre de point de vie à retirer sur la carte adverse. Et vice versa.
          heroeIa.hp -= playerCardSelected[0].atk 
          playerCardSelected[0].hp -= heroeIa.atk
        }
      });
      console.log(cardsAvalaibleForIA)
      console.log(heroesChosen)
      this.setState({ cardsAvalaibleForIA, heroesChosen })
    }
  }

  render() {
    return (
      <div className='deckBoard'>
        <div className='leftBoardContainer'>
          <Button id='button-rageQuit' link='/' linkName='Rage Quit' />
        </div>
        <div className='centerBoardContainer'> {/* Board Total */}
          <div className='iahand'> {/* hand of computer */}
            <HandCards heroesChosen={this.state.cardsAvalaibleForIA} randomizeHeroesChosen={this.randomizeHeroesChosen} onHandToBoard={this.handleHandToBoard} />
          </div>
          <div className='boardContainer'>
            <div className='boardia'> {/* board of computer */}
              <Board heroesChosen={this.state.cardsAvalaibleForIA} onSelectedCard={this.handleSelectedCard} onAttackIaCard={this.handleAttackIaCard}/>
            </div>
            <div className='boardPlayer1'> {/* board of Player1 */}
              <Board heroesChosen={this.state.heroesChosen} onSelectedCard={this.handleSelectedCard} />
            </div>
          </div>
          <div className='player1hand'> {/* hand of Player1 */}
            <HandCards heroesChosen={this.state.heroesChosen} onHandToBoard={this.handleHandToBoard} />
          </div>
        </div>
        <div className='rightBoardContainer'> {/* right board container : decks, timer, "End Turn" button, pseudos */}
          <div className='deckia'>
            <HiddenCards deck={this.state.cardsAvalaibleForIA} />
          </div>
          <div className='timerAndEndTurn'>
            <p>59 s</p>
            <button>End Turn</button>
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
