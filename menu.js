fetch('https://api.edamam.com/api/recipes/v2?type=public&beta=true&app_id=2563a2b8&app_key=27f59cd8a60bdc17f0a1745ca62cdf5b&calories=2000')
  .then(response => response.json())
  .then(data => {
    const platos = data.hits;
    platos.forEach(hit => {
      crearMenu(plato);
    });
    crearCarousel();

  })
  .catch(error => {
    console.log(error);
  });