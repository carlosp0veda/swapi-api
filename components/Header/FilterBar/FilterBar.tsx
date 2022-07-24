import { FilterItems } from "./FilterItems"
import styles from './FilterBar.module.css'
import Link from 'next/link'

const FilterBar = () => {
  return (
    <nav>
        <ul className={styles.navGrid}>
        {FilterItems.map(l => <Link href={`/?episode_id=${l.episode_id}`} key={l.episode_id}><li className={styles.navLink}>{l.linkText}</li></Link>)}
        </ul>
    </nav>
  )
}

export default FilterBar