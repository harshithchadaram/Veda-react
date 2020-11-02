import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from 'react';
import './AboutUs.scss';
const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontWeight: 600,
      color: 'white',
      fontSize: 50,
      fontFamily: "'BhookyFont-Regular'",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    }
  })
);
function AboutUs() {
  const classes = useStyles();
  return (
    <div className='d-flex flex-column text-center aboutus-overlay justify-content-center h-100vh bg-image-about-us'>
      <div className='overlay h-100vh op-5'></div>
      <div style={{ zIndex: 2, padding: 50 }}>
        <Typography className={classes.title} variant="button" >
          Vuacifood
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
