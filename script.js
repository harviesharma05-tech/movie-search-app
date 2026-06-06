async function searchMovie() {

    const movie =
    document.getElementById("searchInput").value;

    const result =
    document.getElementById("result");

    if(movie === ""){
        alert("Enter a movie name");
        return;
    }

    result.innerHTML = "<h2>Loading...</h2>";

    try {

        const response =
        await fetch(`https://api.tvmaze.com/search/shows?q=${movie}`);

        const data =
        await response.json();

        if(data.length === 0){
            result.innerHTML =
            "<h2>No Results Found</h2>";
            return;
        }

        const show = data[0].show;

        const image =
        show.image
        ? show.image.medium
        : "https://via.placeholder.com/250x350?text=No+Image";

        const summary =
        show.summary
        ? show.summary.replace(/<[^>]*>/g, "")
        : "No description available.";

        result.innerHTML = `
        <div class="card">

            <img src="${image}" alt="${show.name}">

            <h2>${show.name}</h2>

            <p><b>Language:</b> ${show.language}</p>

            <p><b>Rating:</b>
            ${show.rating.average || "N/A"}
            </p>

            <p><b>Genres:</b>
            ${show.genres.join(", ")}
            </p>

            <p>${summary}</p>

        </div>
        `;

    }
    catch(error){

        result.innerHTML =
        "<h2>Error loading data</h2>";

        console.log(error);

    }
}
