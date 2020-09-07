const apiUrl =
  "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=88f6ef315f2d376003352ecb882ae5bd&hash=044cf0f1a4329df3001d5f95895141ac&limit=100&offset=0";

let data = [];

const searchBar = document.querySelector("#searchbar");
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filter = data.data.results.filter((character) =>
    character.name.toLowerCase().includes(searchString)
  );
  displayData(filter);
  console.log(filter);
});

async function getData() {
  const response = await fetch(apiUrl);
  data = await response.json();
  console.log(data);

  const characters = data.data.results;
  console.log(characters);
  displayData(characters);
}

const displayData = (characters) => {
  let filteredHTML = "";
  for (character of characters) {
    filteredHTML += `
      <div class="character">
      <h1>${character.name}</h1>
      <a href="${character.urls[0].url}" target="_blank">
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" height="100" class="image" />
      </a>
    </div>
    `;
  }
  document.getElementById("output").innerHTML = filteredHTML;
};

getData();

const heroes = ["Spider-Man", "Iron Man", "Hulk", "Thor", "Captain America"];
let hero = 0;
let letter = 0;
let currentHero = "";
let currentLetter = "";

(function typing() {
  if (hero === heroes.length) {
    hero = 0;
  }
  currentHero = heroes[hero];

  currentLetter = currentHero.slice(0, ++letter);

  document.querySelector("#heroes").textContent = currentLetter;

  if (currentLetter.length === currentHero.length) {
    hero++;
    letter = 0;
  }
  setTimeout(typing, 250);
})();
