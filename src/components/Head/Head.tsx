import { Helmet } from 'react-helmet-async';

import { APPLICATION_NAME } from '@/config';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | ${APPLICATION_NAME}` : undefined}
      defaultTitle={APPLICATION_NAME}
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
