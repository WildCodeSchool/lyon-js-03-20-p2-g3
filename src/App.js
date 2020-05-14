import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Options from './components/Options';
import Rules from './components/Rules';
import DeckChoice from './components/DeckChoice';
import axios from 'axios';
import DeckBoard from './components/DeckBoard';
import HomeMusic from './components/audio/musics/AudioCardsBattleOfHeroes_online-audio-converter.com.mp3';
import DefeatJingle from './components/audio/musics/defeat_jingle.ogg';
import WinJingle from './components/audio/musics/win-jingle.mp3';
import EgalityJingle from './components/audio/musics/egality-jingle.mp3';
import CardTransition from './components/audio/effects/Card_Transition_Out.ogg';
import AttackCardEffect from './components/audio/effects/KingKrush_StompMed_1.ogg';
import Draw from './components/audio/effects/add_card_to_hand_2.ogg';
import SelectSound from './components/audio/effects/select_AI_opponent.ogg';
import IaTurnSound from './components/audio/effects/taunt_shield_up.ogg';
import PlayerTurnSound from './components/audio/effects/hero_weapon_draw.ogg';
import overCards from './OverCards/overCards';
import removeCardSound from './components/audio/effects/text_box_delete_text.ogg';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cards: [],
      deck: [],
      maxPower: 800,
      musicOn: false,
      effectsOn: true,
      musicVolume: 50,
      effectsVolume: 50,
      pseudo: 'Player 1'
    };
  }

  audioMusic = React.createRef();
  audioCardOnBoard = React.createRef();
  audioAttackCard = React.createRef();
  audioDraw = React.createRef();
  audioDefeat = React.createRef();
  audioWin = React.createRef();
  audioEgality = React.createRef();
  audioSelect = React.createRef();
  audioIaTurn = React.createRef();
  audioPlayerTurn = React.createRef();
  audioRemoveCardSound = React.createRef();

  handleEffectsVolume = (event) => {
    let effectsVolume = this.state.effectsVolume;
    effectsVolume = event.target.value;
    this.setState({ effectsVolume });
  }

  handleMusicVolume = (event) => {
    let musicVolume = this.state.musicVolume;
    musicVolume = event.target.value;
    this.setState({ musicVolume });
    this.audioMusic.current.volume = this.state.musicVolume * 0.01;
  }

  handlePlayMusic = () => {
    const audio = this.audioMusic.current;
    audio.volume = this.state.musicVolume * 0.01;
    this.setState({ musicOn: !this.state.musicOn });
    audio.paused ? audio.play() : audio.pause();
  }

  handlePlayEffects = (audioRef) => {
    const audio = audioRef.current;
    audio.volume = this.state.effectsVolume * 0.01;
    if (this.state.effectsOn) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  triggerEffects = () => {
    this.setState({ effectsOn: !this.state.effectsOn });
  }

  handleChangePseudo = (event) => {
    this.setState({ pseudo: event.target.value });
  }

  componentDidMount () {
    this.getHeroesFromAPI();
  }

  getHeroesFromAPI = () => {
    const url = 'https://heroes-api-wrapper.herokuapp.com/heroes?heroIds=354,310,555,711,527,313,638,307,566,381,514,214,561,165,692,341,298,251,107,383,127,30,352,201,196,522,634,627,530,418,551,708,630,599,538,370,398,228,149,480,106,729,309,207,542,333,208,536,431,225,649,60,226,69,678,487,457,145,345,299,361,350,405,602236,620,216717,213,176,581,687,386,414,322,600,303,280,690,467,416,485,423,572,38,697,732,396,275,502';
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        const tabHeroes = [...data, ...overCards].map(heroe => {
          return {
            name: heroe.name,
            img: heroe.image.url,
            atk: parseInt(heroe.powerstats.strength, 10),
            hp: parseInt(heroe.powerstats.durability, 10),
            power: Math.round((parseInt(heroe.powerstats.strength, 10) + parseInt(heroe.powerstats.durability, 10)) / 2),
            position: 'deck',
            deadOnBoard: false,
            selected: false,
            iaDeck: false,
            isFighting: false,
            isAbleToAttack: true // true : la carte est autorisée à attaquer
          };
        });
        this.setState({ cards: tabHeroes });
      });
  }

  addToDeck = (cardName) => {
    let copieDeck = this.state.deck.slice();
    const maxPower = this.state.maxPower;
    const totalPower = this.state.deck.map(card => card.power).reduce((acc, cur) => acc + cur, 0);
    if (copieDeck.filter(heroe => cardName === heroe.name).length === 0) {
      if (totalPower + this.state.cards.filter(heroe => cardName === heroe.name)[0].power <= maxPower) {
        copieDeck.push(this.state.cards.filter(heroe => cardName === heroe.name)[0]);
        this.handlePlayEffects(this.audioDraw);
      } else {
        window.alert('Please, select a less powerful card or start the game');
      }
    } else {
      this.handlePlayEffects(this.audioRemoveCardSound);
      copieDeck = copieDeck.filter(heroe => !cardName.includes(heroe.name));
    }
    this.setState({ deck: copieDeck });
  }

  removeDeck = () => {
    this.setState({ deck: [] });
  }

  render () {
    return (
      <>
        <div className='portrait'>
          <h1 className='h1-home'>Cards Battle of Heroes</h1>
          <img
            className='phone'
            src='https://karagezwebstudio.com/fr/img/rotate.gif'
            alt='turn phone'
          />
        </div>
        <div className='App'>
          <div className='music'>
            <audio loop ref={this.audioMusic} preload='metadata'>
              <source src={HomeMusic} type='audio/mp3' />
            </audio>
            <audio ref={this.audioCardOnBoard} preload='metadata'>
              <source src={CardTransition} type='audio/mp3' />
            </audio>
            <audio ref={this.audioAttackCard} preload='metadata'>
              <source src={AttackCardEffect} type='audio/mp3' />
            </audio>
            <audio ref={this.audioDraw} preload='metadata'>
              <source src={Draw} type='audio/mp3' />
            </audio>
            <audio ref={this.audioDefeat} preload='metadata'>
              <source src={DefeatJingle} type='audio/mp3' />
            </audio>
            <audio ref={this.audioWin} preload='metadata'>
              <source src={WinJingle} type='audio/mp3' />
            </audio>
            <audio ref={this.audioEgality} preload='metadata'>
              <source src={EgalityJingle} type='audio/mp3' />
            </audio>
            <audio ref={this.audioSelect} preload='metadata'>
              <source src={SelectSound} type='audio/mp3' />
            </audio>
            <audio ref={this.audioIaTurn} preload='metadata'>
              <source src={IaTurnSound} type='audio/mp3' />
            </audio>
            <audio ref={this.audioPlayerTurn} preload='metadata'>
              <source src={PlayerTurnSound} type='audio/mp3' />
            </audio>
            <audio ref={this.audioRemoveCardSound} preload='metadata'>
              <source src={removeCardSound} type='audio/mp3' />
            </audio>
          </div>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/options'>
                <Options onPlayMusic={this.handlePlayMusic} onPlayEffects={this.handlePlayEffects} musicOn={this.state.musicOn} effectsOn={this.state.effectsOn} triggerEffects={this.triggerEffects} onMusicVolume={this.handleMusicVolume} musicVolume={this.state.musicVolume} onEffectsVolume={this.handleEffectsVolume} effectsVolume={this.state.effectsVolume} pseudo={this.state.pseudo} onChangePseudo={this.handleChangePseudo} />
              </Route>
              <Route path='/rules' component={Rules} />
              <Route path='/deckchoice'>
                <DeckChoice heroes={this.state.cards} heroesChosen={this.state.deck} addToDeck={this.addToDeck} removeDeck={this.removeDeck} maxPower={this.state.maxPower} pseudo={this.state.pseudo} />
              </Route>
              <Route path='/deckboard'>
                <DeckBoard audioPlayerTurn={this.audioPlayerTurn} audioIaTurn={this.audioIaTurn} audioSelect={this.audioSelect} audioEgality={this.audioEgality} audioWin={this.audioWin} audioDefeat={this.audioDefeat} audioDraw={this.audioDraw} audioAttackCard={this.audioAttackCard} audioCardOnBoard={this.audioCardOnBoard} onPlayEffects={this.handlePlayEffects} lastCard={this.state.lastCard} heroes={this.state.cards} heroesChosen={this.state.deck} removeDeck={this.removeDeck} maxPower={this.state.maxPower} pseudo={this.state.pseudo} />
              </Route>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
