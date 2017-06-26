import React, { Component } from 'react';
import Traffic from './Traffic';
import './BML.css';

var bmltraffic = new Traffic();
bmltraffic.init( 0.4 );

class BML extends Component {
  render() {
    return (
      <div className='BML'>
        <Toolbar />
      </div>
    );
  }
}

class Toolbar extends Component {
  render() {
    return(
      <div className='Toolbar'>
        Title
        Resolution
        Dimension
        Density
        Framerate
        Color0
        Color1
        Color2
      </div>
    )
  }
}

export default BML;
