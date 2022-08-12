import { Box, Slider, Typography } from '@mui/material';
import type { Event } from 'effector';
import { useStore } from 'effector-react';

import { $domain, $forwarder, $server, domainChanged, forwarderChanged, serverChanged } from './model';

export const ResourceEntity = ({
  value,
  title,
  onChange,
}: {
  value: number;
  title: string;
  onChange: Event<number>;
}) => {
  return (
    <Box>
      <Typography gutterBottom={true}>{title}</Typography>
      <Slider
        value={value}
        min={0}
        step={1}
        max={20}
        valueLabelDisplay="auto"
        onChange={(_, value) => onChange(value as number)}
      />
    </Box>
  );
};

export const ResourceList = () => {
  const domain = useStore($domain);
  const server = useStore($server);
  const forwarder = useStore($forwarder);

  return (
    <Box>
      <ResourceEntity title="Domains" value={domain} onChange={domainChanged} />
      <ResourceEntity title="Servers" value={server} onChange={serverChanged} />
      <ResourceEntity title="Forwarder" value={forwarder} onChange={forwarderChanged} />
    </Box>
  );
};
