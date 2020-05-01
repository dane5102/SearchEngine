import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {
  
  //API KEY required to make authenticated and verified queries
  // const APP_ID = '975eb510';
  const APP_KEY = '94b1d9b2d93544768d3a53ecdafce872';

  
  const [recipes, setRecipes] = useState([]);//This state will hold the array of recipe objects retrieved from the query
  const [search, setSearch] = useState(""); //This is the state for the search bar
  const [query, setQuery] = useState('chicken'); //This is the default state for the search

  //This will generate the actual queries and return JSON formatted response. The recipes state will then be set to an array of JSON objects
  const getRecipes = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/search?query=${query}&number=10&apiKey=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.results);
    };
  
  //This will update the search value when the user is typing through the onChange EventListener
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  //This will change the query state to whatever the new search value is and reset search to empty
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  //React Lifecylce method to only rerender when the query value changes. This will only happen upon form submit
  useEffect(() => {
    getRecipes();
    console.log("Refreshed");
  }, [query]);

  //
  const getRecipeIngredients = async (id) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APP_KEY}`);
    const data = await response.json();
    return data.extendedIngredients;
  };
  

  

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <label style={{fontWeight: 'bold', fontSize: 36, margin: 40}} for="searchBar">Recipe Finder</label>
        <input id="searchBar" className="search-bar" type="text" placeholder = "Enter type of dish..."value={search} onChange={updateSearch}/>
        <button className="search-button" type = "submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
      <Recipe 
        key={recipe.title} 
        title={recipe.title}
        calories={recipe.calories} 
        image={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`} 
        ingredients={getRecipeIngredients(recipe.id)}
        url = {recipe.sourceUrl}/>))}
      </div>
    </div>
  );
}

export default App;
