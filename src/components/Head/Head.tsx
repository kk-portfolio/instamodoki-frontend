import { APPLICATION_NAME } from '@/config';
import { Helmet } from 'react-helmet-async';

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
