import './Pokemons.css';
import React, { useState, useEffect } from 'react';
import pokeball from './pokeball.png'
import pikachu from './pikachu.png'

const Card = ({ url }) => {
  const [pokeData, setPokeData] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPokeData(data);
      })
      .catch((error) => {
        console.log('There was an ERROR: ', error);
      });
  }, [url]);

  
  if (!pokeData) {
    return <div></div>;
  }
  var id = pokeData.id;
  if (parseInt(pokeData.id) < 10) {
    id = `00${pokeData.id}`;
  } else if (parseInt(pokeData.id) < 100) {
    id = `0${pokeData.id}`;
  }

  return (
    <div className='card'>
      <div className='card-name-container'>
        <span className='card-name'>{pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</span>
        <span>#{id}</span>
      </div>
      <img alt={pokeData.name} src={pokeData.sprites.other.home.front_default} />
      <TypeLabel types={pokeData.types} />
    </div>
  );
}

const TypeLabel = ({types}) => {
  return (
    <div className='types'>
      {types.map((type) => <Type type={type.type.name} />)}
    </div>
  );
}

const Type = ({type}) => {
  return (
    <div className={type.toLowerCase()}>
      <span>{type.toUpperCase()}</span>
    </div>
  );
}

function Pokemons() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [searchResultFound, setSearchResultFound] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=351')
      .then(response => response.json())
      .then(allpokemon => {
        setOriginalData(allpokemon.results);
        setData(allpokemon.results);
      })
      .catch((error) => {
        console.log('There was an ERROR: ', error);
      });
  }, []);
  
  const handleChange = (event) => {
    const text = event.target.value.toLowerCase();
    setInputText(text);
    setData(originalData);
  };

  const handleSubmit = () => {
    const filterData = data.filter((pokemon) => pokemon.name.includes(inputText));
    setData(filterData);
    setSearchResultFound(filterData.length > 0);
  };

  return (
    <>
      <div className='container'>
        <p>Who are you looking for?</p>
        <div className='outer-container'>
          <div className='input-container'>
            <input type='text' placeholder='E.g. Pikachu' value={inputText} onChange={handleChange} />
            <button onClick={handleSubmit}>GO</button>
          </div>
        </div>
        <img src={pokeball} alt='pokeball' />
      </div>
      {searchResultFound ? (
        <div className='card-list'>
          {data.map((pokemon) => <Card key={pokemon.url} url={pokemon.url} />)}
        </div>
      ) : (
        <div className='error-message'>
          <p>Oops! Try again.</p>
          <span>The Pokemon you're looking for is a unicorn. It doesn't exist in this list.</span>
          <img src={pikachu} alt='pikachu'></img>  
        </div>
      )}
    </>
  );
}

export default Pokemons;


