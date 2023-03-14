

function searchRecipes(searchInput) {
  const baseUrl = createBaseUrl();
  baseUrl.pathname = "/search";

  // Agregar parámetros de búsqueda
  baseUrl.searchParams.set("q", searchInput.value); // Palabra clave de búsqueda
  baseUrl.searchParams.set("from", 0); // Primer resultado
  baseUrl.searchParams.set("to", 10); // Último resultado (máximo 100)
  baseUrl.searchParams.set("health", "alcohol-free"); // Filtro de salud (opcional)

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

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchRecipes(searchInput);
  }
});


let url = createBaseUrl();
url.searchParams.set("type", "public")
url.searchParams.set("q", "meat")
url.searchParams.set("nutrients[ENERC_KCAL]", "2000")

function createBaseUrl(){
  let url = new URL("https://api.edamam.com/api/recipes/v2")
  url.searchParams.set("app_id" , "2563a2b8")
  url.searchParams.set("app_key" , "27f59cd8a60bdc17f0a1745ca62cdf5b")
  return url;
}










