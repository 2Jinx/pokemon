import Pokemons from './Pokemons.jsx'
import PokemonDetailsPage from './pages/details/index.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/pokemon" element={<Pokemons />} />
        <Route path="/details/:name" element={<PokemonDetailsPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
