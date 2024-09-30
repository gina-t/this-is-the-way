const appId = "cedce459"
const appKey = "5f4e1ff5dd8f35e92b6586c480a8221c"
const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const recipeName = searchInput.value
    fetch(`https://api.edamam.com/search?q=${recipeName}&app_id=${appId}&app_key=${appKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
});