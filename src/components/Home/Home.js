import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

function Home() {
  return (
    <div className='d-flex flex-column w-100 h-100'>
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center bg-img-home ">
          {/* <p>sdcsdcdscdfbcdbfghcvdfg</p> */}
          <Typography variant="h4" className='text-light mb-3 search-heading' noWrap>
            Pick your favorite food
    </Typography>
          <form class="search-container">

            <input type="text" id="search-bar" placeholder="Enter your location" />
            <IconButton
              component="span"
            >
              <LocationSearchingIcon />
            </IconButton>
          </form>
        </div>
        <div className="d-flex flex-row-reverse bg-img-1 h-100">
          <Typography variant="h4" className='text-light mb-3 search-heading' noWrap>
            Pick your favorite food
    </Typography>
        </div>
        <div className="d-flex bg-img-2 h-100">
          <Typography variant="h4" className='text-light mb-3 search-heading' noWrap>
            Pick your favorite food
    </Typography>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
