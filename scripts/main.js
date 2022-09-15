import {fetchLuke, fetchFilms, fetchStarshipsByPage, fetchPlanets} from "./starWarsData.js"


const displayLuke = async () => {
  const data = await fetchLuke()
  renderLukeToDOM(data)
}

let html = ''

const renderLukeToDOM = (data) => {
  html += `
    <article>
      <section class="card">
        <p>Name: ${data.name}</p>
        <p>height: ${data.height}</p>
      </section>
    </article>
  `
  document.getElementById('app').innerHTML = html
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

  document.getElementById('app').innerHTML = html

}

const displayStarships = async (num) => {
  const starshipData = await fetchStarshipsByPage(num)
  console.log(`Starship Data: `, starshipData)
  renderStarshipsToDOM(starshipData)
}

const renderStarshipsToDOM = (starships) => {
  console.log(`starship_count: `, starships.results.length)
  html += `
    <article>
      <section class="card">
        <p>There are ${starships.results.length} starships on page #4</p>
      </section>
    </article>
  `
  document.getElementById('app').innerHTML = html
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

let button = document.querySelector('#displayPlanets')

button.addEventListener("click", () => {
  displayPlanetLoop()
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

  for (const planet of planets) {
    html += `
      <article>
        <section class="card">
        <h3>Planet: ${planet.name}
          <ul>
            <li>Diameter: ${planet.diameter}</li>
          </ul>
        </section>
      </article>
    `
  }
  document.getElementById('app').innerHTML = html

}

// await displayLuke()
// await displayFilms()
// await displayStarships(4)
// await displayPlanets()



