
const uri = sessionStorage.getItem("id");
const appId = sessionStorage.getItem("app_id");
const appKey = sessionStorage.getItem("app_key");
const endpoint = sessionStorage.getItem('endpoint');

const url = new URL(endpoint);


let healthLabelButtons = ""; // Initialize healthLabelButtons
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

    data[0].healthLabels.forEach(item => {
      healthLabelButtons += `<button type="button" class="btn btn-warning m-2">${item}</button>`;
    });
    document.getElementById('healthLabels').innerHTML = healthLabelButtons;

    const ulContainer = document.getElementById('ingredients');
    const ulElement = document.createElement("ul");
    ulElement.className = "list-group";
    ulContainer.appendChild(ulElement);
    
    data[0].ingredientLines.forEach(item => {
      const liElement = document.createElement('li');
      liElement.className = "list-group-item";
      liElement.textContent = item;
      ulElement.appendChild(liElement);
    });
    document.getElementById('instructions').src = data[0].url;
  } else {
    console.error("No recipes found.");
  }
})
.catch((error) => {
  console.error("Error:", error);
});