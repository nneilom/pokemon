// ! теперь работает((

let div = document.querySelector("#app");
let divInfo = document.querySelector(".card-info");

const API = "https://pokeapi.co/api/v2/pokemon";

async function pokemonData() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function getPokemonInfo(pokemonInfo) {
  try {
    const res = await fetch(pokemonInfo);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

pokemonData()
  .then((data) => {
    data.forEach(async (elem) => {
      const pokemonInfo = await getPokemonInfo(elem.url);
      div.innerHTML += `
        <div class="card-profile">
          <h4>${pokemonInfo.name}</h4>
          <button onclick="openCard('${pokemonInfo.name}','${pokemonInfo.height}','${pokemonInfo.types.map(type => type.type.name).join(", ")}','${pokemonInfo.weight}','${pokemonInfo.sprites.front_default}')">See info</button>
        </div>
      `;
    });
  })
  .catch((error) => console.error(error));

function openCard(name, height, types, weight, img) {
  divInfo.style.display = "block";
  divInfo.innerHTML = `
      <div class="cards">
         <span>Имя: ${name}</span>
         <br>
         <span>Рост: ${height}</span>
         <br>
         <span>Типы: ${types}</span>
         <br>
         <span>Вес: ${weight}</span>
         <img src="${img}">
      </div>
   `;
}

