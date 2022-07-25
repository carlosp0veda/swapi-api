import React from 'react'
import styles from './Layout.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Head from 'next/head'

interface LayoutProps {
    children: React.ReactNode
}

function Layout({children}: LayoutProps) {

    return (
        <>
        <Head>
            <title>Star Wars API</title>
        </Head>
        <div className={styles.windowWrapper}>
        <div className={styles.twinkling}></div>
        <div className={styles.mainGrid}>
                <Header/>
                <main>{children}</main>
                <Footer/>
        </div>
        </div>
        </>
    )
}

export default Layout