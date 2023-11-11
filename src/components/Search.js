import React from 'react';

const Home = ({ pokemon, loading, infoPokemon, onLike }) => {
  return (
    <div className="container">
      <h1 className="main-heading">Pokemon Info</h1>
      <div className="search-container" style={{ float: 'left', marginRight: '1rem' }}>
        {/* Search input and button go here */}
      </div>
      <div className="left-content">
        {/* Display pokemons using Card component */}
        {/* Add necessary props like pokemon, loading, infoPokemon, and onLike */}
      </div>
      <div className="btn-group">
        {/* Previous and Next buttons go here */}
      </div>
      <div className="right-content">
        {/* Display Pokeinfo for selected pokemon */}
      </div>
    </div>
  );
};

export default Home;