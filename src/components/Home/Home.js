import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

function Home() {
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  return (
    <div className='d-flex flex-column w-100 '>
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center bg-img-home ">
          {/* <p>sdcsdcdscdfbcdbfghcvdfg</p> */}
          <Typography variant="h4" className='text-light mb-3 search-heading' noWrap>
            Pick your favorite food
    </Typography>
          <form class="search-container">

            <input type="text" id="search-bar" placeholder="Enter your location" />
            <div onClick={getLocation}>
              <IconButton
                component="span"
              >
                <LocationSearchingIcon />
              </IconButton>
            </div>
          </form>
        </div>
        <div className="d-flex flex-row-reverse bg-img-1 align-items-center mx-5 mt-4">
          <div className='d-flex flex-column w-50 p-5'>
            <Typography variant="h5" className='font-weight-bold mb-3' noWrap>
              Find Your Favorite Food
    </Typography>
            <Typography variant="subtitle1" className='' >
              From your neighborhood sushi spot to the burger and fries you crave, choose from over 300,000 local and national favorites across the U.S. and Canada
    </Typography>
          </div>
        </div>
        <div className="d-flex bg-img-2 align-items-center mx-5 mb-4">
          <div className='d-flex flex-column w-50 p-5'>
            <Typography variant="h5" className='font-weight-bold mb-3' noWrap>
              Become A Partner With Us
    </Typography>
            <Typography variant="subtitle1" className='' >
              From your neighborhood sushi spot to the burger and fries you crave, choose from over 300,000 local and national favorites across the U.S. and Canada
    </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
