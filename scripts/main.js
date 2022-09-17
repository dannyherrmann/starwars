import {fetchLuke, fetchFilms, fetchStarshipsByPage, fetchPlanets} from "./starWarsData.js"

const baseHTML = async () => {
  document.getElementById("app").innerHTML = 
  ` <img src="styles/starwars-logo.jpg">
    <h1>Let's learn the Star Wars API !!!</h1>
    <p>Select any API call below and then click the "FETCH API RESULTS" button to display the data</p>
    <p>The "CLEAR API RESULTS" button can be used to clear out the currently displayed results</p>
    <input id ="displayStarshipsRadio" name="displayOption" type="radio" />
    <label for="displayStarshipsRadio">Display the number of starships returned from page 4</label><br>
    <input id ="displayPlanetsRadio" name="displayOption" type="radio" />
    <label for="displayPlanetsRadio">List the planets in order of size (diameter) from smallest to largest</label><br>
    <input id="displayLukeRadio" name="displayOption" type="radio" />
    <label for="displayLukeRadio">Display Luke Skywalker data</label><br><br>
    <button id="runCode" type="button">FETCH API RESULTS</button><br>
    <button id="delete" type="button">CLEAR API RESULTS</button><br><br>`
}

baseHTML()

const displayLuke = async () => {
  const data = await fetchLuke()
  renderLukeToDOM(data)
}

const renderLukeToDOM = (data) => {
  let html = ''
  html += `
    <article id="code">
      <section class="card">
        <p>Name: ${data.name}</p>
        <p>height: ${data.height}</p>
      </section>
    </article><br>
    <button id="showCode" type="button">SHOW CODE</button>
  `
  document.getElementById('apiResults').innerHTML = html
}


const displayFilms = async () => {
  const filmData = await fetchFilms()
  console.log('Film Data: ',filmData)
  const filmResults = filmData.results
  console.log('Film Results: ',filmResults)
  renderFilmsToDOM(filmResults)
}

const renderFilmsToDOM = (films) => {

  for (const film of films) {
    let html = ''
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

  document.getElementById('apiResults').innerHTML = html

}

const displayStarships = async (num) => {
  const starshipData = await fetchStarshipsByPage(num)
  console.log(`Starship Data: `, starshipData)
  renderStarshipsToDOM(starshipData)
}

const renderStarshipsToDOM = (starships) => {
  console.log(`starship_count: `, starships.results.length)
  let html = ''
  html += `
    <article class="flexItem">
      <section class="card">
        <p>There are ${starships.results.length} starships on page #4</p>
      </section>
    </article>
  `
  document.getElementById('apiResults').innerHTML = html
}

// const displayPlanets = async () => {
//   const planetData1 = await fetchPlanets(1)
//   const planetData2 = await fetchPlanets(2)
//   const planetData3 = await fetchPlanets(3)
//   const planetData4 = await fetchPlanets(4)
//   const planetData5 = await fetchPlanets(5)
//   const planetData6 = await fetchPlanets(6)
//   let allPlanets = [...planetData1, ...planetData2, ...planetData3, ...planetData4, ...planetData5, ...planetData6]
//   console.log('allPlanets: ',allPlanets)
//   allPlanets.sort((a, b) => a.diameter - b.diameter)
//   renderPlanetsToDOM(allPlanets)
// }

//call the fetch planets function incrementing the page number each time. 
//each time a page is fetched add it to allPlanets array
//but I need to stop at some point based on something

let runCodeButton = document.querySelector('#runCode')

const planetRadio = document.querySelector('input[id="displayPlanetsRadio"]')
const lukeRadio = document.querySelector('input[id="displayLukeRadio"]')
const starshipRadio = document.querySelector('input[id="displayStarshipsRadio"]')
const showCode = document.querySelector('#showCode')

runCodeButton.addEventListener("click", () => {
  if (planetRadio.checked) {
    displayPlanetBasic(1)
  } else if (lukeRadio.checked) {
    displayLuke()
  } else if (starshipRadio.checked) {
    displayStarships(4)
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
    <img src="styles/fetchLukeCode.jpg">
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

const displayPlanetBasic = async (page) => {
  const data = await fetchPlanets(page)
  const results = data.results
  results.sort((a,b) => a.diameter - b.diameter)
  renderPlanetsToDOM(results)
}

const renderPlanetsToDOM = (planets) => {
  let html = ''
  for (const planet of planets) {
    html += 
    `<article>
    <section class="card">
      <h3>Planet: ${planet.name}
      <ul>
        <li>Diameter: ${planet.diameter}</li>
      </ul>
    </section>
</article>`
  }

  document.getElementById('apiResults').innerHTML = html

}

// await displayLuke()
// await displayFilms()
// await displayStarships(4)
// await displayPlanets()



