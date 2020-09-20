import React from 'react';
import PropTypes from 'prop-types';
import './BhookyUserHome.scss';
import CenterSlider from '../../common/components/Slider/Slider';
import RestaurantCard from '../../common/components/RestaurantCard/RestaurantCard';
import { Card, Container, makeStyles, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider, withStyles, Chip, Button, Grow, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import { CloseButton, Figure } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';
import AddorRemoveButtons from '../../common/components/AddorRemoveButtons/AddorRemoveButtons';
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
  list: {
    width: 600,
  },
  fullList: {
    width: 'auto',
  },
}));

function BhookyUserHome() {

  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleClickOnItem = (itemData) => {
    // history.push('/' + _.replace("Pizza Hut".toLowerCase(), ' ', '-') + '/order')

    setOpen(true);
  }

  const handleClose = () => {
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
      <CenterSlider />
      <div className='d-flex justify-content-between mx-5'>
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
      <Container maxWidth="lg" className='px-5 py-4 restaurant-main'>

        <section className='cards'>
          {[...Array(18)].map((x, i) =>

            <RestaurantCard rName='Pizza Hut' showItemDialog={() => handleClickOnItem(x)} />

          )}
        </section>
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
          <Divider className='mx-auto mt-3 divider-filters' />
          <Typography variant="h6" className='py-3 pl-2 filter-title' >
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
          )}
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
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogActions className='justify-content-between item-dialog'>
          <DialogTitle id="scroll-dialog-title">
            <Typography variant="h5" className='bhooky-semibold'>
              Pizza Hut
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
          <div className='d-flex dialog-addtocart justify-content-between'>
            <Button color="primary" className='viewmore' onClick={() => history.push('/' + _.replace("Pizza Hut".toLowerCase(), ' ', '-') + '/order')}>
              More from this merchant
            </Button>
            <div className='d-flex'>
              <AddorRemoveButtons size='extraSmall' className='dialog-add' />
              <Typography variant="body2" component="p" className='text-light bhooky-semibold pl-3 pr-2 text-center my-auto dialog-item-price'>
                30
            </Typography>
            </div>
          </div>
        </DialogContent>

      </Dialog>
    </React.Fragment>
  );
}

BhookyUserHome.propTypes = {};

BhookyUserHome.defaultProps = {};

export default BhookyUserHome;
