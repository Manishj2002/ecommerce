import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords = 'e-commerce, shopping, online store' }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8" />
    </Helmet>
  );
};

export default SEO;