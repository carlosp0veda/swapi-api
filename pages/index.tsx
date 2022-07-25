/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router'
import {getAllCharacters, getCharacters, getFilms} from '../utils/swapiHelper'
import Images from './api/characters_images.json'
import {Character, CharacterImage, Film} from '../interfaces/interfaces'
import CharacterGrid from '../components/CharacterGrid/CharacterGrid'
import OpeningCrawl from '../components/OpeningCrawl/OpeningCrawl'
import styles from '../styles/Home.module.css'
import { useEffect, useState, useReducer, useCallback } from 'react'
import reducer from '../store/reducer'
import {ActionTypes} from '../store/actions'
import axios from 'axios'
interface HomePageProps {
  characters:  Character[],
  films: Film[],
  images: CharacterImage[],
  currentPage: number,

}

const Home = (props: HomePageProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [state, dispatch] = useReducer(reducer, props)
  const [isOpeningCrawl, setIsOpeningCrawl] = useState<boolean>(false)
  const [selectedEpisode, setSelectedEpisode] = useState<Film | null>(null)
  const [searchResults, setSearchResults] = useState<Character[] | null>(null)
  const [visibleResults, setVisibleResults] = useState<number>(12);

  const router = useRouter()

  const fetchSearch = useCallback(async () => {
    if (router.query.search) {
    setIsLoading(true)
    const searchResults =  await axios.get(`https://swapi.dev/api/people/?search=${router?.query?.search}`).then(res => res.data).catch(e => new Error(e)).finally(() => setIsLoading(false))
    const resolvedPromise = await Promise.resolve(searchResults)
    setSearchResults(resolvedPromise.results)
    }
  }, [router.query.search])

  useEffect(()=> {
    if (searchResults){
      dispatch({type: ActionTypes.UPDATE_CHARACTER, payload: searchResults})
    } else {
      dispatch({type: ActionTypes.UPDATE_CHARACTER, payload: props.characters})
    }
  },[props.characters, searchResults])

  useEffect(()=>{
    if (selectedEpisode){
      setIsOpeningCrawl(true)
      const crawlTimeout = setTimeout(() => setIsOpeningCrawl(false), 45000)
      return () => clearTimeout(crawlTimeout)
    }
  },[selectedEpisode])

  useEffect(()=> {
    setSelectedEpisode(null)
    setIsOpeningCrawl(false)
    setIsLoading(true)
    const episode = router?.query?.episode_id || null
    const search = router?.query?.search || null
    if (episode) {
    const selectedFilm = props.films.filter(f => f.episode_id.toString() === episode)
    selectedFilm[0].characters.forEach((c: string) => axios.get(c).then(res => res.data))
    setSelectedEpisode(selectedFilm[0])
    const {url} = selectedFilm[0]
    dispatch({type: ActionTypes.UPDATE_CHARACTER, payload: props.characters.filter(c => c.films.includes(url))})    
    } else if (search) {
      fetchSearch()
    } else {
      dispatch({type: ActionTypes.UPDATE_CHARACTER, payload: props.characters})  
    }
    setIsLoading(false)
  },[router?.query, props.films, props.characters, fetchSearch])

  const loadMoreItems = () => {
    setVisibleResults((prev) => prev + 12);
  };

  return (
      <section className={styles.main}>
        {!isLoading && !isOpeningCrawl && selectedEpisode ? <h2 className={styles.episodeTitle}>{selectedEpisode.title} Characters</h2> : null}
        {searchResults && !searchResults.length && <p className={styles.searchNotFound}>ooops! Can't find that character in the galaxy!</p>}
       {!isLoading && !isOpeningCrawl ? <div><CharacterGrid characters={state.characters.slice(0, visibleResults)} images={state.images}/> {visibleResults < state.characters.length && <div className={styles.loadMoreContainer}>
    <button
      className={styles.loadMoreButton}
      onClick={loadMoreItems} >
          Load More...
     </button>
</div>}</div>: null}
       {selectedEpisode && isOpeningCrawl ? <OpeningCrawl episode={selectedEpisode?.episode_id} title={selectedEpisode?.title} text={selectedEpisode?.opening_crawl}/> : null}
      </section>
  )
}

export const getStaticProps = async () => {

  const characterData = await getAllCharacters()
  const filmsData = await getFilms()

    return{
      props: {
      characters: characterData,
      films: filmsData,
      images: Images,
      currentPage: 1,
      },
      revalidate: 900  
    }
}


export default Home
