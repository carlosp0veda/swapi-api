import { FilterItems } from "./FilterItems"
import {useRouter} from 'next/router'
import styles from './FilterBar.module.css'
import Link from 'next/link'
import { useState, useEffect } from "react"

const FilterBar = () => {
  const [activeEpisode, setActiveEpisode] = useState<string | string[] | null>(null)
  const router = useRouter();  

  useEffect(()=>{
    if (router.query.episode_id) {
      setActiveEpisode(router.query.episode_id)
    } else {
      setActiveEpisode(null)
    }
  },[router.query.episode_id])
  const activeStyles = [styles.navLink, styles.active]

  return (
    <nav>
        <ul className={styles.navGrid}>
        {FilterItems.map(l => <Link href={`/?episode_id=${l.episode_id}`} key={l.episode_id}><li className={activeEpisode && activeEpisode === l.episode_id.toString() ? activeStyles.join(' ') : styles.navLink}>{l.linkText}</li></Link>)}
        </ul>
    </nav>
  )
}

export default FilterBar