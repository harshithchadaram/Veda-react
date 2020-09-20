import React, { useEffect } from 'react';
import { Container, CardMedia, Card, makeStyles, CardContent, Typography, Button } from '@material-ui/core';
import './RestaurantCheckOut.scss';
import RestaurantCard from '../../common/components/RestaurantCard/RestaurantCard';
import { useHistory } from 'react-router-dom';

import GradeIcon from '@material-ui/icons/Grade';
import { Figure, CloseButton } from 'react-bootstrap';
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
export default function RestaurantCheckout() {
    const classes = useStyles();
    const history = useHistory();
    const { data, loading, error } = usePalette("https://www.myrelationshipwithfood.com/wp-content/uploads/2017/09/mrwf.jpg");
    const [open, setOpen] = React.useState(false);
    const [itemData, setItemData] = React.useState({});
    // useEffect(() => { }, [data, loading, error]);
    const onTitleClick = (itemData) => {
        setItemData(itemData);
        setOpen(true);
    }
    const handleClose = () => {
        setItemData({});
        setOpen(false);
    };

    const [itemCount, setItemCount] = React.useState(0);

    console.log(data, loading, error);
    return (
        <React.Fragment>
            <div className={classes.banner}>
                <Figure className={classes.bannerFigure}>
                    <Figure.Image
                        className={classes.bannerImage}
                        src="https://www.myrelationshipwithfood.com/wp-content/uploads/2017/09/mrwf.jpg"
                    />
                </Figure>
                <div className='overlay'></div>

                <div className={`${classes.banner} d-flex w-25 p-4`}>
                    <div className={classes.root} style={{ background: data.vibrant ? data.vibrant : 'white' }}>
                        <div className={classes.headings}>
                            <Typography component="h1" variant="h3" className='res-name'>
                                Pizza Hut
                            </Typography>
                            <Typography variant="caption" className='bhooky-regular'>
                                Fast food, Pizzas
                    </Typography>
                            <Typography variant="body1" color='textSecondary' className='bhooky-light'>
                                Moosarambagh, Santoshnagar & Saidabad
                    </Typography>
                        </div>
                        <div className={classes.controls}>
                            <Typography variant="subtitle1" className='bhooky-medium'>
                                <GradeIcon className={`${classes.ratingIcon} mr-1`} />
                        4.1
                    </Typography>
                            <Typography variant="subtitle1" className='bhooky-medium'>
                                20 mins
                    </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex'>
                <div className={classes.grow} />
                <Container maxWidth="lg" className='restaurant-checkout-main'>
                    <section className='cards'>
                        {Object.keys(items).map((itemKey, i) =>
                            <RestaurantItemCard itemInfo={items[itemKey]} handleTitleClick={count => { onTitleClick(items[itemKey]); setItemCount(count) }} />
                        )}
                    </section>
                </Container>

                <CartSummary choosenItems={[{ name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }, { name: 'pizza', count: 4, amount: 1233 }]} />
            </div>
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
                            {itemData.name}
                        </Typography>
                    </DialogTitle>
                    <CloseButton onClick={handleClose} className='my-4 mr-2'></CloseButton>
                </DialogActions>
                <DialogContent dividers={true}>
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
                        {[...new Array(5)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                            .join('\n')}
                    </DialogContentText>
                    <div className='d-flex dialog-addtocart justify-content-end'>
                        <AddorRemoveButtons size='extraSmall' className='dialog-add' itemCount={itemCount} />
                        <Typography variant="body2" component="p" className='text-light bhooky-semibold pl-3 pr-2 text-center my-auto dialog-item-price'>
                            {itemData.variantsV2?.pricing_models[0].price ? itemData.variantsV2?.pricing_models[0].price / 100 : itemData.price / 100}
                        </Typography>
                    </div>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}