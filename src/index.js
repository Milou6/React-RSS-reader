// import 'overlayscrollbars/css/OverlayScrollbars.css';
import React from 'react';
import ReactDOM from 'react-dom';
// import App_tasklist from './App-tasklist';
// import './index.css';

import AppReader from './App-RSSreader';
import './Css/reader.css';

ReactDOM.render(
  <React.StrictMode>
    <AppReader />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
