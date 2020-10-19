import { IconButton } from '@material-ui/core';
import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import "./LocationSearchInput.scss";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Geocode from "react-geocode";
import { BhookyConstants } from '../../AppConstants';
import { func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { updateLocation, UPDATE_LOCATION } from '../redux/actions';
import store from '../redux/store';
import { useEffect } from 'react';
import MyLocationIcon from '@material-ui/icons/MyLocation';
// const searchOptions = {
//     location: new google.maps.LatLng(-34, 151),
//     radius: 2000,
//     types: ['address']
// }
function LocationSearchInput(props) {
    const [address, setAddress] = React.useState('');
    const [showBackdrop, setShowBackdrop] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleChange = address => {
        setAddress(address);
    };
    store.subscribe(() => {
        setAddress(store.getState()['userLocation'][0].formatted_address);
    });
    useEffect(() => {
        if (store.getState()['userLocation']) {
            setAddress(store.getState()['userLocation'][0].formatted_address);
        }
    }, []);
    const handleSelect = address => {

        geocodeByAddress(address)
            .then(results => { dispatch(updateLocation(results)); getLatLng(results[0]) })
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));

        history.push('/restaurants');
    };
    const onError = (status, clearSuggestions) => {
        console.log('Google Maps API returned error with status: ', status)
        clearSuggestions()
    }
    var options = {
        enableHighAccuracy: true,
        timeout: 500,
        maximumAge: 10000
    };
    const getCurrentLocation = () => {
        Geocode.setApiKey(BhookyConstants.apiKey);
        setShowBackdrop(true);
        let address = '';

        navigator.geolocation.getCurrentPosition(async function (position) {
            await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                response => {
                    setShowBackdrop(false);
                    // address = response?.results[0]?.formatted_address;
                    dispatch(updateLocation(response.results));
                    history.push('/restaurants');
                },
                error => {
                    setShowBackdrop(false);
                    console.error(error);
                });
        }, () => {

        }, options);

    }

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
            onError={onError}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className='d-flex justify-content-center' style={{ minWidth: '30%' }}>
                    <form className="search-container w-100">
                        <input
                            id="search-bar"
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input w-100',
                            })}
                        />
                        <div className='d-flex m-auto'>

                            {showBackdrop ? <CircularProgress style={{ width: 20, height: 20, color: 'black' }} /> :
                                <IconButton onClick={getCurrentLocation} style={{ color: 'black' }}><MyLocationIcon /></IconButton>}
                        </div>
                    </form>
                    <div className="autocomplete-dropdown-container">
                        {loading && <div className='d-flex bg-light'>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}

const mapStateToProps = (state) => {
    return {
        userLocation: state.userLocation
    };
}
export default connect(mapStateToProps)(LocationSearchInput);

