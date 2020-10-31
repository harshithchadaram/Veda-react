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
const useStyles = makeStyles((theme) => ({
    summary: {
        margin: 'auto',
        width: 350
    }
}));

export default function CartSummary(props) {
    const [choosenItems, setChoosenItems] = React.useState([
        {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }, {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }, {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }, {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }, {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }, {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }, {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }, {
            "quantity": 2,
            "_id": "5f9a3b842a50b3cd2bf28eb9",
            "user": "5f54c2cef804340ebb65b6b9",
            "merchant": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        -117.809411,
                        33.684606
                    ]
                },
                "address": {
                    "name": "3988 Barranca Parkway, Irvine 92606",
                    "pincode": "92606"
                },
                "images": [
                    "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.jpg"
                ],
                "_id": "5f34407443acf652e0a562df",
                "name": "California Fish Grill",
                "email": "sreeni2078@gmail.com",
                "mobile": "9912654081",
                "city": "Orange County",
                "state": "Irvine",
                "id": "MERCHANT51"
            },
            "product": "5f514284160add8797fc5bc2",
            "productName": "product Name",
            "productPrice": 123,
            "id": "PRODUCT332",
            "createdTime": "2020-10-29T03:48:20.980Z",
            "updatedTime": "2020-10-29T03:48:20.980Z",
            "__v": 0
        }
    ]);
    const classes = useStyles();
    const { globalState } = useContext(AppContext);
    const clearCart = () => {
        setChoosenItems([]);
    }
    useEffect(() => {
        const cartObj = {
            user: globalState.isLoggedIn ? window.localStorage.getItem('profileObj').userId : null,
            deviceId: store.getState().uuid,
        }
        axios
            .post('user/getcartitems', cartObj)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    console.log(data);
                }
            })
            .catch((error) => {
            });
    }, [])
    useEffect(() => { console.log(choosenItems.length) }, [choosenItems])
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

                                        <CartItem item={item} className='cart-item'></CartItem>

                                    )}

                                </CardContent>
                            </div>
                        }
                    </Card>
                    {choosenItems.length !== 0 && <Card className={`${classes.summary} cart-secondary my-2`}>
                        <CardHeader
                            title='Subtotal'
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
                                    {_.sum(_.map(choosenItems, 'amount'))}
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