

/* function searchRecipes(searchInput) {
  const baseUrl = createBaseUrl();
  baseUrl.pathname = "/search";

  // Agregar parámetros de búsqueda
  baseUrl.searchParams.set("q", searchInput.value); // Palabra clave de búsqueda
  baseUrl.searchParams.set("from", 0); // Primer resultado
  baseUrl.searchParams.set("to", 10); // Último resultado (máximo 100)


  // Realizar solicitud a la API
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      // Procesar resultados de la búsqueda
      console.log(data.hits);
    })
    .catch(error => {
      console.error(error);
    });
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("Enter", event => {
  if (event.key === "Enter") {
    searchRecipes(searchInput);
  }
}); */
let url = createBaseUrl();


function createBaseUrl(){
  let url = new URL("https://api.edamam.com/api/recipes/v2")
  url.searchParams.set("app_id" , "2563a2b8")
  url.searchParams.set("app_key" , "27f59cd8a60bdc17f0a1745ca62cdf5b")
  url.searchParams.set("type", "public")
  url.searchParams.set("q", "meat")
  url.searchParams.set("nutrients[ENERC_KCAL]", "2000")
  return url;
}

async function getRecipes(){
  let recipes = await fetch(url.toString()).then (response => response.json()).then(data => {
    return data.hits.map(element => {
      return {
        name: element.recipe.label,
        image: element.recipe.image,
        url: element.recipe.shareAs,
        id : element.recipe.uri.split("_")[1],
        ingredients: element.recipe.ingredients
      };
    });
  })
  console.log(recipes)
  return recipes;
}

async function mostrarRecetas(){
  const recetas = await getRecipes();
  const results = document.getElementById("results");

  recetas.forEach(hit => {
  let recetaArticle = document.createElement("article");
  recetaArticle.classList.add("receta");
  let recetaName = document.createElement("h2");
  let recetaImagen = document.createElement("img");
  let recetaUrl = document.createElement("a");
 /*  let recetaIngredientes = document.createElement() */
  recetaName.innerText = hit.name;
  recetaImagen.src = hit.image;
  recetaUrl.setAttribute("href",hit.url);
  recetaUrl.setAttribute("target", "_blank");
  recetaUrl.innerText = "INFO";

  results.appendChild(recetaArticle);
  recetaArticle.appendChild(recetaName);
  recetaArticle.appendChild(recetaImagen);
  recetaArticle.appendChild(recetaUrl);

  });
 

}
mostrarRecetas()














