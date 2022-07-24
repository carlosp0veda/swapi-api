import SocialLinks from "../Header/TopHeader/SocialLinks/SocialLinks"
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.FooterContainer}>
        <p className={styles.FooterText}>FOLLOW STAR WARS:</p>
        <SocialLinks />
        <p className={styles.FooterText}>TM & © Lucasfilm Ltd. All Rights Reserved</p>
        <div className={styles.FooterLinks}>
          <a className={styles.FooterLink} href="/" target="_blank">
            Terms of Use
          </a>
          <a className={styles.FooterLink} href="/" target="_blank">
            Additional Content Information
          </a>
          <a className={styles.FooterLink} href="/" target="_blank">
            Privacy Policy
          </a>
          <a className={styles.FooterLink} href="/" target="_blank">
            Star Wars at shopDisney
          </a>
          <a className={styles.FooterLink} href="/" target="_blank">
            Star Wars Helpdesk
          </a>
        </div>
      </footer>
    )
  }
  
  export default Footer