
async function primerPlato(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "main course");
await mostrarRecetas(url,"Plato Principal", "plato-principal")
}

async function ensaladas(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "salad");
await mostrarRecetas(url,"Ensaladas", "ensaladas") 
}

async function sandwiches(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "sandwiches");
await mostrarRecetas(url,"Sandwiches", "sandwiches") 
}

async function postres(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "desserts");
await mostrarRecetas(url,"Postres","postres") 
}

async function bebidas(){
  let url = createBaseUrl();
  url.searchParams.append("dishType", "drinks");
await mostrarRecetas(url,"Bebidas", "bebidas") 
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
        id : element.recipe.uri.split("_")[1],
      };
    });
  })
  let posiciones = [0,3,8,11,15,18];
  return recipes.filter((recipe,ind)=> posiciones.includes(ind));
}



async function mostrarRecetas(url, nombre, id) {
  const recetas = await getRecipes(url);
  const results = document.getElementById("results");
  const comida = document.createElement("section");
  const title = document.createElement("h1");
  title.innerText = nombre;
  title.setAttribute("id", id);
  results.appendChild(title);
  results.appendChild(comida);
  
  recetas.forEach((hit) => {
    let recetaArticle = document.createElement("article");
    recetaArticle.style.display = "none";
    let recetaName = document.createElement("h2");
    let recetaImagen = document.createElement("img");
    recetaImagen.onload = function(){ //muestra la imagen  cuando se carga el resto de elementos
      recetaArticle.style.display = "block";

    }
    let recetaUrl = document.createElement("a");
    let Rick = document.createElement("a");
    Rick.href = "https://youtu.be/dQw4w9WgXcQ?t=42autoplay=1&mute=0";
  
  recetaArticle.classList.add("receta");
 
  recetaName.innerText = hit.name.replace(/\srecipe[s]?/gim, "")
  .replace(/,[s]*/g, ", ");
  recetaImagen.src = hit.image;
  recetaUrl.setAttribute("href", "platos.html?id=" + hit.id );
  recetaUrl.setAttribute("target", "_blank")
  Rick.setAttribute("target", "_blank");
  Rick.innerText = "Alergenos";

  comida.appendChild(recetaArticle);
  recetaUrl.appendChild(recetaImagen);
  recetaArticle.appendChild(recetaName);
  recetaArticle.appendChild(recetaUrl);
  recetaArticle.appendChild(Rick);

});
}

async function Cargando(){
  let imgSection = document.createElement("section");
  imgSection.id = "loadImagen";
  let img = document.createElement("img");
  img.src = "../media/imagenes/loading.gif";
  imgSection.appendChild(img)
  document.getElementById("results").appendChild(imgSection);
}

function finalizarCarga(){
  let image = document.getElementById("loadImagen");
  image.remove();
}

async function menu(){
  await Cargando();
  await ensaladas();
  await sandwiches();
  await primerPlato();
  await postres();
  await bebidas();
  finalizarCarga();
 
}

menu()














