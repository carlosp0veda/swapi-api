import React from 'react'
import styles from '../styles/404.module.css'
import Link from 'next/link'

const Custom404 = () => {
  return (
    <div className={styles.custom404Container}>
        <div><span className={styles.number}>4</span><span className={styles.symbol}>#</span><span className={styles.number}>4</span></div>
        <h3 className={styles.text}>There was a problem in the galaxy, please go back home.</h3>
        <Link href='/'><div className={styles.homeButton}>GO HOME</div></Link>
    </div>
  )
}

export default Custom404