import { render } from 'react-dom';

import { Button, Card, Divider } from '@app/shared/ui';

const container = document.getElementById('app');

render(
  <div className="p-5">
    <Card title="title" />
    <Divider />
    <Button>text</Button>
  </div>,
  container,
);
