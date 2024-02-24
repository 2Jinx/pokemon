import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const PokemonDetailsPage = () => {
    const [pokeData, setPokeData] = useState(null);
    const {name} = useParams();

    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
          setPokeData(data);
        })
        .catch((error) => {
          console.log('There was an ERROR: ', error);
        });
    }, []);

    return(
        <>
        <h1>Details</h1>
        <h3>{pokeData?.id}</h3>
        <h3>{pokeData?.name}</h3>
        </>
    );  
    
    
  }

  export default PokemonDetailsPage;