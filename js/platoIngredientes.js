import { platoGetRecipes, platoAddRecipes } from "./platos.js";



function createBaseUrl(){
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    let url = new URL("https://api.edamam.com/api/recipes/v2/" +id)
    url.searchParams.set("app_id" , "2563a2b8")
    url.searchParams.set("app_key" , "27f59cd8a60bdc17f0a1745ca62cdf5b")
    url.searchParams.set("type", "public")
    return url;
}

async function getRecipes(url){
    let recipes = await fetch(url.toString())
    .then (response => response.json())
    .then(element => {
        return {
          name: element.recipe.label, 
          image: element.recipe.image,
          id : element.recipe.uri.split("_")[1],
          ingredients: element.recipe.ingredientLines
        };
      });
    return recipes;
}

async function mostrarRecetas(url) {
    const receta = await getRecipes(url);
    const results = document.getElementById("results");
    const comida = document.createElement("section");
    const title = document.createElement("h1");
    const lista = document.createElement("ul");
    const button = document.createElement('button'); 
    button.type = 'button'; 
    button.innerText = 'añadir al carrito'; 
    title.innerText = receta.name.replace(/\srecipe[s]?/gim, "")
    .replace(/,[s]*/g, ", ");
    comida.setAttribute("id", "sectionComida");
    results.appendChild(title);
    results.appendChild(comida);
    const recetaImagen = document.createElement("img");
    button.addEventListener("click",() => platoAddRecipes(receta)); 
    receta.ingredients.forEach((element) => {
        let ingredient = document.createElement("li");
        ingredient.innerText = element;
        lista.appendChild(ingredient);  
    });

    recetaImagen.src = receta.image;
    results.appendChild(title);
    results.appendChild(recetaImagen);
    results.appendChild(button);
    results.appendChild(lista);

  
}

let url = createBaseUrl();
mostrarRecetas(url);

