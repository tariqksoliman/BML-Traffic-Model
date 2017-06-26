import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
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
        <Title />
        {/* <Resolution /> */}
        <Dimension />
        <Density />
        <Framerate />
      </div>
    )
  }
}

class Title extends Component {
  render() {
    return (
      <div className='Title'>
        <a href='https://en.wikipedia.org/wiki/Biham%E2%80%93Middleton%E2%80%93Levine_traffic_model' target='_blank' rel='noopener noreferrer'>
          BML Traffic
        </a>
      </div>
    )
  }
}

class Resolution extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      v: 2
    }
  }
  
  handleChange( event ) {
    this.setState({v: event.target.value});
  }

  render() {
    return (
      <div>
        <input type='range' value={this.state.v} min='1' max='8' onChange={this.handleChange}></input>
      </div>
    )
  }
}
class Dimension extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}
class Density extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}
class Framerate extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}
class ColorPicker extends Component {
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default BML;
