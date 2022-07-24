import Link from "next/link";
import styles from './pagination.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import {ACTIONS} from '../../store/actions'

export default function Pagination(props) {
  const { totalPages, currentPage, prevDisabled, nextDisabled, dispatch } = props;

  return (
    <ol className={styles.list}>
      <li className={styles.item}>
        {prevDisabled && <FontAwesomeIcon icon={faAngleDoubleLeft}/>}
        {!prevDisabled && (
          <button className={styles.button} onClick={() => dispatch({type: ACTIONS.PREV})}>
            <i><FontAwesomeIcon icon={faAngleDoubleLeft}/></i>
          </button>
        )}
      </li>
      <li  className={styles.item} style={{padding: "0 8px"}}>
        Página {currentPage} de {totalPages}
      </li>
      <li className={styles.item}>
        {nextDisabled && <FontAwesomeIcon icon={faAngleDoubleRight}/>}
        {!nextDisabled && (
          <button className={styles.button} onClick={() => dispatch({type: ACTIONS.NEXT})}>
            <i><FontAwesomeIcon icon={faAngleDoubleRight}/></i>
          </button>
        )}
      </li>
    </ol>
  );
}