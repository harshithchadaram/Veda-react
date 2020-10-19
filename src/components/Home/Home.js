import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Geocode from "react-geocode";
import { useHistory } from 'react-router-dom';
import { BhookyConstants } from '../../common/AppConstants';
import { CardMedia, CircularProgress, TextField } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import LocationSearchInput from '../../common/components/LocationSearchInput/LocationSearchInput';
import { connect } from 'react-redux';

function Home() {
  const history = useHistory();
  const [showBackdrop, setShowBackdrop] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const getCurrentLocation = () => {
    Geocode.setApiKey(BhookyConstants.apiKey);
    setShowBackdrop(true);

    // history.push('/restaurants');
    navigator.geolocation.watchPosition(async function (position) {
      await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        response => {
          setShowBackdrop(false);
          setLocation(response.results[0].formatted_address);
        },
        error => {
          setShowBackdrop(false);
          console.error(error);
        });
    }, () => {
      setShowBackdrop(false);
    });
  }
  return (
    <div className='d-flex flex-column w-100 '>
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center bg-img-home ">
          <Typography variant="h4" className='text-light mb-3 search-heading mx-3 text-center' >
            Pick your favorite food
           </Typography>
          <LocationSearchInput />
        </div>
        <div className="row-grid ">
          {/* <div className='bg-img-1 column-area-1'></div> */}
          <div className='column-area-1 py-3'>
            <CardMedia src={require('../../assets/home-page-one.png')} component="img" className='img-prop' />
          </div>
          {/* <div class="break"></div> */}
          <div className='column-area-2 p-4 '>
            <Typography variant="h5" className='font-weight-bold mb-3' >
              Find Your Favorite Food
          </Typography>
            <Typography variant="subtitle1" >
              From your neighborhood sushi spot to the burger and fries you crave, choose from over 300,000 local and national favorites across the U.S. and Canada
          </Typography>
          </div>
        </div>
        <div className="row-grid">
          <div className='column-area-2 p-4 '>
            <Typography variant="h5" className='font-weight-bold mb-3' >
              Become A Partner With Us
            </Typography>
            <Typography variant="subtitle1"  >
              From your neighborhood sushi spot to the burger and fries you crave, choose from over 300,000 local and national favorites across the U.S. and Canada
            </Typography>
          </div>
          {/* <div class="break"></div> */}
          <div className='column-area-1 py-3'>
            <CardMedia src={require('../../assets/home-page-two.png')} component="img" className='img-prop' />
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {};

Home.defaultProps = {};
const mapStateToProps = (state) => {
  return {
    number: state.location
  };
}
export default connect(mapStateToProps)(Home);

