import React, { useEffect, useState } from 'react'
import styles from './character.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import Images from '../../api/characters_images.json'
import Image from 'next/image'
import {getAllCharacters, getCharacter} from '../../../utils/swapiHelper'
import {Character, CharacterImage, Film} from '../../../interfaces/interfaces'
import axios from 'axios'
import { useAxiosFetch } from '../../../hooks/useAxios'
import Link from 'next/link'
import {motion} from 'framer-motion'

interface CharacterPageProps {
  character: Character
  image: CharacterImage
  films: Film[]
}

const Character = ({character, image, films}: CharacterPageProps) => {
  const [homeplanet, setHomeplanet] = useState(null)
  const {data}: any = useAxiosFetch(character?.homeworld, 30000)

  useEffect(()=>{
    if (data) {
        setHomeplanet(data.name)
    }
},[data])

  return (
    <>
      <div className={styles.breadcrumbContainer}><Link href={'/characters'}><span className={styles.AllCharactersLink}>Characters </span></Link><span className={styles.SelectedCharacter}>{character.name}</span></div>
      <motion.section  initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.7 }} className={styles.characterContainer}>
      <div className={styles.characterCard}>
      <h2 className={styles.mobileCharacterName}>{character.name}</h2>
      <h3 className={styles.mobileCharacterNameMandalorian}>{character.name}</h3>
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{opacity: 0, scale:0}} transition={{ duration: 0.8 }} className={styles.imageWrapper}>
          <Image src={image.image} alt={character.name} width={300} height={450} />
        </motion.div>
        <div className={styles.characterInfo}>
          <h2 className={styles.desktopCharacterName}>{character.name}<span className={styles.desktopCharacterNameMandalorian}><br/>{character.name}</span></h2>
          <ul><h3 className={styles.contentTitle}>FILMS</h3> <br/>{films.map(f => <Link href={`/?episode_id=${f.episode_id}`} key={f.title}><li className={styles.link}>{f.title}</li></Link>)}</ul>
          <h3 className={styles.contentTitle}>HOMEWORLD <br/><span className={styles.contentText}>{homeplanet}</span></h3>
          <h3 className={styles.contentTitle}>BIRTH YEAR <br/><span className={styles.contentText}>{character.birth_year}</span></h3>
          <h3 className={styles.contentTitle}>LAST UPDATED  <br/><span className={styles.contentText}>{character.edited.substring(0,10)}</span></h3>
        </div>
      </div>
    </motion.section>
    </>
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
  const promises =  data.results[0].films.map((f: string) => axios.get(f).then(res => res.data).catch(e => new Error(e)))
  const films = await Promise.all(promises)

    return{
      props: {character: data.results[0], image: Images.find(i => i.name === data.results[0].name), films},
      revalidate: 300
    }
}

export default Character