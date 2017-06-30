import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CompactPicker } from 'react-color';
import Traffic from './Traffic';
import './BML.css';
import './range.css';

var startingDensity = 0.3;
var startingResolution = 2;
var startingFramerate = 60;
var startingColor1 = [35,190,245,255];
var startingColor2 = [195,10,185,195];
var startingColorBG = [238,238,238,255];
var startingDimenX = window.innerWidth / 2.4;
var startingDimenY = window.innerHeight / 2.4;

var bmltraffic = new Traffic();
//starts in running immediately
bmltraffic.init(  startingDensity,
                  startingDimenX,
                  startingDimenY,
                  startingResolution,
                  startingFramerate,
                  startingColorBG,
                  startingColor1,
                  startingColor2,
                  startingColorBG );

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
        <About />
        <Color
          label='Down Color'
          initcolor= {'rgba(' + startingColor1[0] + ',' + startingColor1[1] + ',' + startingColor1[2] + ',' + startingColor1[3]/255 + ')'}
        />
        <Color
          label='Right Color'
          initcolor={'rgba(' + startingColor2[0] + ',' + startingColor2[1] + ',' + startingColor2[2] + ',' + startingColor2[3]/255 + ')'}
        />
        <Color
          label='BG Color'
          initcolor={'rgba(' + startingColorBG[0] + ',' + startingColorBG[1] + ',' + startingColorBG[2] + ',' + startingColorBG[3]/255 + ')'}
        />
        <Density />
        <Resolution />
        <Framerate />
        <Dimension />
        <Reinitiate />
      </div>
    )
  }
}

class Title extends Component {
  render() {
    return (
      <div className='Title'>
        <a href='https://github.com/tariqksoliman/BML-Traffic-Model' target='_blank' rel='noopener noreferrer'>
          BML Traffic
        </a>
      </div>
    )
  }
}

class About extends Component {

  handleClick() {
    let cc = document.getElementById( 'container-canvas' );
    let ca = document.getElementById( 'container-about' );
    let isFlipped = ( cc.className === 'flipped' );

    if( isFlipped ) {
      cc.className = '';
      ca.className = 'flipped';
    }
    else {
      cc.className = 'flipped';
      ca.className = '';
    }

    ca.style.transition = 'transform 2s ease-in, opacity 2s ease-in';
  }

  render() {
    return (
      <div className='About'>
        <div onClick={() => this.handleClick()}>About</div>
      </div>
    )
  }
}


//1 to 250
class Resolution extends Component {
  render() {
    return (
      <div>
        <RangePicker
          label='Resolution'
          initvalue='2'
          min='1'
          max='32'
          step='1'
        />
      </div>
    )
  }
}

//10,10 to innerW, innerH
class Dimension extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      valueX: startingDimenX,
      valueY: startingDimenY
    }
  }

  handleChange( event, type ) {
    if( type === 'x' ) {
      this.setState({valueX: event.target.value});
      startingDimenX = event.target.value;
    }
    else if( type === 'y' ) {
      this.setState({valueY: event.target.value});
      startingDimenY = event.target.value;
    }
  }

  render() {
    return (
      <div>
        <div className='DimensionPicker'>
          <div className='dimension-label'>Dimension</div>
          <input type='number'
            value={Math.round( this.state.valueX )}
            min={10}
            max={window.innerWidth}
            onChange={(e) => this.handleChange(e,'x')}>
          </input>
          <input type='number'
            value={Math.round( this.state.valueY )}
            min={10}
            max={window.innerHeight}
            onChange={(e) => this.handleChange(e,'y')}>
          </input>
        </div>
      </div>
    )
  }
}

//1 to 250
class Density extends Component {
  render() {
    return (
      <div>
        <RangePicker
          label='Density'
          initvalue='0.35'
          min='0'
          max='1'
          step='0.01'
        />
      </div>
    )
  }
}

//1 to 60
class Framerate extends Component {
  getBeforeValue() {
    return bmltraffic.getActualfps() + ' / ';
  }
  render() {
    return (
      <div>
        <RangePicker
          label='Framerate'
          beforevalue={() => this.getBeforeValue()}
          initvalue='60'
          min='1'
          max='70'
          step='1'
        />
      </div>
    )
  }
}

class RangePicker extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      beforevalue: '',
      value: this.props.initvalue
    }

    setInterval(() => this.getBeforeValues(), 1000 );
  }

  handleChange( event ) {
    this.setState({value: event.target.value});
    switch( this.props.label ) {
      case 'Density':
          startingDensity = event.target.value;
        break;
      case 'Resolution':
          startingResolution = event.target.value;
        break;
      case 'Framerate':
          startingFramerate = event.target.value;
          bmltraffic.setFramerate( startingFramerate );
        break;
      default:
    }
  }

  getBeforeValues() {
    if( typeof this.props.beforevalue === 'function' ) {
      this.setState({
        beforevalue: this.props.beforevalue()
      });
    }
    return '';
  }

  render() {
    return (
      <div className='RangePicker'>
        <div className='range-label'>{this.props.label}<span>{this.state.beforevalue}{this.state.value}</span></div>
        <input type='range'
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={(e) => this.handleChange(e)}>
        </input>
      </div>
    )
  }
}

class Color extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      color: this.props.initcolor,
      display: 'none'
    }
  }

  toggleColorPicker() {
    let newDisplay = ( this.state.display === 'none' ) ? 'inherit' : 'none';
    this.setState({display: newDisplay});
  }
  handleChangeComplete( color ) {
    this.setState({color: color.hex});
    
    switch( this.props.label ) {
      case 'Down Color':
          bmltraffic.setColor( 'down', color.rgb );
          startingColor1 = [ color.rgb.r, color.rgb.g, color.rgb.b, 255 ];
        break;
      case 'Right Color':
          bmltraffic.setColor( 'right', color.rgb );
          startingColor2 = [ color.rgb.r, color.rgb.g, color.rgb.b, 255 ];
        break;
      case 'BG Color':
          bmltraffic.setColor( 'bg', color.rgb );
          startingColorBG = [ color.rgb.r, color.rgb.g, color.rgb.b, 255 ];
        break;
      default:
    }
  }

  //For closing color picker when clicking outside of it
  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }
  handleClick = e => {
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      if( this.state.display !== 'none') {
        this.setState({display: 'none'});
      }
    }
  }

  render() {
    return (
      <div>
        <div className='Color'>
          <div className='color-picker' style={{display: this.state.display }}>
            <CompactPicker
              color={ this.state.color }
              onChangeComplete={(c) => this.handleChangeComplete( c )}
            />
            <div className='picker-arrow-down'></div>
          </div>
          <div className='color-label'>{this.props.label}</div>
          <div className='color-patch'
               style={{backgroundColor: this.state.color || 'gray'}}
               onClick={() => this.toggleColorPicker()}     
          ></div>
        </div>
      </div>
    )
  }
}

class Reinitiate extends Component {
  reinitiate() {
    bmltraffic.init(  startingDensity,
                  startingDimenX,
                  startingDimenY,
                  startingResolution,
                  startingFramerate,
                  startingColorBG,
                  startingColor1,
                  startingColor2,
                  startingColorBG );
  }

  render() {
    return (
      <div style={{float:'right'}}>
        <div className='Reinitiate'>
          <div onClick={() => this.reinitiate()}>Reinitiate</div>
        </div>
      </div>
    )
  }
}

export default BML;
