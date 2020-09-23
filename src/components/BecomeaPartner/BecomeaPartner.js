import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useForm } from '../../common/components/Form/useForm';
import './BecomeaPartner.scss';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { Container } from '@material-ui/core';
import axios from '../../api/axios';
import MuiPhoneNumber from "material-ui-phone-number";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { BhookyConstants } from '../../common/AppConstants';
import React from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import * as _ from 'lodash';
const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
function BecomeaPartner() {
  const [address, setAddress] = React.useState(null);
  const initialFValues = {
    name: "",
    email: "",
    businessNumber: "",
    website: "",
    licenseNumber: "",
    yourName: "",
    yourNumber: ""
  };
  const classes = useStyles();

  const getStarted = (event) => {
    event.preventDefault();
    geocodeByAddress(address.label)
      .then(results => {
        const locationObj = results[0];
        const cityName = _.find(locationObj.address_components, l => _.includes(l.types, "locality"))?.long_name;
        const stateName = _.find(locationObj.address_components, l => _.includes(l.types, "administrative_area_level_1"))?.long_name;
        const merchnatObj = {
          merchantDetails: {
            name: values.name,
            email: values.email,
            mobile: values.businessNumber,
            websiteLink: values.website,
            status: "pending",
            licenceNumber: values.licenseNumber,
            contactPersonName: values.yourName,
            contactPersonMobile: values.yourNumber,
            location: {
              type: "Point",
              coordinates: [
                locationObj.geometry.location.lat(),
                locationObj.geometry.location.lng()
              ]
            },
            addresss: {
              name: address.label,
              pincode: _.find(locationObj.address_components, l => _.includes(l.types, "postal_code"))?.long_name
            },
            city: cityName,
            state: stateName
          }

        };
        debugger;
        axios
          .post(`/merchant/create`, merchnatObj)
          .then(res => {
            const data = res.data;
            if (data.success) {
              console.log(data);
            }
          })
          .catch((error) => {
          })
        console.log(merchnatObj);
      }
      );


  }

  // const geoCodeByAddress = (address) => {
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(({ lat, lng }) =>
  //       console.log('Successfully got latitude and longitude', { lat, lng })
  //     );
  // }

  const {
    values,
    setValues,
    handleInputChange,
  } = useForm(initialFValues, true);
  return (
    <Container component="main" maxWidth="xl" className='bg-image p-0'>
      <Grid container className='grid-overlay'>
        <Grid item sm className='ml-4'>
          <div className='contact-form'>
            <Typography component="h4" className='align-self-start' variant="h4">
              Get Started
          </Typography>
            <form className={classes.form} onSubmit={getStarted} noValidate>
              <Typography component="h6" className='align-self-start' variant="h6">
                Merchant Information
            </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="name"
                value={values.name}
                label="Name"
                name="name"
                onChange={handleInputChange}
              />
              {/* <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="address"
                value={values.address}
                label="Address"
                name="address"
                onChange={handleInputChange}
              /> */}
              <GooglePlacesAutocomplete
                apiKey={BhookyConstants.apiKey}
                label="Address"
                name="address"
                selectProps={{
                  label: "Address",
                  name: "address",
                  placeholder: 'Choose Address...',
                  value: address,
                  onChange: setAddress,
                }}
                autocompletionRequest={{
                  bounds: [
                    { lat: 50, lng: 50 },
                    { lat: 100, lng: 100 }
                  ],
                  componentRestrictions: {
                    country: ['in', 'us'],
                  }
                }}


              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="email"
                value={values.email}
                label="Email"
                name="email"
                onChange={handleInputChange}
              />
              <MuiPhoneNumber
                defaultCountry='in'
                onlyCountries={['in', 'us']}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="businessNumber"
                value={values.businessNumber}
                label="Business Phone Number"
                name="businessNumber"
                autoComplete="mobile"
                countryCodeEditable={false}
                onChange={event => handleInputChange({ target: { name: 'businessNumber', value: event } })}
              />

              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="website"
                value={values.website}
                label="Website"
                name="website"
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="licenseNumber"
                value={values.licenseNumber}
                label="License Number"
                name="licenseNumber"
                onChange={handleInputChange}
              />
              <Typography component="h6" className='align-self-start mt-1' variant="h6">
                Your Information
            </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="text"
                id="yourName"
                value={values.yourName}
                label="Name"
                name="yourName"
                onChange={handleInputChange}
              />
              <MuiPhoneNumber
                defaultCountry='in'
                onlyCountries={['in', 'us']}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="yourNumber"
                value={values.yourNumber}
                label="Phone Number"
                name="yourNumber"
                autoComplete="mobile"
                countryCodeEditable={false}
                onChange={event => handleInputChange({ target: { name: 'yourNumber', value: event } })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Get Started
        </Button>
            </form>
          </div>
        </Grid>
        <Grid item sm alignItems='flex-start' className='d-flex grid-timeline align-items-center'>
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className='text-light'>Sell bulk directly to consumer</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className='text-light'> Bring in income by selling
              whatever is left directly to the
            consumer before business close</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className='text-light'> Reduce waste</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent className='text-light'>Convert unused inventory into
            cash</TimelineContent>
            </TimelineItem>
          </Timeline>
          {/* <Typography component="h6" className='align-self-start' variant="h6">
          Call Us
          </Typography> */}
          {/* <Typography variant="h5" className='align-self-center mt-1 text-light p-4 bold' gutterBottom>
            Sell bulk directly to consumer<br /><br />
            Bring in income by selling
            whatever is left directly to the
            consumer before business close<br /><br />
            Reduce waste<br /><br />
            Convert unused inventory into
            cash
    </Typography> */}

        </Grid>
      </Grid>
      <CssBaseline />

    </Container>
  );
}

BecomeaPartner.propTypes = {};

BecomeaPartner.defaultProps = {};

export default BecomeaPartner;
