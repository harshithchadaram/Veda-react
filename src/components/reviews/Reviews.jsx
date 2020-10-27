import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './reviews.scss';
import axios from '../../api/axios';
import Review from './Review/Review';
import { Container } from '@material-ui/core';

export default function Reviews(props) {
  const [reviews, setReviews] = React.useState([]);
  useEffect(() => {

    axios
      .post('merchant/getreviews', { merchant: props.match.params.merchantid })
      .then(res => {
        const data = res.data;
        if (data.success) {
          setReviews(data.merchantReviews);
          console.log(data);
        }
      })
      .catch((error) => {
      });


  }, []);
  return (
    <div className="h-100vh">
      <Container component='section' style={{ height: '100vh' }} className='reviews'>
        <section className='cards'>
          {reviews.map((review, i) =>
            <Review reviewInfo={review} />
          )}
        </section>
      </Container>
    </div>
  )
}

