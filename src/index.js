// import 'overlayscrollbars/css/OverlayScrollbars.css';
import React from 'react'
import ReactDOM from 'react-dom'
// import App_tasklist from './App-tasklist';
// import './index.css';

import AppReader from './App-RSSreader'
import './Css/reader.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

import { fetchFeedsFromLocalStorage } from './features/feedsApi/feedsSlice'

// If User already has RSS feeds chosen, load them from Local Storage
store.dispatch(fetchFeedsFromLocalStorage())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppReader />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
