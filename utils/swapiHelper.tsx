import axios from 'axios'

const BASE_URL = 'https://swapi.dev/api'

export const getCharacters = async (page: number) => {
    const people = await axios.get(`${BASE_URL}/people/?page=${page}`).then(res => res.data)
    return people
}

export const getCharacter = async (name: string | string[] | undefined) => {
    const character = await axios.get(`${BASE_URL}/people/?search=${name}`).then(res => res.data)
    return character
}

export const getAllCharacters = async () => {
    const all = [];
    let currentPage = `${BASE_URL}/people/?page=1`;
    while (currentPage !== null){
    const paginatedPeople = await axios.get(currentPage).then(res => res.data)
    all.push(...paginatedPeople.results)
    currentPage = paginatedPeople.next
    }
    return all
}

export const getFilms = async () => {
    const films = await axios.get(`${BASE_URL}/films`).then(res => res.data)
    return films.results
}


