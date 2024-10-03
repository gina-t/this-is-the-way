// Initialize the variables
const id = sessionStorage.getItem("id");
const appId = sessionStorage.getItem("app_id");
const appKey = sessionStorage.getItem("app_key");
const endpoint = sessionStorage.getItem('endpoint');

console.log(id, appId, appKey, endpoint);
// Initialize the URL
const searchURL = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${appId}&app_key=${appKey}`;// 
const url = new URL(searchURL);


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
  if (data.length > 0) {
    document.getElementById('recipeName').innerHTML = data[0].label;
    document.getElementById('recipeImage').src = data[0].image;
    document.getElementById('recipeIngredients').innerHTML = data[0].ingredientLines.join("<br>");
    document.getElementById('recipeInstructions').innerHTML = data[0].url;

    
  } else {
    console.error("No recipes found.");
  }
})
.catch((error) => {
  console.error("Error:", error);
});