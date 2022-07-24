import Link from 'next/link'
import Image from 'next/image'
import styles from './SocialLinks.module.css'

const SocialLinks = () => {
  return (
    <div className={styles.SocialLinksContainer}>
        <ul className={styles.links}>
            <Link href='https://www.facebook.com/StarWars'>
                <a>
                    <Image src="https://static-mh.content.disney.io/starwars/assets/shared/icon_facebook-aec3b685b1a1.svg" alt='Facebook' width={24} height={24}/>
                </a>
            </Link>
            <Link href='https://www.instagram.com/starwars'>
                <a>
                    <Image src="https://static-mh.content.disney.io/starwars/assets/shared/icon_instagram-be8807d03d5f.svg" alt='Instagram' width={24} height={24}/>
                </a>    
            </Link>
            <Link href='https://twitter.com/starwars'>
                <a>
                    <Image src="https://static-mh.content.disney.io/starwars/assets/shared/icon_twitter-bde9a7f5abaa.svg" alt='Twitter' width={24} height={24}/>
                </a>
            </Link>
            <Link href='https://www.youtube.com/user/starwars'>
                <a>
                    <Image src="https://static-mh.content.disney.io/starwars/assets/shared/icon_youtube-ed78c6ee1c7d.svg" alt='YouTube' width={24} height={24}/>
                </a>
            </Link>
            <Link href='https://starwarskids.com/'>
                <div className={styles.kidsContainer}>
                    <Image src="https://static-mh.content.disney.io/starwars/assets/shared/icon_kids-dc39fc54f6c2.svg" alt='YouTube' width={24} height={24}/>
                </div>
            </Link>
        </ul>
    </div>
  )
}

export default SocialLinks