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

fetch(url.toString()).then (response => response.json()).then (data => console.log(data))









