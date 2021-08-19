import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';

import './style.css';

const App = () => {
  const APP_ID = '5265b864';
  const APP_KEY = '9f238f0301ee655e5932e21dc4ff47f3';

  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState('');

  const [query, setQuery] = useState('chicken');

  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    const data = await response.json();

    setRecipes(data.hits);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" value={search} onChange={handleSearch} />
        <button>search</button>
      </form>

      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default App;
