import styles from './TopHeader.module.css'
import SocialLinks from './SocialLinks/SocialLinks'
import Logo from './Logo/Logo'
import SearchBox from './SearchBox/SearchBox'


const TopHeader = () => {
  return (
    <div className={styles.topHeaderGrid}>
        <SocialLinks/>
        <Logo />
        <SearchBox/>
    </div>
  )
}

export default TopHeader