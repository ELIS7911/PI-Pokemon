import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return (
        <div className="landing">      
            <Link to = '/home'>
                <div><img src="http://vignette4.wikia.nocookie.net/nintendo/images/d/d3/Pokemon_AlphaSapphire_(Logo_-_NA).png/revision/latest?cb=20140507202614&path-prefix=en"/></div>
            </Link>
        </div>
    )
}