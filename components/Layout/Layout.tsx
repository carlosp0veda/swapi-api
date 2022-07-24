import React from 'react'
import styles from './Layout.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Head from 'next/head'

interface LayoutProps {
    children: React.ReactNode
}



function Layout({children}: LayoutProps) {

//       const [sideDrawer, setSideDrawer] = useState({
//     showSideDrawer: false,
//   });

//   const sideDrawerCloseHandler = () => {
//     setSideDrawer({ showSideDrawer: false });
//   };

//   const toggleSideDrawerHandler = () => {
//     setSideDrawer((prevState) => {
//       return { showSideDrawer: !prevState.showSideDrawer };
//     });
//   };

    const styleList = [styles.mainGrid, styles.stars]
    return (
        <>
        <Head>
            <title>Star Wars API</title>
        </Head>
        <div className={styles.twinkling}></div>
        <div className={styleList.join(' ')}>
            <div>
                <Header/>
                <main style={{zIndex: 99}}>{children}</main>
                <Footer/>
            </div>
        </div>
        </>
    )
}

export default Layout