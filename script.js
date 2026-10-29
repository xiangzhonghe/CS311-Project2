const loadBtn = document.querySelector("#loadBtn");
const dataContainer = document.querySelector("#dataContainer");
const errorDisplay = document.querySelector("#errorDisplay");

loadBtn.addEventListener("click", loadPokemonData);

async function loadPokemonData() {
    errorDisplay.textContent = "";
    dataContainer.innerHTML = "";

    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=24");
        if (!response.ok) {
            throw new Error("Failed to retrieve data from API");
        }
        const data = await response.json();
        const pokemonList = data.results;

        for (const pokemon of pokemonList) {
            const detailRes = await fetch(pokemon.url);
            const detail = await detailRes.json();

            const cardDiv = document.createElement("div");
            cardDiv.className = "country-card";

            const nameH3 = document.createElement("h3");
            nameH3.textContent = detail.name;

            const idPara = document.createElement("p");
            idPara.textContent = `ID: ${detail.id}`;

            const typePara = document.createElement("p");
            const types = detail.types.map(t => t.type.name).join(", ");
            typePara.textContent = `Type: ${types}`;

            const img = document.createElement("img");
            img.src = detail.sprites.front_default;
            img.alt = detail.name;
            img.style.width = "100%";

            cardDiv.appendChild(img);
            cardDiv.appendChild(nameH3);
            cardDiv.appendChild(idPara);
            cardDiv.appendChild(typePara);
            dataContainer.appendChild(cardDiv);
        }
    } catch (err) {
        errorDisplay.textContent = `Error: ${err.message}`;
    }
}