export interface Character {
    name: string,
    height: string,
    mass: string,
    hair_color:string,
    skin_color:string,
    eye_color:string,
    birth_year:string,
    gender:string,
    homeworld:string,
    films: string[],
    species: string[],
    vehicles: string[],
    starships: string[],
    created: string,
    edited: string,
    url: string,
}

export interface Film {
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    characters: string[],
    planets: string[],
    starships: string[],
    vehicles: string[],
    species: string[],
    created: string,
    edited: string,
    url: string
}

export interface CharacterImage {
    id: number,
    name: string,
    image: string,
}

export interface GlobalState<TData> {
    characters: {
      count: number,
      next: string | null,
      previous: string | null,
      results: Character[],
    }
    films: Film[],
    images: CharacterImage[],
    currentPage: number,
  
  }