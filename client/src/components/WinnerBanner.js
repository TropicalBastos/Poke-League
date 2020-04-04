import React, { Component } from 'react';
import trophy from '../assets/trophy.png';

const WinnerBanner = (props) => {
    return (
        <div className="winner_banner_wrapper">
            <p>Winner of the season:</p>
            <p className="winner_name">{props.winner}!</p>
            <img className="winner_banner_trophy" src={trophy} />
        </div>
    );
}

export default WinnerBanner;