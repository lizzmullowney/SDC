import React from 'react';// Bring React in to build a component.
import {useState, useEffect} from 'react';
import RelatedItemCard from './RelatedItemCard.jsx';
import Carousel from './Carousel.jsx';


var RelatedItemsList = ({related, setCurrentById, getProducts, openComparisonModal}) => {
  const outerDivStyle = {
    color: 'blue',
    borderStyle: 'solid',
    margin: '2%',
    padding: '2%',
    borderRadius: '10%',
    overflow: 'hidden'
  };
  const divStyle = {
    overflow: 'hidden',
    height: '24em',
    width: '10000%'
  };
  const ulStyle = {
    display: 'inline-block',
    margin: '0 auto',
    padding: '0 auto',
    listStyleType: 'none',
    height: '24em',
    // width: '200vmin'
  }
  const liStyle = {
    display: 'inline-block',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    margin: '1%',
    width: 'max-content'
  }
  return (
    <div style={outerDivStyle} >
            {/* <h1>{'>'}</h1> */}
      <h2>Related Items</h2>
      <div style={divStyle} >
        <Carousel items={related.map(item => <RelatedItemCard key={item.id} item={item} onClick={_ => setCurrentById(item.id)} onButton={() => openComparisonModal(item)} />)} />
        {/* <ul style={ulStyle} >
          {related.map(item => <RelatedItemCard key={item.id} item={item} onClick={_ => setCurrentById(item.id)} onButton={() => openComparisonModal(item)} />)}
        </ul> */}
      </div>
      {/* <h1>{'>'}</h1> */}
    </div>
  );
}

export default RelatedItemsList