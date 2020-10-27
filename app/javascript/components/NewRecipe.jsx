import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewRecipe = (props) => {
    const [ recipe, setRecipe ] = useState({
        name: "",
        ingredients: "",
        instruction: ""
    })

    const handleChange = (evt) => 
        setRecipe({...recipe, [evt.target.name]: evt.target.value})

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const url = "/api/v1/recipes/create";
        const { name, ingredients, instruction } = recipe;

        if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
        return;

        const body = {
            name,
            ingredients,
            instruction: instruction.replace(/\n/g, "<br> <br>")
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(response => window.location.href = `/recipe/${response.id}`)
        .catch(error => console.log(error.message));
    }
  
    return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h1 className="font-weight-normal mb-5">
                Add a new recipe to our awesome recipe collection.
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="recipeName">Recipe name</label>
                        <input
                            type="text"
                            name="name"
                            id="recipeName"
                            className="form-control"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipeIngredients">Ingredients</label>
                        <input
                            type="text"
                            name="ingredients"
                            id="recipeIngredients"
                            className="form-control"
                            required
                            onChange={handleChange}
                        />
                        <small id="ingredientsHelp" className="form-text text-muted">
                            Separate each ingredient with a comma.
                        </small>
                    </div>

                    <label htmlFor="instruction">Preparation Instructions</label>
                    <textarea
                        className="form-control"
                        id="instruction"
                        name="instruction"
                        rows="5"
                        required
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn custom-button mt-3">
                        Create Recipe
                    </button>

                    <Link to="/recipes" className="btn btn-link mt-3">
                        Back to recipes
                    </Link>
                </form>
            </div>
        </div>
  </div>
  )
}

export default NewRecipe;