const API = "https://swapi.dev/api/"

//Get Luke Skywalker
export const fetchLuke = async () => {
  const dataFetch = await fetch(`${API}/people/1`)
  const lukeData = await dataFetch.json()
  return lukeData
}

// Get Films
export const fetchFilms = async () => {
  const dataFetch = await fetch(`${API}/films/`)
  const filmData = await dataFetch.json()
  return filmData
};

// Get Starships by pageNum
export const fetchStarshipsByPage = async (pageNum) => {
  const dataFetch = await fetch(`${API}starships/?page=${pageNum}`)
  const starshipData = await dataFetch.json()
  return starshipData
}

//Get Plants
export const fetchPlanets = async (pageNum) => {
  const dataFetch = await fetch(`${API}/planets/?page=${pageNum}`)
  const planetData = await dataFetch.json()
  return planetData.results
}



