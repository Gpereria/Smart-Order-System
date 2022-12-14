import { useContext } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext';
import { FaRegUser } from 'react-icons/fa';


export function Header(){

    const { user,signOut } = useContext(AuthContext)
    console.log(user?.email);
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <img src='/LogoHeader.svg' width={190} height={60}></img>
                </Link>
                <div className={styles.userDisplay}>
                    <FaRegUser className={styles.icon} height={30} ></FaRegUser>
                    <h1>{user?.name}</h1>
                </div>

                <nav className={styles.menuNav}>
                    <Link legacyBehavior href='/category'>
                        <a>Nova Categoria</a>
                    </Link>
                    <Link legacyBehavior href='/product'>
                        <a>Cardapio</a>
                    </Link>
                    <button onClick={signOut}>
                        <FiLogOut size={24}></FiLogOut>
                    </button>
                </nav>
            </div>
        </header>
    )
}