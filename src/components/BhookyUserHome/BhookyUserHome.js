import React, { useContext, useEffect } from 'react';
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
import Loader from '../../common/components/Loader/Loader';
import AppContext from '../../common/components/store/AuthContext';
import Axios from 'axios';
import { updateCartCount } from '../../common/components/redux/actions';
import { connect } from 'react-redux';

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
    label: '$',
  },
  {
    value: 2,
    label: '$$',
  },
  {
    value: 3,
    label: '$$$',
  },
  {
    value: 4,
    label: '$$$$',
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

function BhookyUserHome(props) {

  const classes = useStyles();
  const history = useHistory();
  const { globalState } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState({});
  const [location, setLocation] = React.useState({});
  const [isResponsive, setIsResponsive] = React.useState(false);
  useEffect(() => {
    if (store.getState()) {
      setLocation(store.getState()['userLocation'][0]);
    }
    store.subscribe(() => {
      setLocation(store.getState()['userLocation'][0]);
    });
    if (!_.isEmpty(location)) {
      setProductsFromApi(getNofilterPrdctObj());
    } else {
      store.subscribe(() => {
        setLocation(store.getState()['userLocation'][0]);
      })
    }
    if (window.innerWidth <= 550) {
      setIsResponsive(true);
    }
  }, [location])
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 550) {
      setIsResponsive(true);
    }
    else {
      setIsResponsive(false);
    }
  });
  const getNofilterPrdctObj = () => {
    return {
      status: "available",
      location: {
        longitude: -117.71494388580321,
        latitude: 33.523677791289195,
        maxDistance: 10000
      },
      type: 'user'
    }
  }

  const handleClickOnItem = (itemData) => {
    // history.push('/' + _.replace("Pizza Hut".toLowerCase(), ' ', '-') + '/order')
    setProduct(itemData);
    setOpen(true);
  }

  const handleClose = () => {
    console.log('closed');
    setOpen(false);
  };

  const [state, setState] = React.useState({
    openDrawer: false,
    filterChips: [{ name: 'Bakery' }, { name: 'Restaurant' }, { name: 'Snacks & Drinks' }, { name: 'Cafe' }, { name: 'Bar' }, { name: 'Sugar Free' }, { name: 'Vegan' }, { name: 'Without Lactose' }, { name: 'Dietary' }, { name: 'Low Fat' }],
    prices: [{ name: 'All Prices', minPrice: 0, maxPrice: 100 }, { name: 'Under $20', minPrice: 0, maxPrice: 20 }, { name: '$20 - $50', minPrice: 20, maxPrice: 50 }, { name: '$50 - $100', minPrice: 50, maxPrice: 100 }, { name: 'Over $100', minPrice: 100, maxPrice: 100 }],
    rating: '',
    isEnabled: true
  });

  const onFilterChipClick = (chip) => {
    let chipObj = _.find(state.filterChips, chip);
    chipObj['active'] = !chipObj['active'];
    setState({ ...state, filterChips: state.filterChips, isEnabled: false });
  }
  const applyFilters = () => {
    const currActvPrice = _.find(state.prices, 'active');

    const productObj = {
      status: "available",
      location: {
        longitude: -117.71494388580321,
        latitude: 33.523677791289195,
        maxDistance: 10000
      },
      category: {
        $in: _.map(_.filter(state.filterChips, 'active'), 'name')
      },
      price: {
        "minPrice": currActvPrice ? currActvPrice.minPrice : undefined,
        "maxPrice": currActvPrice ? currActvPrice.maxPrice : undefined
      },
      rating: state.rating,
      type: 'user'
    }
    setProductsFromApi(productObj);
    setState({ ...state, openDrawer: false })
  }

  const updateCart = (count) => {
    const cartObj = {
      user: globalState.isLoggedIn ? window.localStorage.getItem('profileObj').userId : null,
      deviceId: store.getState().uuid,
      merchant: product.merchant._id,
      product: product._id,
      quantity: count,
      productName: product.name,
      productPrice: product.price
    }
    axios
      .post('user/cart', cartObj)
      .then(res => {
        const data = res.data;
        const key = product._id;
        const obj = {};
        obj[key] = count;
        if (data.success) {
          let currPrducts = products;
          _.forEach(data.cartItems, productObj => {
            const cartProdct = _.find(currPrducts, { '_id': productObj.product });
            if (cartProdct) {
              cartProdct.cartCount = productObj.quantity;
            }
          });
          setProducts(currPrducts);
          props.dispatch(updateCartCount(_.merge(props.cart, obj)));
          console.log(data);
        }
      })
      .catch((error) => {
      });
  }

  const setProductsFromApi = (productObj) => {
    const cartObj = {
      user: globalState.isLoggedIn ? window.localStorage.getItem('profileObj').userId : null,
      deviceId: store.getState().uuid,
    }
    Axios.all([axios
      .post('product/data', productObj),
    axios.post('user/getcartitems', cartObj)])
      .then(Axios.spread((res1, res2) => {
        const data = res1.data;
        const cartData = res2.data;
        if (data.success) {
          if (cartData.success) {
            _.forEach(cartData.cartItems, productObj => {
              const cartProdct = _.find(data.products, { '_id': productObj.product });
              if (cartProdct) {
                cartProdct.cartCount = productObj.quantity;
              }
            });
            setProducts(data.products);
          }
        }
      }))
      .catch((error) => {
      });

  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  return (
    <React.Fragment>
      <Container component='section' className='mb-4'>
        {(!_.isEmpty(products) || !state.isEnabled) &&
          <div className='d-flex justify-content-between my-4'>
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
        }
        {_.isEmpty(products) && !state.isEnabled &&
          <div className='d-flex flex-column justify-content-center h-100vh text-center'>
            <CardMedia src={require('../../assets/restaurant.png')} component="img" className='img-prop' />
            <Typography variant="p" className='bhooky-bold' >
              NO ITEMS FOUND
        </Typography>
          </div>}
        <div className='restaurant-main'>

          <section className={`${products.length > 3 ? '' : 'justify-items-start'} cards`} >
            {products.map((product, i) =>

              <RestaurantCard product={product} showItemDialog={() => handleClickOnItem(product)} />

            )}
          </section>
        </div>
      </Container>
      <Drawer anchor='right' open={state.openDrawer} onClose={toggleDrawer('openDrawer', false)}>
        <div className='d-flex' style={{ minHeight: 65 }}>
          <CloseButton
            component="button"
            className='px-3 close-drawer'
            onClick={toggleDrawer('openDrawer', false)}
          />
          <Typography variant="h5" className='p-3' >
            Filters
        </Typography>
          <Button variant='contained' color="primary" className='ml-auto mr-2 align-self-center text-capitalize' onClick={applyFilters} disabled={state.isEnabled}>
            Apply
          </Button>
          <Button color="secondary" className='mr-2 align-self-center text-capitalize' onClick={(event) => {
            state.filterChips.forEach(chip => {
              if (chip.active) {
                chip.active = false;
              }
            });
            state.prices.forEach(chip => {
              if (chip.active) {
                chip.active = false;
              }
            });
            setState({ ...state, rating: '', prices: state.prices, filterChips: state.filterChips, isEnabled: true, openDrawer: false });
            setProductsFromApi(getNofilterPrdctObj())
          }}>
            Clear
          </Button>
        </div>
        <Divider />
        <div
          className='m-4 filters'
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
          {/* <PrettoSlider className='mx-4 w-50' valueLabelDisplay="off" aria-label="price slider" defaultValue={0} marks={priceMarks} min={1} value={state.price}
            max={4} onChange={(event, v) => setState({ ...state, price: v, isEnabled: false })} /> */}
          {state.prices.map((price, i) =>
            <Chip
              size="medium"
              className='p-1 m-2'
              label={price.name}
              color={price.active ? 'primary' : ''}
              clickable
              onClick={event => {
                const currActv = _.find(state.prices, 'active')
                if (currActv) {
                  currActv.active = false;
                }
                price['active'] = !price['active'];
                setState({ ...state, prices: state.prices, isEnabled: false });
              }}
            />
          )}
          <Divider className='mx-auto mt-3 divider-filters' />
          <Typography variant="h6" className='py-3 pl-2 filter-title' >
            Rating
        </Typography>
          <PrettoSlider className='mx-4 w-50' valueLabelDisplay="autp" aria-label="rating slider" defaultValue={0} marks={ratingMarks} min={1} value={state.rating}
            max={5} onChange={(event, v) => setState({ ...state, rating: v, isEnabled: false })} />
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
          dividers={true} className='m-0 p-0'>
          <CardMedia
            className={classes.cover}
            image={product?.image?.length > 0 ? product?.image[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTI9wAAiM4eBLesNjgpOTn-_27WXIb6kEevJQ&usqp=CAU"}
          />
          <DialogContentText
            id="scroll-dialog-description"
            className='bhooky-regular m-3'
          >
            {product?.description}
          </DialogContentText>
          <div className='d-flex dialog-addtocart justify-content-between'>
            <Button color="primary" className='viewmore' onClick={() => history.push('/' + _.replace(product.merchant.name.toLowerCase(), ' ', '-') + '/' + product.merchant._id + '/order')}>
              More from this merchant
            </Button>
            <div className={`${isResponsive ? 'flex-column-reverse' : 'flex-row align-items-center'} d-flex `}>
              <AddorRemoveButtons size='extraSmall' className='dialog-add' handleCart={updateCart} cartCount={product.cartCount} />
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

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}
export default connect(mapStateToProps)(BhookyUserHome);
