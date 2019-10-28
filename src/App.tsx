import React, {Component} from 'react';
import './App.css';
import PokemonSearch from './components/PokemonSearch';

class App extends Component {

 

  render() {
    return (
    <div className="App">
      <PokemonSearch name='API' numberOfPokemons={966}/>
      {/* TODO: make count dynamic */}
    </div>
  )
}
}

export default App;
