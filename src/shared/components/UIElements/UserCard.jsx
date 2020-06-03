import React from 'react';

import './NegCard.css';

const NegCard = props => {
  return (
    <div className={`usercard ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default NegCard;
