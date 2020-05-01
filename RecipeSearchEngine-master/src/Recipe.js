import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories,image, ingredients, url}) => {
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <label className={style.label} for="ingredientsList">Ingredients:</label>
            <p>Calories: {Number.parseFloat(calories).toFixed(2)}</p>
            <a href={url}>Click Here</a>
            <img className={style.image} src={image} alt=""></img>
        </div>
    );
} 

export default Recipe;