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
import heroes from './components/heroes'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards : heroes.map(heroe => {
        return {
          name : heroe.name,
          img : heroe.image.url,
          atk : heroe.powerstats.combat,
          hp : heroe.powerstats.durability,
          power : heroe.powerstats.power,
          deck : false
        }
      })
    };
  }
  render(){
    console.log(this.state.cards)
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/options" component={Options} />
            <Route path="/rules" component={Rules} />
            <Route path="/deckchoice" >
              <DeckChoice heroes={this.state.cards}/>
            </Route>
          </Switch>
      </Router>
      </div>
    );
  }

}

export default App;

