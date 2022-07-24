import styles from './Logo.module.css'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
        <Link href={{pathname: '/', query:{}}}>
            <a>
                <Image src='https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg' alt='Logo' width={192} height={128}/>
            </a>
        </Link>
    </div>
  )
}

export default Logo