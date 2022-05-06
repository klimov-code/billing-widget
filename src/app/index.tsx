import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';

const container = document.getElementById('app') as unknown as Element | DocumentFragment;

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
