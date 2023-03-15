
/* 
function searchRecipes(searchInput) {
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


async function primerPlato(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "main course");
await mostrarRecetas(url,"primer plato")
}

async function ensaladas(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "salad");
await mostrarRecetas(url,"ensaladas") 
}

async function sandwiches(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "sandwiches");
await mostrarRecetas(url,"sandwiches") 
}

async function postres(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "desserts");
await mostrarRecetas(url,"postres") 
}

async function bebidas(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "drinks");
await mostrarRecetas(url,"drinks") 
}

async function pizzas(){
  let url = createBaseUrl();
  url.searchParams.append("q", "pizza");
await mostrarRecetas(url, "pizza")
}

function createBaseUrl(){
  let url = new URL("https://api.edamam.com/api/recipes/v2")
  url.searchParams.set("app_id" , "2563a2b8")
  url.searchParams.set("app_key" , "27f59cd8a60bdc17f0a1745ca62cdf5b")
  url.searchParams.set("type", "public")
  url.searchParams.set("cuisineType", "Caribbean")
  url.searchParams.set("q", "PineApple")
  url.searchParams.set("random", "true")
  url.searchParams.set("nutrients[ENERC_KCAL]", "1000")
  
  return url;
}

async function getRecipes(url){
  let recipes = await fetch(url.toString()).then (response => response.json()).then(data => {
    return data.hits.map(element => {
      return {
        name: element.recipe.label, 
        image: element.recipe.image,
        url: element.recipe.shareAs,
        id : element.recipe.uri.split("_")[1],
        ingredients: element.recipe.ingredientLines
      };
    });
  })
  console.log(recipes)
  return recipes;
}


async function mostrarRecetas(url, nombre) {
  const recetas = await getRecipes(url);
  const results = document.getElementById("results");
  const comida = document.createElement("section");
  const title = document.createElement("h1");
  title.innerText = nombre;
  comida.setAttribute("id", "sectionComida");
  results.appendChild(title);
  results.appendChild(comida);
  
  recetas.forEach((hit) => {
    let recetaArticle = document.createElement("article");
    let recetaName = document.createElement("h2");
    let recetaImagen = document.createElement("img");
    let recetaUrl = document.createElement("a");
    let recetaIngredients = document.createElement("p");
  
  recetaArticle.classList.add("receta");
 
  recetaName.innerText = hit.name;
  recetaImagen.src = hit.image;
  recetaUrl.setAttribute("href",hit.url);
  recetaUrl.setAttribute("target", "_blank");
  recetaUrl.innerText = "INFO";
  recetaIngredients.innerText = hit.ingredients.join(", ");

  comida.appendChild(recetaArticle);
  recetaArticle.appendChild(recetaName);
  recetaArticle.appendChild(recetaImagen);
  recetaArticle.appendChild(recetaUrl);
  recetaArticle.appendChild(recetaIngredients);
});
}

async function menu(){
  await sandwiches();
  await pizzas();
  await ensaladas();
  await primerPlato();
  await postres();
  await bebidas();
 
}

menu()














