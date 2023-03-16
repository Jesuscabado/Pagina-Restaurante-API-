

export function platoGetRecipes(){
    let recipes = localStorage.getItem("recipes");
    if (recipes === null){
        return[];
    }
    return JSON.parse(recipes);
}

function platoSaveRecipes(recipes){
    let recipesJSON = JSON.stringify(recipes);
    localStorage.setItem("recipes", recipesJSON);
}

export function platoAddRecipes(recipe){
    let recipes = platoGetRecipes();
    if (inList(recipe,recipes !== -1)){
        return;
    }
    recipes.push(recipe);
    platoSaveRecipes(recipes);
}

function inList(recipe,recipes){
    let index = recipes.findindex(element => element.id === recipe.id);
    return index;
}

export function platoDeleteRecipe(recipe){
    let recipes = platoGetRecipes();
    let index = inList(recipe, recipes);
    if (index === -1){
        return;
    }
    recipes.slice(index,1);
    platoSaveRecipes(recipes);
}

export function clearMenu(){
    localStorage.clear();
}