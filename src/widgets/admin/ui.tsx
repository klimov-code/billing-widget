import { Card, CardContent } from '@mui/material';

import { ResourceList } from '@app/entities/resource';

export const AdminWidget = () => (
  <Card>
    <CardContent>
      <ResourceList />
    </CardContent>
  </Card>
);
