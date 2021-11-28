import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { IConfig } from './config/interfaces';
import { ConfigContext } from './context/context';
import './stylesheets/index.css';

window.addEventListener('DOMContentLoaded', () => {
  const config: IConfig = { action: 'init', appId: 'x6421505345172' };
  window.parent.postMessage(JSON.stringify(config), '*');
  window.removeEventListener('DOMContentLoaded', () => null);
});

window.addEventListener('message', (event) => {
  event.preventDefault();
  if (!event.data || (typeof event.data !== 'string')) return;
  const config: IConfig = JSON.parse(event.data);
  // eslint-disable-next-line consistent-return
  return render(
    <ConfigContext.Provider value={config}>
      <App />
    </ConfigContext.Provider>,
    document.body,
  );
});
