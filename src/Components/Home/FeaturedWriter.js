import React, { Fragment } from "react";
import headshot from '../../Images/headshot.jpg';

const FeaturedWriter = () => {
    return (
        <Fragment>
        <div class='writer-heading'>    
            <h2>Writer of the Month:</h2>
        </div>
        <div class='writer-body'>
            <img src={headshot} title="Writer of the Month Headshot" alt="Writer Name Goes Here..."></img>
            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac tempor neque. Nulla sit 
        amet tellus id massa elementum pellentesque in a arcu. Donec eget lacus pharetra, vestibulum metus ut, 
        dapibus velit. Sed ac urna pellentesque, fermentum orci vel, bibendum magna. Morbi ac quam quam. Sed 
        aliquet elit sit amet mauris iaculis, nec fermentum urna maximus. Donec ligula ante, sagittis eu lacus ac, 
        aliquet efficitur magna. Phasellus in turpis quis nibh condimentum pulvinar. Praesent malesuada enim erat, eu mollis ipsum ornare eu. 
        Aenean vestibulum hendrerit nulla, fringilla elementum est finibus hendrerit. Suspendisse potenti.</h5>
        </div>
        </Fragment>
    );
};

export default FeaturedWriter;