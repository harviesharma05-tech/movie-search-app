const API_KEY = "YOUR_API_KEY";

async function searchMovie(){

    const movie =
    document.getElementById("movieInput").value;

    const result =
    document.getElementById("movieResult");

    if(movie===""){
        alert("Enter movie name");
        return;
    }

    const response = await fetch(
    `https://www.omdbapi.com/?t=${movie}&apikey=${API_KEY}`
    );

    const data = await response.json();

    if(data.Response === "False"){
        result.innerHTML =
        "<h2>Movie Not Found</h2>";
        return;
    }

    result.innerHTML = `
    <div class="movie-card">

        <img src="${data.Poster}"
        alt="${data.Title}">

        <h2>${data.Title}</h2>

        <p><b>Year:</b> ${data.Year}</p>

        <p><b>Genre:</b> ${data.Genre}</p>

        <p><b>IMDB Rating:</b> ${data.imdbRating}</p>

        <p>${data.Plot}</p>

    </div>
    `;
}
