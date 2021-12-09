import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/pokelogo.png'
import styles from './LandingPage.module.css'

export default function LandingPage(){
    return (
        <div className={styles.landing}>      
            <Link to = '/home'>
                <div><img src={logo}/></div>
            </Link>
        </div>
    )
}