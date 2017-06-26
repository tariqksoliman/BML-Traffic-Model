import React from 'react';
import ReactDOM from 'react-dom';
import BML from './BML';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<BML />, document.getElementById('root'));
registerServiceWorker();
