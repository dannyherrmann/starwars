import {fetchLuke, fetchFilms, fetchStarshipsByPage, fetchPlanets} from "./starWarsData.js"

const baseHTML = async () => {
  document.getElementById("app").innerHTML = 
  ` 
  <div class="outer">
  <div class="header">
    <h1>Let's learn the ... </h1>
    <img src="styles/starwars-logo.jpg">
    <h1>API !!!</h1>
    </div></div>
    <div class="form">
    <p>Select any API call below and then click the "FETCH API RESULTS" button to display the data</p>
    <p>The "CLEAR API RESULTS" button can be used to clear out the currently displayed API results</p></div>
    <div class="inputs">
    <input id="displayLukeRadio" name="displayOption" type="radio" />
    <label for="displayLukeRadio">Display Luke Skywalker data</label><br>
    <input id ="displayStarshipsRadio" name="displayOption" type="radio" />
    <label for="displayStarshipsRadio">Display the number of starships returned from page 4</label><br>
    <input id="displayFilmsRadio" name="displayOption" type="radio" />
    <label for="displayFilmsRadio">Display all the films and their release date</label><br>
    <input id ="displayPlanetsRadio" name="displayOption" type="radio" />
    <label for="displayPlanetsRadio">List the planets in order of size (diameter) from smallest to largest</label><br><br>
    <button id="runCode" type="button" class="button">FETCH API RESULTS</button>
    <button id="delete" type="button" class="button">CLEAR API RESULTS</button><br><br></div>`
}

baseHTML()

const displayLuke = async () => {
  const data = await fetchLuke()
  renderLukeToDOM(data)
}

const renderLukeToDOM = (data) => {
  document.getElementById('apiResults').innerHTML = ''
  document.getElementById('codeSnippets').innerHTML = ''
  let html = ''
  html += `
  <h3>Star Wars API Results:</h3>
  <div class="results">
    <article id="code">
      <section class="card">
        <p>Name: ${data.name}</p>
        <p>height: ${data.height}</p>
      </section>
    </article></div>
  `
  document.getElementById('apiResults').innerHTML = html
  document.getElementById('codeSnippets').innerHTML = 
  `<h3>JavaScript:</h3>
  <iframe src="fetchLukeCode.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" >
  </iframe>`
}


const displayFilms = async () => {
  const filmData = await fetchFilms()
  console.log('Film Data: ',filmData)
  const filmResults = filmData.results
  console.log('Film Results: ',filmResults)
  renderFilmsToDOM(filmResults)
}

const renderFilmsToDOM = (films) => {
  document.getElementById('apiResults').innerHTML = ''
  document.getElementById('codeSnippets').innerHTML = ''
  let html = `<div class="results"><h3>Star Wars API Results:</h3><br>`
  for (const film of films) {
    html += `
    <article>
      <section class="card">
        <p><b>Title:</b> ${film.title}</p>
        <p><b>Director:</b> ${film.director}</p>
        <p><b>Release Date:</b> ${film.release_date}
        <p><b>Opening Crawl:</b> ${film.opening_crawl}
      </section>
    </article>
  `
  }

  html += `</div>`
  document.getElementById('apiResults').innerHTML = html
  document.getElementById('codeSnippets').innerHTML = `
  <div class="codeSnippetStyle">
  <h3>JavaScript:</h3>
  <img src="styles/films-code.jpg"></div>`

}

const displayStarships = async (num) => {
  const starshipData = await fetchStarshipsByPage(num)
  console.log(`Starship Data: `, starshipData)
  renderStarshipsToDOM(starshipData)
}

const renderStarshipsToDOM = (starships) => {
  document.getElementById('apiResults').innerHTML = ''
  document.getElementById('codeSnippets').innerHTML = ''
  let html = ''
  html += `
  <div class="results">
  <h3>Star Wars API Results:</h3><br>
    <article class="flexItem">
      <section class="card">
        <p>There are ${starships.results.length} starships on page #4</p>
      </section>
    </article></div>
  `
  document.getElementById('apiResults').innerHTML = html
  document.getElementById('codeSnippets').innerHTML = `
  <div class="codeSnippetStyle">
  <h3>JavaScript:</h3>
  <img src="styles/starship-code.jpg"></div>`
}

let runCodeButton = document.querySelector('#runCode')

const planetRadio = document.querySelector('input[id="displayPlanetsRadio"]')
const lukeRadio = document.querySelector('input[id="displayLukeRadio"]')
const starshipRadio = document.querySelector('input[id="displayStarshipsRadio"]')
const filmRadio = document.querySelector('input[id="displayFilmsRadio"]')

runCodeButton.addEventListener("click", () => {
  if (planetRadio.checked) {
    displayPlanetLoop()
    planetRadio.checked = false;
  } else if (lukeRadio.checked) {
    displayLuke()
    lukeRadio.checked = false
  } else if (starshipRadio.checked) {
    displayStarships(4)
    starshipRadio.checked = false
  } else if (filmRadio.checked) {
    displayFilms()
    filmRadio.checked = false
  }
})

const deleteButton = document.querySelector('#delete')

deleteButton.addEventListener("click", () => {
  document.getElementById('apiResults').innerHTML = ''
  document.getElementById('codeSnippets').innerHTML = ''
})

document.addEventListener("click", (event) => {
  if (event.target.id === "showCode") {
    document.getElementById('codeSnippets').innerHTML = `
    <div class="codeSnippetStyle">
    <img src="styles/fetchLukeCode.jpg"></div>
    `
  }
})

const displayPlanetLoop = async () => {
  
  let page = 1
  let allPlanets = []
  let lastResult = []

  do {

    try {

      const data = await fetchPlanets(page)
      lastResult = data
      allPlanets.push(...data.results)
      page++

    } catch (err) {console.error(`Oops, something is wrong ${err}`)}

  } while (lastResult.next !== null)

  allPlanets.sort((a,b) => a.diameter - b.diameter)
  renderPlanetsToDOM(allPlanets)

}

const renderPlanetsToDOM = (planets) => {
  document.getElementById('apiResults').innerHTML = ''
  document.getElementById('codeSnippets').innerHTML = ''
  let html = `<h3>Star Wars API Results:</h3><div class="results">`
  let planetNum = 1
  for (const planet of planets) {
    html += 
    ` Planet #${planetNum}: ${planet.name}<br>
      Diameter: ${planet.diameter}<br><br>`

      planetNum++
  }
  html += `</div>`

  document.getElementById('apiResults').innerHTML = html
  document.getElementById('codeSnippets').innerHTML = `<h3>JavaScript:</h3><iframe src="fetchPlanetsCode.html" name="targetframe" allowTransparency="true" scrolling="yes" frameborder="0" >
  </iframe>`

}



