import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { appMounted } from './model';

const container = document.getElementById('app') as unknown as DocumentFragment | Element;

const root = createRoot(container);

appMounted();

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
