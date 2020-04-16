import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Options from './components/Options';
import Rules from './components/Rules';
import DeckChoice from './components/DeckChoice';
import axios from 'axios';
import heroes from './components/heroes'

/* const heroes = [];
const getHeroes = () => {
  const idHeroe = [2,8,24,29,42,61];
  for (let i = 0 ; i < idHeroe.length ; i++){
    axios
    .get(`https://www.superheroapi.com/api.php/10222211119006297/${idHeroe[i]}`)
    .then(response => response.data)
    .then(data => {
      heroes.push(data)
    });
  } 
}

getHeroes()
console.log(heroes) */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards : heroes.map(heroe => {
        return {
          name : heroe.name,
          img : heroe.image.url,
          atk : parseInt(heroe.powerstats.combat, 10),
          hp : parseInt(heroe.powerstats.durability, 10),
          power : parseInt(heroe.powerstats.power, 10),
        }
      }),
      deck:[],
    };
  }
 



  addToDeck = (event) => {
    let copieDeck = this.state.deck;
    const cardName = event.target.className;
    const maxPower = 300;
    const totalPower = this.state.deck.map(card => card.power).reduce((acc, cur)=> acc + cur , 0);
    if(copieDeck.filter( heroe => cardName.includes(heroe.name)).length === 0){
      if (totalPower + this.state.cards.filter( heroe => cardName.includes(heroe.name))[0].power <= maxPower ){
        copieDeck.push(this.state.cards.filter( heroe => cardName.includes(heroe.name))[0])
      }    
      else{
        alert("la puissance max est dépassé")
      }
    }
    else{
      copieDeck = copieDeck.filter( heroe => !cardName.includes(heroe.name))
    }
    this.setState({ deck: copieDeck }) 
  }
  
  render(){
 
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/options" component={Options} />
            <Route path="/rules" component={Rules} />
            <Route path="/deckchoice" >
              <DeckChoice heroes={this.state.cards} heroesChosen = {this.state.deck} addToDeck={this.addToDeck}/>
            </Route>
          </Switch>
      </Router>
      </div>
    );
  }

}

export default App;
