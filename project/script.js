const appId = "cedce459";
const appKey = "e93aac63d73b564bcfe32a88afade910";
const submitButton = document.getElementById('submit');
const results = document.getElementById("results");

sessionStorage.setItem("app_id", appId);
sessionStorage.setItem("app_key", appKey);

submitButton.addEventListener('click', () => {
    const ingredient = document.getElementById('ingredient').value.trim();
    if (!ingredient) {
        alert("Please enter an ingredient.");
        return;
    }
    
    const searchURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=${appId}&app_key=${appKey}`;
    const url = new URL(searchURL);
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status code ${response.status}`);
            }
        })
        .then((data) => {
            let recipedetails = "";
            data.hits.forEach((recipe) => {
                const label = recipe.recipe.label;
                const image = recipe.recipe.image;
                const uri = recipe.recipe.uri;
                recipedetails += `
                    <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow w-80 h-80 overflow-y-auto">
                        <div class="px-4 py-5 sm:px-6">
                            <h2 class="text-lg font-medium text-gray-900">${label}</h2>  
                        </div>
                        <div class="px-4 py-5 sm:p-6">
                            <img src="${image}" alt="${label}" class="rounded-lg border-2 border-gray-400 scale-75">
                        </div>
                        <div class="px-4 py-4 sm:px-6">
                            <button class="viewRecipe" data-uri="${uri}">View Recipe</button>
                        </div>`;
            });            
            results.innerHTML = recipedetails;
            const viewRecipeButtons = document.querySelectorAll('.viewRecipe');
            viewRecipeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const uri = this.getAttribute('data-uri');
                    viewRecipe(uri);
                });
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
function viewRecipe(uri) {
    const id = uri.split("_")[1];
    sessionStorage.setItem("id", id);
    window.location.href = "recipe.html";
};
                
