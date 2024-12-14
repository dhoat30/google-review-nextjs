'use client'
import React from 'react'
import { useSelector } from 'react-redux';
import {RootState} from '../../../redux/store'
import BusinessSmallCard from './BusinessSmallCard/BusinessSmallCard';
import styled from '@emotion/styled'
export default function BusinessCards() {
  const businesses = useSelector((state: RootState) => state.business);
  const googleReviews = useSelector((state: RootState) => state.googleReviews);


  if(!businesses ||  !googleReviews  ) return null;
  console.log(googleReviews)
  const cards = businesses.map((item, index) => {
    // const totalReviews = googleReviews.reviewsByBusinessId[item.id]?.length || 0; // Get total reviews for this business
    const totalReviews = googleReviews?.reviewsByBusinessId?.[item.id]?.length || 0;
    const totalScore =  googleReviews?.reviewsByBusinessId?.[item.id]?.[0]?.totalScore || 0;
    return <BusinessSmallCard key={item.id} businessName={item.businessName} businessMapUrl={item.businessMapUrl} logoUrl={item.logoUrl} businessId={item.id} totalReviews={totalReviews} totalScore={totalScore}  />;
  });
  return (
    <Div className='gap-16 grid'>
        {cards}
    </Div>
  )
}
const Div = styled.div`

grid-template-columns: 250px 250px 250px;

`