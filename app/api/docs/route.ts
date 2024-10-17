import { ApiReference } from '@scalar/nextjs-api-reference';
import { swaggerSpec } from 'swagger/swagger';

const config = {
  spec: {
    content: swaggerSpec,
  },
  theme: 'purple',
  forceDarkModeState: 'dark',
  metaData: {
    title: 'Mushadelic Records API',
    description: 'Mushadelic Records API',
  },
};

export const GET = ApiReference(config);
