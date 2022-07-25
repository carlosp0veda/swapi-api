import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'
import styles from './CharacterGrid.module.css'
import {motion} from 'framer-motion'
import {Character, CharacterImage} from '../../interfaces/interfaces'

const LazyCard = dynamic(() => import('./CharacterCard/CharacterCard'))

interface Characters {
    characters:  Character[] | null,
    images: CharacterImage[] | null,
}


const CharacterGrid = ({characters, images}:Characters ) => {
  return (
    <motion.section  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity:0 }} transition={{ duration: 0.9}} className={styles.charactersGrid}>
        {characters && characters.map(c => <LazyCard key={c.name}  character={c} image={images?.find(i => i.name === c.name)} />)}
    </motion.section>
  )
}

export default CharacterGrid