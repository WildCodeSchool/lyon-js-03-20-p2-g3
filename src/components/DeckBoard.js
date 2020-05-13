import React from 'react';
import HandCards from './HandCards';
import './DeckBoard.css';
import Board from './Board';
import HiddenCards from './HiddenCards';
import _ from 'lodash';
import Timer from './Timer';
import PlayerTurn from './PlayerTurn';
import History from './History';

const delay = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
class DeckBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      playerTurn: true, // initialise playerTurn à true pour débuter la partie avec le tour du joueur. Deus Sex Machina est généreux.
      isAllowedToPutCardOnBoard: true, // with love <3
      heroesChosen: this.props.heroesChosen, // initialise les héros choisis par le joueur dans le Deck Choice
      cardsAvalaibleForIA: [],
      isYourTurnDisplay: true,
      endGame: undefined,
      showModal: false,
      lastCard: undefined,
      history: []
    };
  }

  componentDidMount () {
    this.randomizeDeck(this.state.heroesChosen, 'heroesChosen');
    this.handleDraw(this.state.heroesChosen, 'heroesChosen');
    this.createIaDeck();
    this.randomizeDeck(this.state.cardsAvalaibleForIA, 'cardsAvalaibleForIA');
    window.setTimeout(() => {
      this.setState({ isYourTurnDisplay: false });
    }, 2000);
  }

  componentWillUnmount () {
    this.setState({ heroesChosen: [] });
  }
  // On veut limiter le nombre de carte joué sur le board par tour

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  endGameVerify = () => {
    const deadCardsPlayerLength = this.state.heroesChosen.filter(heroe => heroe.position !== 'dead').length;
    const deadCardsIaLength = this.state.cardsAvalaibleForIA.filter(heroe => heroe.position !== 'dead').length;
    console.log(deadCardsPlayerLength);
    console.log(deadCardsIaLength);

    if (deadCardsPlayerLength === 0 && deadCardsIaLength === 0) {
      this.setState({ endGame: 'equality' }); // affichage d'égalité
      console.log('equality');
      this.handleShowModal();
      this.props.onPlayEffects(this.props.audioEgality);
    } else if (deadCardsPlayerLength === 0) {
      this.setState({ endGame: 'lose' }); // affichage To lose !== TOULOUSE
      console.log('you suck');
      this.handleShowModal();
      this.props.onPlayEffects(this.props.audioDefeat);
    } else if (deadCardsIaLength === 0) {
      this.setState({ endGame: 'win' }); // affichage WIIIIIIN !
      console.log('you wiiiiiin !');
      this.handleShowModal();
      this.props.onPlayEffects(this.props.audioWin);
    }
  }

  handleHandToBoard = (heroeName) => {
    let isAllowedToPutCardOnBoard = this.state.isAllowedToPutCardOnBoard;
    const newDeck = this.state.heroesChosen.map(heroe => {
      if (heroe.name === heroeName && isAllowedToPutCardOnBoard) {
        isAllowedToPutCardOnBoard = false;
        this.props.onPlayEffects(this.props.audioCardOnBoard);
        this.setState({ lastCard: heroeName });
        return { ...heroe, position: 'board' };
      } else {
        return heroe;
      }
    });
    this.setState({ heroesChosen: newDeck, isAllowedToPutCardOnBoard: false });
  }

  switchCards = (heroeName) => {
    const newPlayerDeck = this.state.heroesChosen.slice();
    const lastCardHeroe = newPlayerDeck.filter(heroe => heroe.name === this.state.lastCard)[0];
    lastCardHeroe.position = 'hand';
    newPlayerDeck.map(heroe => {
      heroe.selected = false;
      if (heroe.name === heroeName) {
        heroe.position = 'board';
        this.props.onPlayEffects(this.props.audioCardOnBoard);
      }
    });
    this.setState({ heroesChosen: newPlayerDeck, lastCard: heroeName });
  }

  handleHandToBoardIa = () => {
    const newIaDeck = this.state.cardsAvalaibleForIA;
    if (newIaDeck.filter(heroe => heroe.position === 'hand').length !== 0) {
      const randomNumber = Math.floor(Math.random() * newIaDeck.filter(heroe => heroe.position === 'hand').length);
      newIaDeck.filter(heroe => heroe.position === 'hand')[randomNumber].position = 'board';
      this.setState({ cardsAvalaibleForIA: newIaDeck });
      this.props.onPlayEffects(this.props.audioCardOnBoard);
    }
  }

  handleHandToBoardPlayer = () => {
    const newPlayerDeck = this.state.heroesChosen;
    if (newPlayerDeck.filter(heroe => heroe.position === 'hand').length !== 0) {
      const randomNumber = Math.floor(Math.random() * newPlayerDeck.filter(heroe => heroe.position === 'hand').length);
      newPlayerDeck.filter(heroe => heroe.position === 'hand')[randomNumber].position = 'board';
      this.setState({ heroesChosen: newPlayerDeck });
    }
  }

  randomizeDeck = (deck, deckName) => {
    const newHeroesChosen = deck.slice();
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

    this.setState({ [deckName]: heroesChosenRandomized });
  }

  createIaDeck = () => {
    const heroes = _.shuffle(this.props.heroes);
    let IaDeckPower = 0;
    const cardsAvalaibleForIA = this.state.cardsAvalaibleForIA;
    for (let i = 0; i < this.props.heroes.length && IaDeckPower <= this.props.maxPower; i++) {
      if (heroes[i].power > this.props.maxPower - IaDeckPower) {
      } else {
        cardsAvalaibleForIA.push({ ...heroes[i], position: 'deck', iaDeck: true });
        IaDeckPower += heroes[i].power;
      }
    }
    this.setState({ cardsAvalaibleForIA });
  }

  handleDraw = (deck, deckName) => {
    const newHeroesChosen = deck.slice();
    if (newHeroesChosen.filter(heroe => heroe.position === 'deck').length !== 0) { // (Flo) condition si clé position dans l'objet héro est 'deck' et que le la longueur du tableau n'est pas égal à 0
      this.props.onPlayEffects(this.props.audioDraw);
      const randomNumber = Math.floor(Math.random() * newHeroesChosen.filter(heroe => heroe.position === 'deck').length); // (Flo) set const randomNumber : pioche aléatoire dans liste d'héro choisie ssi la clé position est à 'deck
      newHeroesChosen.filter(heroe => heroe.position === 'deck')[randomNumber].position = 'hand'; // (Flo) si condition est true : filter des héros ayant la valeur de la clé position à 'deck' à la position correspondant au randomNumber
      this.setState({ [deckName]: newHeroesChosen });
    }
  }

  attackCardIa = async () => {
    this.setState({ iaAttack: true });
    const newDeckIa = this.state.cardsAvalaibleForIA.slice();
    const newHeroesChosen = this.state.heroesChosen.slice();
    const history = this.state.history.slice();
    newHeroesChosen.forEach(heroe => { // passage du state lastCard à  false pour toutes les cartes
      heroe.lastCard = false;
    });
    for (let i = 0; i < newDeckIa.filter(heroe => heroe.position === 'board').length; i++) { // boucle pour chaque carte sur le board de l'IA
      const cardBoardIa = newDeckIa.filter(heroe => heroe.position === 'board');
      const cardBoardPlayer = newHeroesChosen.filter(heroe => heroe.position === 'board' && !heroe.deadOnBoard);
      const randomNumber = Math.floor(Math.random() * cardBoardPlayer.length);
      if (cardBoardPlayer.length !== 0) {
        cardBoardIa[i].isFighting = true;
        cardBoardPlayer[randomNumber].isFighting = true;
        this.setState({ cardsAvalaibleForIA: newDeckIa, heroesChosen: newHeroesChosen });
        await delay(1000);
        this.props.onPlayEffects(this.props.audioAttackCard);
        cardBoardIa[i].hp -= cardBoardPlayer[randomNumber].atk; // enlève la vie de la carte de l'IA
        cardBoardPlayer[randomNumber].hp -= cardBoardIa[i].atk; // enlève la vie de la carte du joueur
        if (cardBoardIa[i].hp <= 0) { // si les hp de la carte de l'IA est inferieur ou égal à 0, enleve la carte du board
          cardBoardIa[i].deadOnBoard = true;
          history.unshift(cardBoardIa[i]);
          this.setState({ history });
        }
        if (cardBoardPlayer[randomNumber].hp <= 0) { // si les hp de la carte de du joueur est inferieur ou égal à 0, enleve la carte du board
          cardBoardPlayer[randomNumber].deadOnBoard = true;
          history.unshift(cardBoardPlayer[randomNumber]);
          this.setState({ history });
        }
      }
      if (cardBoardPlayer.length !== 0) {
        cardBoardIa[i].isFighting = false;
        cardBoardPlayer[randomNumber].isFighting = false;
      }
      this.setState({ cardsAvalaibleForIA: newDeckIa, heroesChosen: newHeroesChosen });
    }
    newDeckIa.forEach(heroe => { // si valeur deadOnBoard = true, changement de la clé position à 'dead' pour les cartes de l'IA.
      if (heroe.deadOnBoard) {
        heroe.position = 'dead';
        heroe.deadOnBoard = false;
      }
    });
    newHeroesChosen.forEach(heroe => { // si valeur deadOnBoard = true, changement de la clé position à 'dead' pour les cartes du joueur
      if (heroe.deadOnBoard) {
        heroe.position = 'dead';
        heroe.deadOnBoard = false;
      }
    });
    this.endGameVerify();
    this.setState({ cardsAvalaibleForIA: newDeckIa, heroesChosen: newHeroesChosen, iaAttack: false });
    return Promise.resolve();
  }

  handleIaTurn = async () => {
    this.props.onPlayEffects(this.props.audioIaTurn);
    if (this.state.endGame === undefined) {
      if (this.state.isAllowedToPutCardOnBoard) {
        this.handleHandToBoardPlayer();
      }

      this.setState({ playerTurn: false }); // set le state de playerTurn à false pour permettre à l'IA de débloquer ses actions.
      const heroesSelected = this.state.heroesChosen.map(heroe => {
        return { ...heroe, selected: false, isAbleToAttack: true };
      });

      this.setState({ heroesChosen: heroesSelected, lastCard: undefined });
      await delay(1000);
      this.handleDraw(this.state.cardsAvalaibleForIA);

      await delay(1000);
      this.handleHandToBoardIa();

      await delay(1000);
      await this.attackCardIa();

      await delay(1000);
      this.setState({ playerTurn: true });
      this.handleDraw(this.state.heroesChosen);
      this.setState({ isAllowedToPutCardOnBoard: true });
      if (this.state.endGame === undefined) {
        this.setState({ isYourTurnDisplay: true });
        this.props.onPlayEffects(this.props.audioPlayerTurn);
      }

      await delay(2000);
      this.setState({ isYourTurnDisplay: false });
    }
  }

  handleSelectedCard = (nameSelected) => {
    const newHeroesChosen = this.state.heroesChosen.map(
      heroe => {
        if (heroe.isAbleToAttack) {
          if (heroe.name === nameSelected && !heroe.iaDeck) {
            this.props.onPlayEffects(this.props.audioSelect);
            return { ...heroe, selected: true };
          } else {
            return { ...heroe, selected: false, lastCard: false };
          }
        } else {
          return { ...heroe, selected: false, lastCard: false };
        }
      }
    );
    this.setState({ heroesChosen: newHeroesChosen });
  }// on veut qu'une carte en attaque une autre une seule fois. Elle ne peut plus être sélectionnée après avoir attaqué pendant la phase d'attaque.

  handleAttackIaCard = (name) => { // player attack
    const heroesChosen = this.state.heroesChosen;
    const cardsAvalaibleForIA = this.state.cardsAvalaibleForIA;
    const history = this.state.history.slice();
    const playerCardSelected = heroesChosen.filter(heroe => heroe.selected === true)[0];
    if (heroesChosen.filter(heroe => heroe.selected === true).length !== 0) {
      cardsAvalaibleForIA.map( async (heroeIa) => {
        if (heroeIa.name === name) {
          heroeIa.isFighting = true;
          playerCardSelected.isFighting = true;
          playerCardSelected.selected = false;
          this.setState({ cardsAvalaibleForIA, heroesChosen });
          await delay(1000);
          // on veut récupérer l'attaque de la carte sélectionnée et la vie de l'attaque adverse. Et en déduire le nombre de point de vie à retirer sur la carte adverse. Et vice versa.
          heroeIa.hp -= playerCardSelected.atk;
          playerCardSelected.hp -= heroeIa.atk;
          playerCardSelected.isAbleToAttack = false;
          this.props.onPlayEffects(this.props.audioAttackCard);
          if (heroeIa.hp <= 0) { // on veut changer la valeur de la clé position à 'dead' pour les cartes dont les hp sont <= 0.
            heroeIa.position = 'dead';
            history.unshift(heroeIa);
            this.setState({ history });
          }
          if (playerCardSelected.hp <= 0) {
            playerCardSelected.position = 'dead';
            history.unshift(playerCardSelected);
            this.setState({ history });
          }
          heroeIa.isFighting = false;
          playerCardSelected.isFighting = false;
          this.setState({ cardsAvalaibleForIA, heroesChosen });
        }
      });
      this.endGameVerify();
      this.setState({ cardsAvalaibleForIA, heroesChosen, lastCard: undefined });
    }
  }

  render () {
    return (
      <div className='deckBoard'>
        <div className='leftBoardContainer'>
          <a className='button-config' id='button-rageQuit' href='http://localhost:3000/'>Rage Quit</a> {/* https://cards-battle-of-heroes-us11.netlify.app */}
          <aside className='dead-card-container'> {/* Cimetiere */}
            <History history={this.state.history} />
          </aside>
        </div>
        <div className='centerBoardContainer'> {/* Board Total */}
          <div className='iahand'> {/* hand of computer */}
            <HandCards heroesChosen={this.state.cardsAvalaibleForIA} randomizeHeroesChosen={this.randomizeHeroesChosen} />
          </div>
          <div className='boardContainer'>
            <div className='boardia'> {/* board of computer */}
              <Board heroesChosen={this.state.cardsAvalaibleForIA} onSelectedCard={this.handleSelectedCard} onAttackIaCard={this.handleAttackIaCard} />
            </div>
            {this.state.isYourTurnDisplay && <p className='playerTurn'><PlayerTurn playerTurn={this.state.playerTurn} pseudo={this.props.pseudo} /></p>}
            <div className='boardPlayer1'> {/* board of Player1 */}
              <Board heroesChosen={this.state.heroesChosen} onSelectedCard={this.handleSelectedCard} playerTurn={this.state.playerTurn} />
            </div>
          </div>
          <div className='player1hand'> {/* hand of Player1 */}
            <HandCards heroesChosen={this.state.heroesChosen} lastCard={this.state.lastCard} switchCards={this.switchCards} onHandToBoard={this.handleHandToBoard} playerTurn={this.state.playerTurn} />
          </div>
        </div>
        <div className='rightBoardContainer'> {/* right board container : decks, timer, "End Turn" button, pseudos */}
          <div className='deckia'>
            <HiddenCards deck={this.state.cardsAvalaibleForIA} />
          </div>
          <div className='timerAndEndTurn'>
            <div className='timer-container'>
              {(this.state.playerTurn && this.state.endGame === undefined) && <Timer onFinish={this.handleIaTurn} />}
            </div>
            <button className='button-config' id='button-endTurn' onClick={this.state.playerTurn ? this.handleIaTurn : () => { }}>End Turn</button>
          </div>
          <div className='deckplayer1'>
            <HiddenCards deck={this.state.heroesChosen} />
          </div>
        </div>
        <Modals showModal={this.state.showModal} endGame={this.state.endGame} />
      </div>
    );
  }
}

const Modals = ({ showModal, endGame }) => {
  const showHideClassName = showModal ? 'modal display-block' : 'modal display-none';
  let endGameTitle = '';
  let enGameImage = '';
  if (endGame === 'equality') {
    endGameTitle = 'Fatali ... equality !';
    enGameImage = 'https://media.giphy.com/media/6w6TEAATeBik8/giphy.gif';
  } else if (endGame === 'lose') {
    endGameTitle = 'Sucker, noob !';
    enGameImage = 'https://media.giphy.com/media/mcH0upG1TeEak/giphy.gif';
  } else if (endGame === 'win') {
    endGameTitle = 'You\'ve goat it !';
    enGameImage = 'https://media.giphy.com/media/3hvmlYNsOTFWE/giphy.gif';
  }
  return (
    <div className={showHideClassName}>
      <section id='enGame-settings' className='modal-main'>
        <h2>{endGameTitle}</h2>
        <div className='endGameImg-Container'>
          <img src={enGameImage} alt={endGame} />
        </div>
        <div className='button-modal-container'>
          <button type='button' className='button-config'><a className='return-home' href='http://localhost:3000'>Return Home</a></button>
        </div>
      </section>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

export default DeckBoard;
