import React, { useContext } from 'react';
import { Typography, Container, Button, IconButton, CardContent, Card, makeStyles, CardHeader } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/Remove';
import './CartSummary.scss';
import ResizeableIconButton from '../../common/components/ResizeableIconButton/ResizeableIconButton';
import CartItem from './CartItem/CartItem';
import * as _ from 'lodash';
import { useEffect } from 'react';
import { CardImg } from 'react-bootstrap';
import axios from '../../api/axios';
import AppContext from '../../common/components/store/AuthContext';
import store from '../../common/components/redux/store';
import { updateCartCount } from '../../common/components/redux/actions';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    summary: {
        margin: 'auto',
        width: 350
    }
}));

function CartSummary(props) {
    const [choosenItems, setChoosenItems] = React.useState([]);
    const [priceObj, setPriceObj] = React.useState({});
    const classes = useStyles();
    const { globalState } = useContext(AppContext);
    const clearCart = () => {
        setChoosenItems([]);
    }
    useEffect(() => {
        const cartObj = {
            user: globalState.isLoggedIn ? JSON.parse(window.localStorage.profileObj)._id : null,
            deviceId: globalState.isLoggedIn ? null : store.getState().uuid,
        }
        axios
            .post('user/getcartitems', cartObj)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    setChoosenItems(data.cartItems);
                    setPriceObj({ tax: data.taxPercent, total: data.totalPrice });
                    _.forEach(data.cartItems, productObj => {
                        const key = productObj.product._id;
                        const obj = {};
                        obj[key] = productObj.quantity;
                        props.dispatch(updateCartCount(_.merge(props.cart, obj)));
                    });
                }
            })
            .catch((error) => {
            });
    }, []);
    const updateCart = (currProduct, count) => {
        const cartObj = {
            user: globalState.isLoggedIn ? JSON.parse(window.localStorage.profileObj)._id : null,
            deviceId: globalState.isLoggedIn ? null : store.getState().uuid,
            merchant: currProduct.merchant._id,
            product: currProduct.product._id,
            quantity: count,
            productName: currProduct.name,
            productPrice: currProduct.price
        }
        axios
            .post('user/cart', cartObj)
            .then(res => {
                const data = res.data;
                const key = currProduct.product._id;
                const obj = {};
                obj[key] = count;
                if (data.success) {
                    props.dispatch(updateCartCount(_.merge(props.cart, obj)));

                    console.log(_.merge(props.cart, obj));
                }
            })
            .catch((error) => {
            });
    }
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    return (
        <React.Fragment >
            <div className='summary-root'>
                <Container className='d-flex mb-auto flex-column p-0 summary-cart my-3' maxWidth='sm'>
                    <Card className={classes.summary}>
                        <CardHeader
                            title={choosenItems.length === 0 ? 'Cart Empty' : 'Cart Summary'}
                            className='pl-3 pb-0 summarycard-title'
                            subheader={choosenItems.length === 0 ? null :
                                <div className='d-flex summary-subheading '>
                                    <Typography variant="caption" className='bhooky-medium'>
                                        {choosenItems.length} items
                                    </Typography>
                                </div>
                            }
                            action={
                                choosenItems.length === 0 ? null : <Button variant='text' color='primary' className='bhooky-medium mt-3 mr-3 text-small clear-cart' onClick={clearCart}>Remove all</Button>
                            }
                        />
                        {choosenItems.length === 0 ?
                            <div className='d-flex flex-column m-auto justify-content-center align-items-center cart-no-items'>
                                <CardImg src='https://image.flaticon.com/icons/svg/413/413037.svg' ></CardImg>
                            </div>
                            :
                            <div className='d-flex pb-5 h-100 cart-items-root'>
                                <CardContent className='pt-1 cart-items w-100'>
                                    {choosenItems.map(item =>

                                        <CartItem item={item} className='cart-item' handleCart={count => updateCart(item, count)}></CartItem>

                                    )}

                                </CardContent>
                            </div>
                        }
                    </Card>
                    {choosenItems.length !== 0 && <Card className={`${classes.summary} cart-secondary my-2`}>

                        <CardHeader
                            title='To Pay'
                            className='pl-3 summarycard-subtotal-title'
                            subheader={
                                <div className='d-flex summary-subheading '>
                                    <Typography variant="caption" className='bhooky-medium'>
                                        Extra charges may apply
                                        </Typography>
                                </div>
                            }
                            action={
                                <Typography variant="h6" className='bhooky-bold subtotal pt-3 pr-2'>
                                    {priceObj.total + (priceObj.total * priceObj.tax / 100)}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Button variant='contained' color='primary' className='w-100'>Checkout</Button>
                        </CardContent>
                    </Card>}
                </Container>
            </div>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        cart: state.cart
    };
}
export default connect(mapStateToProps)(CartSummary);