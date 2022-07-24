import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import styles from './CharacterGrid.module.css'
import {Character, CharacterImage} from '../../interfaces/interfaces'

const LazyCard = dynamic(() => import('./CharacterCard/CharacterCard'))

interface Characters {
    characters:  Character[] | null,
    images: CharacterImage[] | null,
}


const CharacterGrid = ({characters, images}:Characters ) => {
  return (
    <section className={styles.charactersGrid}>
        {characters && characters.map(c => <LazyCard key={c.name}  character={c} image={images?.find(i => i.name === c.name)} />)}
    </section>
  )
}

export default CharacterGrid