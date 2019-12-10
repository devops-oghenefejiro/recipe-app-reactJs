import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
  const App = () =>{
  const APP_ID = "a334e316";
  const APP_KEY ="d6575755c16ad320740d2a32cacc33ff 	";

  const [recipe, setRecipes] = useState([]);
  const [search, setSearch] =  useState("");
  const [query, setQuery] = useState('chicken');

    useEffect(( )=>{
    getRecipe();
    
    },[query]);

    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
    };
    const updateSearch = e => {
      setSearch(e.target.value);
     
    }
   const getSearch = e => {
     e.preventDefault();
     setQuery(search);
     setSearch('');
   }
    return(
        <div className="App"> 
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
            {recipe.map(recipe =>(
            <Recipe
              key={recipe.recipe.label} 
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
        ))}
          </div> 
       
        </div>
      );
    }

export default App;
