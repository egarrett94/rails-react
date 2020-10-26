import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recipes = ({ props }) => {
  const [ recipes, setRecipes ] = useState([])

  const mappedRecipes = (recipesList) => recipesList.map((recipe) => <li>{recipe.name}</li>)

  useEffect(() => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(res => {
          setRecipes([...res])
        })
      .catch((err) => console.log(err));
  }, [])

  const allRecipes = recipes.map(({name, image, id}, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <img
          src={image}
          className="card-img-top"
          alt={`${name} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <Link to={`/recipe/${id}`} className="btn custom-button">
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  ));
  
  const noRecipe = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No recipes yet. Why not <Link to="/new_recipe">create one</Link>
      </h4>
    </div>
  );

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Recipes for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular recipes, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
            <Link to="/recipe" className="btn custom-button">
              Create New Recipe
            </Link>
          </div>
          <div className="row">
            {recipes.length > 0 ? allRecipes : noRecipe}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  );
}
export default Recipes;