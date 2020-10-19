import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './BhookyUserHome.scss';
import CenterSlider from '../../common/components/Slider/Slider';
import RestaurantCard from '../../common/components/RestaurantCard/RestaurantCard';
import { Card, Container, makeStyles, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, withStyles, Chip, Button, Grow, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, CardMedia } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { CloseButton, Figure } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';
import AddorRemoveButtons from '../../common/components/AddorRemoveButtons/AddorRemoveButtons';
import axios from '../../api/axios';
import store from '../../common/components/redux/store';

const PrettoSlider = withStyles((theme) => ({
  root: {
    color: theme.palette.primary,
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  mark: {
    display: 'none'
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4
  },
}))(Slider);
const priceMarks = [
  {
    value: 1,
    label: '₹',
  },
  {
    value: 2,
    label: '₹₹',
  },
  {
    value: 3,
    label: '₹₹₹',
  }
];
const ratingMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  }
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  fullList: {
    width: 'auto',
  },
  cover: {
    width: '100%',
    height: 300,
    marginBottom: 30
  },
}));

function BhookyUserHome() {

  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState({});
  const [location, setLocation] = React.useState({});

  useEffect(() => {
    if (store.getState()) {
      setLocation(store.getState()['userLocation'][0]);
    }
    store.subscribe(() => {
      setLocation(store.getState()['userLocation'][0]);
    });
    if (!_.isEmpty(location)) {
      const productObj = {
        status: "available",
        // location: {
        //   longitude: location.geometry.location.lng, latitude: location.geometry.location.lat, maxDistance: 5000
        // },
        location: {
          longitude: -117.781256,
          latitude: 33.65618,
          maxDistance: 5000
        },
        type: 'user'
      }

      axios
        .post('product/data', productObj)
        .then(res => {
          const data = res.data;
          if (data.success) {
            setProducts(data.products);
            console.log(data);
          }
        })
        .catch((error) => {
        });
    } else {
      store.subscribe(() => {
        setLocation(store.getState()['userLocation'][0]);
      })
    }
  }, [location])


  const handleClickOnItem = (itemData) => {
    // history.push('/' + _.replace("Pizza Hut".toLowerCase(), ' ', '-') + '/order')
    setProduct(itemData);
    setOpen(true);
  }

  const handleClose = () => {
    debugger;
    console.log('closed');
    setOpen(false);
  };

  const [state, setState] = React.useState({
    openDrawer: false,
    filterChips: [{ name: 'All', active: true }, { name: 'Bakery' }, { name: 'Restaurant' }, { name: 'Snacks & Drinks' }, { name: 'Cafe' }, { name: 'Bar' }],
    filterDietChips: [{ name: 'All', active: true }, { name: 'Sugar Free' }, { name: 'Vegan' }, { name: 'Without Lactose' }, { name: 'Dietary' }, { name: 'Low Fat' }]
  });

  const onFilterChipClick = (chip) => {
    let chipObj = _.find(state.filterChips, chip);
    chipObj['active'] = !chipObj['active'];
    setState({ ...state, filterChips: state.filterChips });
  }
  const onFilterDietChipClick = (chip) => {
    let chipObj = _.find(state.filterDietChips, chip);
    chipObj['active'] = !chipObj['active'];
    setState({ ...state, filterDietChips: state.filterDietChips });
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  return (
    <React.Fragment>
      {/* <CenterSlider /> */}
      <Container component='section' style={{ height: '100vh' }}>
        <div className='d-flex justify-content-between mx-3 my-4'>
          <Typography variant="h5" className='restaurants-title' >
            All items nearby
        </Typography>

          <Typography variant="body2" >
            Filters
          <div onClick={toggleDrawer('openDrawer', true)} className='d-inline'>
              <IconButton
                component="span"
              >
                <TuneIcon />
              </IconButton>
            </div>
          </Typography>
        </div>
        <div className='restaurant-main'>

          <section className='cards'>
            {products.map((product, i) =>

              <RestaurantCard product={product} showItemDialog={() => handleClickOnItem(product)} />

            )}
          </section>
        </div>
      </Container>
      <Drawer anchor='right' open={state.openDrawer} onClose={toggleDrawer('openDrawer', false)}>
        <div className='d-flex'>
          <CloseButton
            component="button"
            className='px-3 close-drawer'
            onClick={toggleDrawer('openDrawer', false)}
          />
          <Typography variant="h5" className='p-3' >
            Filters
        </Typography>
          <Button variant='contained' color="primary" className='ml-auto mr-2 align-self-center text-capitalize'>
            Apply
          </Button>
          <Button color="secondary" className='mr-2 align-self-center text-capitalize'>
            Clear
          </Button>
        </div>
        <Divider />
        <div
          className={`${classes.list} p-4`}
          role="filters"
        >
          {state.filterChips.map((chip, i) =>
            <Chip
              size="medium"
              className='p-1 m-2'
              label={chip.name}
              color={chip.active ? 'primary' : ''}
              clickable
              onClick={event => onFilterChipClick(chip)}
            />
          )}
          {/* <Divider className='mx-auto mt-3 divider-filters' /> */}
          {/* <Typography variant="h6" className='py-3 pl-2 filter-title' >
            Diet
        </Typography>
          {state.filterDietChips.map((chip, i) =>
            <Chip
              size="medium"
              className='p-1 m-2'
              label={chip.name}
              color={chip.active ? 'primary' : ''}
              clickable
              onClick={event => onFilterDietChipClick(chip)}
            />
          )} */}
          <Divider className='mx-auto mt-3 divider-filters' />
          <Typography variant="h6" className='py-3 pl-2 filter-title' >
            Price
        </Typography>
          <PrettoSlider className='mx-4 w-50' valueLabelDisplay="off" aria-label="price slider" defaultValue={0} marks={priceMarks} min={1}
            max={3} />
          <Divider className='mx-auto mt-3 divider-filters' />
          <Typography variant="h6" className='py-3 pl-2 filter-title' >
            Rating
        </Typography>
          <PrettoSlider className='mx-4 w-50' valueLabelDisplay="autp" aria-label="rating slider" defaultValue={0} marks={ratingMarks} min={1}
            max={5} />
          {/* <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>

                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </div>
      </Drawer>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'sm'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogActions className='justify-content-between item-dialog'>
          <DialogTitle id="scroll-dialog-title">
            <Typography variant="h5" className='bhooky-semibold'>
              {product?.name}
            </Typography>
          </DialogTitle>
          <CloseButton onClick={handleClose} className='my-4 mr-2'></CloseButton>
        </DialogActions>
        <DialogContent
          dividers={true} style={{ marginBottom: '65px' }}>
          <CardMedia
            className={classes.cover}
            image={product?.image?.length > 0 ? product?.image[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTI9wAAiM4eBLesNjgpOTn-_27WXIb6kEevJQ&usqp=CAU"}
          />
          <DialogContentText
            id="scroll-dialog-description"
            className='bhooky-regular'
          >
            {product?.description}
          </DialogContentText>
          <div className='d-flex dialog-addtocart justify-content-between'>
            <Button color="primary" className='viewmore' onClick={() => history.push('/' + _.replace(product.merchant.name.toLowerCase(), ' ', '-') + '/' + product.merchant._id + '/order')}>
              More from this merchant
            </Button>
            <div className='d-flex'>
              <AddorRemoveButtons size='extraSmall' className='dialog-add' />
              <Typography variant="body2" component="p" className='text-light bhooky-semibold pl-3 pr-2 text-center my-auto dialog-item-price'>
                {product?.price}
              </Typography>
            </div>
          </div>
        </DialogContent>

      </Dialog>
    </React.Fragment >
  );
}

BhookyUserHome.propTypes = {};

BhookyUserHome.defaultProps = {};

export default BhookyUserHome;
