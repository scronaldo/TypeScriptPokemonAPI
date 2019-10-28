import React, { Component, createRef } from 'react';
import User from '../interfaces/User.interface'

// new interface for the state
interface SearchState {
   error: boolean; // , or ; - optinal
   pokemon: Pokemon; // prop: another interface
   
}

// nested interface
interface Pokemon {
   name: string;
   numberOfAbilities: number;
   baseExperience: number;
   imageUrl: string;
}




export class PokemonSearch extends Component<User, SearchState> { // REFINING the props TYPEs here
   
   pokemonRef: React.RefObject<HTMLInputElement>;
   
   //init ref
   constructor(props: User){
      super(props);

      // state for pokemons data
      this.state = {
         error: false,
         pokemon: null
         
      }

      this.pokemonRef = React.createRef();
   }



   // handle button for search
   onSearchClick = (): void => {
      const inputValue = this.pokemonRef.current.value;
      fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(
         res => {
            if(res.status != 200) { // if error
               this.setState({
                  error: true
               })
               return
            }

            res.json() // get fetch response obj body
            .then((data) => {
               
               this.setState({
                  error: false,
                  pokemon: {
                    name: data.name,
                    numberOfAbilities: data.abilities.length,
                    baseExperience: data.base_experience,
                    imageUrl: data.sprites.front_default
                  }
                })

            })

         }
      )}

   render() {
      // templates - logic - markupHolders (pre-return stuff)

      // extracting props (destr.)
      const { name: userName, numberOfPokemons} = this.props; // props to consts
      // name renamed to userName
      
      const { error, pokemon } = this.state;
      // const error = this.state.error;
      // const pokemon = this.state.pokemon



      // MAIN MARKUP variable
      let resultMarkup;

    if (error) { // if error assign to resultMarkup = error text
      resultMarkup = <p>Pokemon not found, please try again with other name</p>;
    } else if (this.state.pokemon) { // if have pokemon (not empty obj)
      resultMarkup = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and{' '}
            {pokemon.baseExperience} base experience points
          </p>
        </div>
      );
    }




    
      return (


         <div><p> 
            This {userName}{' '}
             {numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}
             {/* if props exist show that */}

             </p>
             <input type="text" ref={this.pokemonRef} placeholder='pikachu'/>
             <button onClick={this.onSearchClick} className='my-button'>
             Search pokemon by name
             </button>
             {resultMarkup}
             <p>Powered by <a href="https://pokeapi.co/" style={{color: 'green'}}>pokeapi.co</a></p>

             
             </div>
      );
   }
}


export default PokemonSearch;