import React from 'react';
import ReactDOM from 'react-dom';
import BML from './BML';
import AboutPage from './AboutPage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<BML />, document.getElementById('root'));
ReactDOM.render(<AboutPage />, document.getElementById('container-about'));
registerServiceWorker();
