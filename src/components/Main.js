// Main.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import "./App.css";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      await getPokemon(res.data.results);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPokemon = async (results) => {
    const pokemonDetails = await Promise.all(
      results.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );
    setPokeData(pokemonDetails);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );
      const data = response.data;

      if (data && data.sprites && data.sprites.front_default) {
        setPokeData([data]);
      } else {
        console.error("Invalid response format from the API");
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <Router>
      <div className="container">
        <h1 className="main-heading">Pokemon Info</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        <div className="left-content">
          <div className="button-group">
            <Link to={`/page/1`}>
              <button
                disabled={!prevUrl}
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            </Link>

            <Link to={`/page/2`}>
              <button
                disabled={!nextUrl}
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            </Link>
          </div>

          <Routes>
            <Route
              path="/page/:pageNumber"
              element={<Card pokemon={pokeData} loading={loading} infoPokemon={(poke) => setPokeDex(poke)} />}
            />
          </Routes>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </Router>
  );
};

export default Main;
