import { render } from 'react-dom';

import { Button, Card, Divider } from '@app/shared/ui';

import './index.css';

const container = document.getElementById('app');

render(
  <div>
    <Card title="title" />
    <Divider />
    <Button>text</Button>
  </div>,
  container,
);
