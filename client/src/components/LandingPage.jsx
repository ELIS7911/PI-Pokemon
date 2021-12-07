import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/pokelogo.png'

export default function LandingPage(){
    return (
        <div className="landing">      
            <Link to = '/home'>
                <div><img src={logo}/></div>
            </Link>
        </div>
    )
}