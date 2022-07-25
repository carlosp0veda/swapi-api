import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './characters.module.css'
import { Character } from '../../interfaces/interfaces'
import { getAllCharacters } from '../../utils/swapiHelper'

interface AllCharactersPageProps {
  characters: Character[]
}

type GroupedCollection = {
  [key: string]: Character[]
}

const AllCharactersPage = ({characters}:AllCharactersPageProps) => {
  const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','W','Y','Z']
  const [orderedNames, setOrderedNames] = useState<string[]>([])

  

  useEffect(()=>{
    let orderedList = []
    for(let character of characters){//loop throug collection 
      orderedList.push(character.name) 
    }
    orderedList.sort()
    setOrderedNames(orderedList)
  },[characters])


  return (
    <div>
      <h2 className={styles.pageTitle}>ALL CHARACTERS</h2>
      <section className={styles.categoryGrid}>
        {alphabet.map(letter => <ul key={letter} className={styles.categoryTitle}>{letter} <hr/>{orderedNames.filter(n => n.charAt(0) === letter).map(n => <Link href={`/characters/${n}`} key={n}><li className={styles.link}>{n}</li></Link>)}</ul>)}
      </section> 
    </div>
  )
}

export const getStaticProps = async () => {

  const characterData = await getAllCharacters()

    return{
      props: {
      characters: characterData,
      },
      revalidate: 900  
    }
}

export default AllCharactersPage