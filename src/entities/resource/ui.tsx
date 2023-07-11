import type { Event } from 'effector';

import { Box, Slider, Typography } from '@mui/material';
import { useStore } from 'effector-react';

import { $domain, $forwarder, $server, domainChanged, forwarderChanged, serverChanged } from './model';

export const ResourceEntity = ({
  value,
  title,
  onChange,
}: {
  onChange: Event<number>;
  title: string;
  value: number;
}) => {
  return (
    <Box>
      <Typography gutterBottom={true}>{title}</Typography>
      <Slider
        max={20}
        min={0}
        onChange={(_, value) => onChange(value as number)}
        step={1}
        value={value}
        valueLabelDisplay="auto"
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
      <ResourceEntity onChange={domainChanged} title="Domains" value={domain} />
      <ResourceEntity onChange={serverChanged} title="Servers" value={server} />
      <ResourceEntity onChange={forwarderChanged} title="Forwarder" value={forwarder} />
    </Box>
  );
};
