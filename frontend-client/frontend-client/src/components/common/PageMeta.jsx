import React from "react";
import { Helmet } from "react-helmet";

const PageMeta = ({ title, description, imageUrl }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={imageUrl} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:image" content={imageUrl} />
    <link rel="icon" href={imageUrl} />
    <link rel="apple-touch-icon" href={imageUrl} />
  </Helmet>
);

export default PageMeta;
