// Initialize the variables
const id = sessionStorage.getItem("id");
const appId = sessionStorage.getItem("app_id");
const appKey = sessionStorage.getItem("app_key");
console.log(id);
// Initialize the URL
const searchURL = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${appId}&app_key=${appKey}`;// 
const url = new URL(searchURL);
console.log(url);
const loadingElement = document.getElementById('loading'); 

fetch(url)
.then((response) => {
  // Check if the request was successful
  if (response.status === 200) {
    // Hide the loading element
    loadingElement.style.display = "none";
    return response.json(); // Parse the JSON response
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
})
.then((data) => {
  console.log(data);
  // Get the recipe object
  const recipe = data.recipe;
  // access the recipe object
  if (recipe) {
    document.getElementById('recipeName').innerHTML = recipe.label;
    document.getElementById('recipeImage').src = recipe.image;
    document.getElementById('recipeIngredients').innerHTML = recipe.ingredients; 
  } else {
    console.error("No recipes found.");
  }
})
.catch((error) => {
  console.error("Error:", error);
});