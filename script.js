const result = document.getElementById("result");
const loader = document.getElementById("loader");
const historyList = document.getElementById("historyList");
const favoritesContainer = document.getElementById("favorites");

let history =
JSON.parse(localStorage.getItem("history")) || [];

let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];

document
.getElementById("searchInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        searchMovie();
    }

});

document
.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("light");

});

async function searchMovie(){

    const movie =
    document.getElementById("searchInput")
    .value
    .trim();

    if(movie === ""){
        alert("Please enter a movie name");
        return;
    }

    saveHistory(movie);

    loader.classList.remove("hidden");

    result.innerHTML = "";

    try{

        const response =
        await fetch(
        `https://api.tvmaze.com/search/shows?q=${movie}`
        );

        const data =
        await response.json();

        loader.classList.add("hidden");

        if(data.length === 0){

            result.innerHTML =
            "<h2>No Results Found</h2>";

            return;
        }

        displayMovies(data);

    }
    catch(error){

        loader.classList.add("hidden");

        result.innerHTML =
        "<h2>Error fetching data</h2>";

        console.log(error);

    }
}

function displayMovies(movies){

    result.innerHTML = "";

    movies.forEach(item => {

        const show = item.show;

        const image =
        show.image
        ? show.image.medium
        : "https://via.placeholder.com/210x295?text=No+Image";

        const summary =
        show.summary
        ? show.summary.replace(/<[^>]*>/g, "")
        : "No description available.";

        const card =
        document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `

            <img src="${image}" alt="${show.name}">

            <h3>${show.name}</h3>

            <p><b>⭐ Rating:</b>
            ${show.rating.average || "N/A"}</p>

            <p><b>🌎 Language:</b>
            ${show.language}</p>

            <p><b>🎭 Genres:</b>
            ${show.genres.join(", ")}</p>

            <p><b>📅 Premiered:</b>
            ${show.premiered || "N/A"}</p>

            <p><b>📺 Status:</b>
            ${show.status}</p>

            <p>
            ${summary.substring(0,150)}...
            </p>

            <button
            onclick='addFavorite(${JSON.stringify(show)})'>
            ❤️ Add Favorite
            </button>

        `;

        result.appendChild(card);

    });

}

function saveHistory(search){

    if(!history.includes(search)){

        history.unshift(search);

        if(history.length > 5){

            history.pop();

        }

        localStorage.setItem(
        "history",
        JSON.stringify(history)
        );

    }

    renderHistory();

}

function renderHistory(){

    historyList.innerHTML = "";

    history.forEach(item => {

        const li =
        document.createElement("li");

        li.textContent = item;

        li.style.cursor = "pointer";

        li.onclick = () => {

            document
            .getElementById("searchInput")
            .value = item;

            searchMovie();

        };

        historyList.appendChild(li);

    });

}

function addFavorite(show){

    const exists =
    favorites.find(movie =>
    movie.id === show.id);

    if(exists){

        alert("Already in Favorites");

        return;
    }

    favorites.push(show);

    localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
    );

    renderFavorites();

}

function renderFavorites(){

    favoritesContainer.innerHTML = "";

    favorites.forEach(show => {

        const image =
        show.image
        ? show.image.medium
        : "https://via.placeholder.com/210x295?text=No+Image";

        const card =
        document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `

            <img src="${image}" alt="${show.name}">

            <h3>${show.name}</h3>

            <button
            onclick="removeFavorite(${show.id})">
            Remove
            </button>

        `;

        favoritesContainer.appendChild(card);

    });

}

function removeFavorite(id){

    favorites =
    favorites.filter(movie =>
    movie.id !== id);

    localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
    );

    renderFavorites();

}

renderHistory();
renderFavorites();
