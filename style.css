async function searchMovie(){

    const movie =
    document.getElementById("searchInput").value;

    const result =
    document.getElementById("result");

    if(movie===""){
        alert("Enter a movie name");
        return;
    }

    const response =
    await fetch(
    `https://api.tvmaze.com/search/shows?q=${movie}`
    );

    const data =
    await response.json();

    if(data.length===0){

        result.innerHTML=
        "<h2>No Results Found</h2>";

        return;
    }

    const show = data[0].show;

    result.innerHTML=`

    <div class="card">

        <img src="${show.image ?
        show.image.medium :
        ''}">

        <h2>${show.name}</h2>

        <p>
        <b>Language:</b>
        ${show.language}
        </p>

        <p>
        <b>Rating:</b>
        ${show.rating.average || "N/A"}
        </p>

        <p>
        <b>Genres:</b>
        ${show.genres.join(", ")}
        </p>

        <p>
        ${show.summary || ""}
        </p>

    </div>
    `;
}
