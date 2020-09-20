import React from 'react';
import { Typography, Container, Button, IconButton, CardContent, Card, makeStyles, CardHeader } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/Remove';
import './CartSummary.scss';
import ResizeableIconButton from '../../common/components/ResizeableIconButton/ResizeableIconButton';
import CartItem from './CartItem/CartItem';
import * as _ from 'lodash';
import { useEffect } from 'react';
import { CardImg } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
    summary: {

        boxShadow: 'unset',
        marginRight: 'auto'
    }
}));

export default function CartSummary(props) {
    const [choosenItems, setChoosenItems] = React.useState(props.choosenItems);
    const classes = useStyles();
    const clearCart = () => {
        setChoosenItems([]);
    }
    useEffect(() => { console.log(choosenItems.length) }, [choosenItems])
    return (
        <React.Fragment >
            <div className='summary-root'>
                <Container className='d-flex mb-auto flex-column p-0 summary-cart'>
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
                                <CardContent className='pt-1 cart-items'>
                                    {choosenItems.map(item =>

                                        <CartItem item={item} className='cart-item'></CartItem>

                                    )}

                                </CardContent>
                            </div>
                        }
                    </Card>
                    {choosenItems.length !== 0 && <Card className='cart-secondary mr-4 ml-1'>
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