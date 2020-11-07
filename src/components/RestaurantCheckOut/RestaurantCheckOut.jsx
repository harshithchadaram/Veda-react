import React, { useContext, useEffect } from 'react';
import { Container, CardMedia, Card, makeStyles, CardContent, Typography, Button, Snackbar, Slide, SnackbarContent } from '@material-ui/core';
import './RestaurantCheckOut.scss';
import RestaurantCard from '../../common/components/RestaurantCard/RestaurantCard';
import { useHistory, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import GradeIcon from '@material-ui/icons/Grade';
import { Figure, CloseButton, Nav } from 'react-bootstrap';
import { usePalette } from 'react-palette';
import CartSummary from '../CartSummary/CartSummary';
import RestaurantItemCard from '../../common/components/RestaurantItemCard/RestaurantItemCard';
import items from '../../assets/mockdata/swiggy.json';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddorRemoveButtons from '../../common/components/AddorRemoveButtons/AddorRemoveButtons';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import store from '../../common/components/redux/store';
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import Skeleton from '@material-ui/lab/Skeleton';
import AppContext from '../../common/components/store/AuthContext';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateCartCount } from "../../common/components/redux/actions";
function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
const action = (
    <Button color="primary" variant='contained' size="small">
        Cart
    </Button>
);
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 300,
        minWidth: 350,
        height: '90%',
        padding: 40,
        margin: 'auto',
        maxWidth: '50%',
        borderRadius: 10
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {

        minHeight: 200
    },
    headings: {
        minHeight: 105,
        justifyContent: 'space-between'
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto'
    },
    grow: {
        flexGrow: 1
    },
    banner: {
        position: "relative"
    },
    bannerFigure: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: 0,
        display: 'flex',
        overflow: 'hidden'
    },
    bannerImage: {
        objectFit: 'cover',
        margin: 0,
        flex: 1,
        transition: 'all 400ms ease'
    },
    parent: {
        minHeight: 350
    }
}));
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function RestaurantCheckout(props) {
    let query = useQuery();
    const classes = useStyles();
    const history = useHistory();
    const { data, loading, error } = usePalette("https://www.myrelationshipwithfood.com/wp-content/uploads/2017/09/mrwf.jpg");
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = React.useState({});
    const [products, setProducts] = React.useState([]);
    const [product, setProduct] = React.useState({});
    const [merchant, setMerchant] = React.useState({});
    const { globalState } = useContext(AppContext);

    const updateCart = (currProduct, count) => {
        const cartObj = {
            user: globalState.isLoggedIn ? window.localStorage.getItem('profileObj').userId : null,
            deviceId: store.getState().uuid,
            merchant: currProduct.merchant._id,
            product: currProduct._id,
            quantity: count,
            productName: currProduct.name,
            productPrice: currProduct.price
        }
        axios
            .post('user/cart', cartObj)
            .then(res => {
                const data = res.data;
                const key = currProduct._id;
                const obj = {};
                obj[key] = count;
                if (data.success) {
                    props.dispatch(updateCartCount(_.merge(props.cart, obj)));

                    console.log(props);
                }
            })
            .catch((error) => {
            });
    }
    useEffect(() => {
        if (store.getState()) {
            setLocation(store.getState()['userLocation'][0]);
        }
        store.subscribe(() => {
            setLocation(store.getState()['userLocation'][0]);
        });
        if (!_.isEmpty(location)) {
            const productObj = {
                location: {
                    longitude: location.geometry.location.lng, latitude: location.geometry.location.lat, maxDistance: 5000
                },
                type: 'user',
            }
            const cartObj = {
                user: globalState.isLoggedIn ? window.localStorage.getItem('profileObj').userId : null,
                deviceId: store.getState().uuid,
            }
            Axios.all([axios
                .post('product/data', { merchant: props.match.params.id }), axios
                    .post('user/getcartitems', cartObj)])
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
            axios
                .post('merchant/user/' + props.match.params.id, productObj)
                .then(res => {
                    const data = res.data;
                    if (data.success) {
                        setMerchant(data.merchantDetails);
                    }
                })
                .catch((error) => {
                });
        } else {
            store.subscribe(() => {
                setLocation(store.getState()['userLocation'][0]);
            })
        }

    }, [location]);
    const onTitleClick = (itemData) => {
        setProduct(itemData)
        setOpen(true);
    }
    const handleClose = () => {
        setProduct({});
        setOpen(false);
    };

    const [itemCount, setItemCount] = React.useState(0);
    return (
        <React.Fragment>
            <div className={classes.banner}>
                <Figure className={classes.bannerFigure}>
                    <Figure.Image
                        className={classes.bannerImage}
                        src={merchant ? merchant.images : "https://www.myrelationshipwithfood.com/wp-content/uploads/2017/09/mrwf.jpg"}
                    />
                </Figure>
                <div className='overlay'></div>

                <div className={`${classes.banner} d-flex w-25 p-4`}>
                    <div className={classes.root} style={{ background: data.vibrant ? data.vibrant : 'white' }}>
                        {_.isEmpty(merchant) ?
                            <div>
                                <Skeleton variant="rect" width={180} className='mb-3' />
                                <Skeleton variant="rect" width={'100%'} className='mb-3' />
                                <Skeleton variant="rect" width={100} className='mb-3' />
                                <Skeleton variant="rect" width={'75%'} className='mb-3' />
                                <Skeleton variant="rect" width={'100%'} className='mb-3' />

                            </div> :
                            <div className={classes.headings}>
                                <Typography component="h1" variant="h3" className='res-name' style={{ textTransform: 'capitalize' }}>
                                    {merchant.name}
                                </Typography>
                                <Typography variant="caption" className='bhooky-regular'>
                                    Fast food, Pizzas
                    </Typography>
                                <Typography variant="body1" color='textSecondary' className='bhooky-light'>
                                    {merchant ? merchant.address?.name : ''}
                                </Typography>
                            </div>
                        }
                        {_.isEmpty(merchant) ?
                            <div className='d-flex justify-content-between mt-4'>
                                <Skeleton variant="rect" width={50} />
                                <Skeleton variant="rect" width={50} />
                            </div>
                            :
                            <div className={classes.controls}>

                                <Typography variant="subtitle1" className='bhooky-medium d-flex py-2'>
                                    <GradeIcon className={`${classes.ratingIcon} mr-1`} />
                                    <Nav.Link as={Link} to={`/reviews/${props.match.params.id}`} href='#' className='p-0'>{merchant.totalRating}</Nav.Link>
                                </Typography>
                                <Typography variant="subtitle1" className='bhooky-medium'>
                                    {merchant.distance}
                                </Typography>

                            </div>

                        }
                    </div>
                </div>
            </div>
            <div className={classes.grow} />
            <Container component='section' className='restaurant-checkout-main'>
                <section className='cards'>
                    {products.map((product, i) =>
                        <RestaurantItemCard itemInfo={product} handleTitleClick={count => { onTitleClick(product); }} handleCart={count => updateCart(product, count)} />
                    )}
                </section>
            </Container>

            {/* <CartSummary choosenItems={[{ name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }]} /> */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogActions className='justify-content-between item-dialog'>
                    <DialogTitle id="scroll-dialog-title">
                        <Typography variant="h5" className='bhooky-semibold'>
                            {product.name}
                        </Typography>
                    </DialogTitle>
                    <CloseButton onClick={handleClose} className='my-4 mr-2'></CloseButton>
                </DialogActions>
                <DialogContent dividers={true} style={{ marginBottom: '65px' }}>
                    <Figure >
                        <Figure.Image
                            src="https://www.myrelationshipwithfood.com/wp-content/uploads/2017/09/mrwf.jpg"
                        />
                    </Figure>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                        className='bhooky-regular'
                    >
                        {product.description}
                    </DialogContentText>
                    <div className='d-flex dialog-addtocart justify-content-end'>
                        <AddorRemoveButtons size='extraSmall' className='dialog-add' product={product} />
                        <Typography variant="body2" component="p" className='text-light bhooky-semibold pl-3 pr-2 text-center my-auto dialog-item-price'>
                            {product.price}
                        </Typography>
                    </div>
                </DialogContent>

            </Dialog>

            <Snackbar
                open={true}
                color='black'
                className='mb-5'
                onClose={handleClose}
                TransitionComponent={TransitionUp}
            >
                <SnackbarContent message="Your items are waiting..." action={action} />
            </Snackbar>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}
export default connect(mapStateToProps)(RestaurantCheckout);