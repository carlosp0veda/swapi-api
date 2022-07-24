import {useEffect, useState} from 'react'
import {useAxiosFetch} from '../../../utils/useAxios'
import styles from './CharacterCard.module.css'
import {Character, CharacterImage} from '../../../interfaces/interfaces';
import Image from 'next/image'
import Link from 'next/link'

interface CharacterCardProps {
    character: Character,
    image: CharacterImage | undefined,
}

const CharacterCard = ({character, image}:CharacterCardProps) => {
    const [homeplanet, setHomeplanet] = useState(null)
    const [validImage, setValidImage] = useState<string | undefined>(image?.image)
    const {loading, data, error}: any = useAxiosFetch(character?.homeworld, 30000)

    useEffect(()=>{
        if (data) {
            setHomeplanet(data.name)
        }
    },[data])
    

  return (
    <>
        { character && image && 
        <article className={styles.card}>
         <Image width={250} height={300} onError={()=>setValidImage('https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png')} src={validImage || 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png'} alt={character.name} />
         <div className={styles.cardInfo}>
            <Link href={`/characters/${character.name.toLowerCase().replace(/\s/g, '%20')}`}>
                <a>{character.name}</a>
            </Link>
            <span>{homeplanet ? `(${homeplanet})` : 'Loading...'}</span>
            </div>
         </article>}
    </>
  )
}

export default CharacterCard