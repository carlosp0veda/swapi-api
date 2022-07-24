import React, { useCallback, useEffect, useState } from 'react'
import styles from './character.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import Images from '../../api/characters_images.json'
import Image from 'next/image'
import {getAllCharacters, getCharacter} from '../../../utils/swapiHelper'
import {Character, CharacterImage, Film} from '../../../interfaces/interfaces'
import axios from 'axios'
import { useAxiosFetch } from '../../../utils/useAxios'
import Link from 'next/link'

interface CharacterPageProps {
  character: Character
  image: CharacterImage
}

const Character = ({character, image}: CharacterPageProps) => {
  const [films, setFilms] = useState<Film[]>([])
  const [isPending, setIsPending] = useState<boolean>(true)
  const [homeplanet, setHomeplanet] = useState(null)
  const {loading, data, error}: any = useAxiosFetch(character?.homeworld, 30000)

  const fetchFilms = useCallback(async () => {
    const films =  character.films.map((f: string) => axios.get(f).then(res => res.data).catch(e => new Error(e)).finally(() => setIsPending(false)))
    const resolvedPromises = await Promise.all(films)
    setFilms(resolvedPromises)
  }, [character])
  
  useEffect(()=>{
    fetchFilms()
  },[fetchFilms])

  useEffect(()=>{
    if (data) {
        setHomeplanet(data.name)
    }
},[data])

  return (
    <section className={styles.characterContainer}>
      
    <div className={styles.characterCard}>
    <h2 className={styles.mobileCharacterName}>{character.name}</h2>
      <div className={styles.imageWrapper}>
        <Image src={image.image} alt={character.name} width={300} height={450}/>
      </div>
      <div className={styles.characterInfo}>
        <h2 className={styles.desktopCharacterName}>{character.name}</h2>
        <ul><h3 className={styles.contentTitle}>FILMS</h3> <br/>{!isPending ? films.map(f => <Link href={`/?episode_id=${f.episode_id}`} key={f.title}><li className={styles.link}>{f.title}</li></Link>) : <span>Loading...</span>}</ul>
        <h3 className={styles.contentTitle}>HOMEWORLD <br/><span className={styles.contentText}>{homeplanet}</span></h3>
        <h3 className={styles.contentTitle}>BIRTH YEAR <br/><span className={styles.contentText}>{character.birth_year}</span></h3>
        <h3 className={styles.contentTitle}>LAST UPDATED  <br/><span className={styles.contentText}>{character.edited.substring(0,10)}</span></h3>
      </div>
    </div>
    </section>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getAllCharacters()
  
return {
  paths: data.map(item => ({params:{character:item.name.toLowerCase().replace(/\s/g, '%20')}}))
  ,
  fallback: 'blocking'
};
}

export const getStaticProps: GetStaticProps = async (context) => {

  const data = await getCharacter(context.params?.character)

    return{
      props: {character: data.results[0], image: Images.find(i => i.name === data.results[0].name)},
      revalidate: 300
    }
}

export default Character