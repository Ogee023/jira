import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool';
// jira-dev-tool 之后引入，覆盖
import 'antd/dist/antd.less'
import { AppProviders } from 'context';
import { Profiler } from 'components/profiler';

loadServer(() => ReactDOM.render(
  <Profiler id='Root App' phases={['mount']}>
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>
  </Profiler>,
  document.getElementById('root')
))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
