import React, { Component } from 'react';
import './AboutPage.css';

class AboutPage extends Component {
  render() {
    return (
      <div>
        <div id='about-title'>Biham–Middleton–Levine Traffic</div>
        <p>The&nbsp;
            <a href='https://en.wikipedia.org/wiki/Biham%E2%80%93Middleton%E2%80%93Levine_traffic_model' target='_blank' rel='noopener noreferrer'>
                Biham–Middleton–Levine traffic model
            </a>
            &nbsp;is a cellular automaton that represents a flow of traffic.
        </p>
        <div id='about-algorithm'>
            <p>The algorithm is as follows:</p>
            <div className='i1'>Given:</div>
                <div className='i2'>A 2D grid where locations are to represent cars</div>
                <div className='i2'>A density [ 0.0 to 1.0 ]</div>
            <div className='i1'>Setup:</div>
                <div className='i2'>Iterate over each grid location once</div>
                    <div className='i3'>Select it <i>density</i> of the time</div>
                        <div className='i4'>Fill in these locations half the time with blue and the other half with red</div>
            <div className='i1'>Run:</div>
                <div className='i2'>On blue turns</div>
                    <div className='i3'>For each blue location</div>
                        <div className='i4'>If the location below it (or looped back to the top of the grid) is vacant (no blue or red)</div>
                            <div className='i5'>Move its location to the free location below it after checking all other blue locations</div>
                <div className='i2'>On red turns</div>
                    <div className='i3'>For each red location</div>
                        <div className='i4'>If the location to the right of it (or looped back to the left of the grid) is vacant (no blue or red)</div>
                            <div className='i5'>Move its location to the free location to the right of it after checking all other red locations</div>
                <div className='i2'>Switch turns</div>
        </div>
        <hr />
        <div id='about-who'>
            Tariq Soliman |&nbsp;
            <a href='https://github.com/tariqksoliman/BML-Traffic-Model' target='_blank' rel='noopener noreferrer'>
                GitHub
            </a>
        </div>
      </div>
    )
  }
}

export default AboutPage;