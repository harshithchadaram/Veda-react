import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from 'react';
import './AboutUs.scss';
const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      display: "none",
      fontWeight: 600,
      color: 'white',
      fontSize: 50,
      fontFamily: "'BhookyFont'",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    }
  })
);
function AboutUs() {
  const classes = useStyles();
  return (
    <div className='d-flex w-100 h-100 bg-image-about-us'>
      <div className='d-flex flex-column text-center  aboutus-overlay justify-content-center w-100 h-100 p-5'>
        <Typography className={classes.title} variant="button" noWrap>
          Bhooky
    </Typography>
        {/* <GridListTile key='about-us' cols={10}>
        <img src={aboutUs} />
      </GridListTile> */}
        <Typography variant="subtitle1" className='text-light' >
          Our mission is to give everyone a voice and show them the world.
  </Typography>
        <Typography variant="subtitle1" className='text-light' >
          We believe that everyone deserves to have a voice, and that the world is a better place when we listen, share and build community through our stories.
  </Typography>
      </div>
    </div>
  );
}

AboutUs.propTypes = {};

AboutUs.defaultProps = {};

export default AboutUs;